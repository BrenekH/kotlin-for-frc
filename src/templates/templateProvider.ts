import * as vscode from "vscode";
import * as customfs from "../fileManipulation/fileSystem";
import { parseStringToTemplateType, templateType } from "./templateInterpreter";

// All Robot types
import { BuildGradleTemplate } from "./frc-kotlin/BuildGradle";
import { EmptyClassTemplate } from "./frc-kotlin/EmptyClassTemplate";

// Command based General
import { CommandRobotTemplate } from "./frc-kotlin/command-based/Robot";
import { CommandRobotContainerTemplate } from "./frc-kotlin/command-based/RobotContainer";
import { CommandConstantsTemplate } from "./frc-kotlin/command-based/Constants";

// Command based Commands
import { CommandTemplate } from "./frc-kotlin/command-based/commands/CommandTemplate";
import { InstantCommandTemplate } from "./frc-kotlin/command-based/commands/InstantCommandTemplate";
import { ParallelCommandGroupTemplate } from "./frc-kotlin/command-based/commands/ParallelCommandGroupTemplate";
import { ParallelDeadlineGroupTemplate } from "./frc-kotlin/command-based/commands/ParallelDeadlineGroupTemplate";
import { ParallelRaceGroupTemplate } from "./frc-kotlin/command-based/commands/ParallelRaceGroupTemplate";
import { PIDCommandTemplate } from "./frc-kotlin/command-based/commands/PIDCommandTemplate";
import { ProfiledPIDCommandTemplate } from "./frc-kotlin/command-based/commands/ProfiledPIDCommandTemplate";
import { SequentialCommandGroupTemplate } from "./frc-kotlin/command-based/commands/SequentialCommandGroupTemplate";
import { TrapezoidProfileCommandTemplate } from "./frc-kotlin/command-based/commands/TrapezoidProfileCommandTemplate";

// Command based Subsystems
import { CommandSubsystemTemplate } from "./frc-kotlin/command-based/subsystems/SubsystemTemplate";
import { PIDSubsystemTemplate } from "./frc-kotlin/command-based/subsystems/PIDSubsystemTemplate";
import { ProfiledPIDSubsystemTemplate } from "./frc-kotlin/command-based/subsystems/ProfiledPIDSubsystemTemplate";
import { TrapezoidProfileSubsystemTemplate } from "./frc-kotlin/command-based/subsystems/TrapezoidProfileSubsystemTemplate";

// Old Command Based
import { OldCommandTimedCommandTemplate } from "./frc-kotlin/old-command-based/commands/TimedCommand";
import { OldCommandInstantCommandTemplate } from "./frc-kotlin/old-command-based/commands/InstantCommandTemplate";
import { OldCommandPIDSubsystemTemplate } from "./frc-kotlin/old-command-based/subsystems/PIDSubsystemTemplate";
import { OldCommandTriggerTemplate } from "./frc-kotlin/old-command-based/triggers/TriggerTemplate";
import { OldCommandRobotMapTemplate } from "./frc-kotlin/old-command-based/RobotMap";
import { OldCommandOITemplate } from "./frc-kotlin/old-command-based/OI";
import { OldCommandGroupTemplate } from "./frc-kotlin/old-command-based/commands/CommandGroupTemplate";
import { OldCommandSubsystemTemplate } from "./frc-kotlin/old-command-based/subsystems/SubsystemTemplate";
import { OldCommandRobotTemplate } from "./frc-kotlin/old-command-based/Robot";
import { OldCommandTemplate } from "./frc-kotlin/old-command-based/commands/CommandTemplate";
import { RomiTimedDrivetrainTemplate } from "./frc-kotlin/romi-timed/romiDrivetrain";
import { RomiCommandRobotContainerTemplate } from "./frc-kotlin/romi-command-based/robotContainer";
import { RomiCommandConstantsTemplate } from "./frc-kotlin/romi-command-based/constants";
import { RomiCommandExampleCommandTemplate } from "./frc-kotlin/romi-command-based/commands/exampleCommand";
import { RomiCommandDrivetrainSubsystemTemplate } from "./frc-kotlin/romi-command-based/subsystems/romiDrivetrainSubsystem";
import { RomiBuildGradleTemplate } from "./frc-kotlin/RomiBuildGradle";

export interface ITemplateProvider {
	getTemplateObject(targetTemplateType: templateType): Promise<ITemplate | null>;
}

export interface ITemplate {
	text: string;
}

export class DummyTemplateProvider {
	async getTemplateObject(targetTemplateType: templateType): Promise<ITemplate | null> {
		return null;
	}
}

export class DummyTemplate {
	text = "";
}

export class FileSystemTemplateProvider {
	pathToSearch: string;
	validFileExtension: string = "kfftemplate";
	constructor(pathToSearch: string) {
		this.pathToSearch = pathToSearch;
	}

	async getTemplateObject(targetTemplateType: templateType): Promise<ITemplate | null> {
		let values: [string, vscode.FileType][];
		try {
			values = await vscode.workspace.fs.readDirectory(vscode.Uri.file(this.pathToSearch));
		} catch (e) {
			console.error("Handled error: " + e);
			return null;
		}

		for (var value of values) {
			if (value[1] === vscode.FileType.File) {
				let temp: string | undefined = value[0]?.split("\\")?.pop()?.split("/")?.pop();
				let fileNameWithExtension: string = (temp === undefined) ? "" : temp;

				let splitArray = fileNameWithExtension.split(".");
				let fileExtension = splitArray[splitArray.length - 1];

				if (fileExtension === this.validFileExtension) {
					let parsedType: templateType;
					try {
						parsedType = parseStringToTemplateType(splitArray[0]);
					} catch(e) {
						console.error("Handled error: " + e);
						return null;
					}
					if (parsedType === targetTemplateType) {
						return {text: await customfs.readFile(`${this.pathToSearch}/${value[0]}`)};
					}
				}
			}
		}
		return null;
	}
}

export class IntegratedTemplateProvider {
	async getTemplateObject(targetTemplateType: templateType): Promise<ITemplate | null> {
		switch(targetTemplateType) {
			// Old Command Based
			case templateType.oldRobot:
				return new OldCommandRobotTemplate();
			case templateType.oldOI:
				return new OldCommandOITemplate();
			case templateType.oldRobotMap:
				return new OldCommandRobotMapTemplate();
			case templateType.oldSubsystem:
				return new OldCommandSubsystemTemplate();
			case templateType.oldCommand:
				return new OldCommandTemplate();
			case templateType.oldCommandGroup:
				return new OldCommandGroupTemplate();
			case templateType.oldPIDSubsystem:
				return new OldCommandPIDSubsystemTemplate();
			case templateType.oldInstantCommand:
				return new OldCommandInstantCommandTemplate();
			case templateType.oldTimedCommand:
				return new OldCommandTimedCommandTemplate();
			case templateType.oldTrigger:
				return new OldCommandTriggerTemplate();

			// Command based
			// General
			case templateType.robot:
				return new CommandRobotTemplate();
			case templateType.robotContainer:
				return new CommandRobotContainerTemplate();
			case templateType.constants:
				return new CommandConstantsTemplate();
			// Commands
			case templateType.command:
				return new CommandTemplate();
			case templateType.instantCommand:
				return new InstantCommandTemplate();
			case templateType.parallelCommandGroup:
				return new ParallelCommandGroupTemplate();
			case templateType.parallelDeadlineGroup:
				return new ParallelDeadlineGroupTemplate();
			case templateType.parallelRaceGroup:
				return new ParallelRaceGroupTemplate();
			case templateType.PIDCommand:
				return new PIDCommandTemplate();
			case templateType.profiledPIDCommand:
				return new ProfiledPIDCommandTemplate();
			case templateType.sequentialCommandGroup:
				return new SequentialCommandGroupTemplate();
			case templateType.trapezoidProfileCommand:
				return new TrapezoidProfileCommandTemplate();
			// Subsystems
			case templateType.subsystem:
				return new CommandSubsystemTemplate();
			case templateType.PIDSubsystem:
				return new PIDSubsystemTemplate();
			case templateType.profiledPIDSubsystem:
				return new ProfiledPIDSubsystemTemplate();
			case templateType.trapezoidProfileSubsystem:
				return new TrapezoidProfileSubsystemTemplate();

			// Romi
			case templateType.romiTimedDrivetrain:
				return new RomiTimedDrivetrainTemplate();
			case templateType.romiCommandRobotContainer:
				return new RomiCommandRobotContainerTemplate();
			case templateType.romiCommandConstants:
				return new RomiCommandConstantsTemplate();
			case templateType.romiCommandExampleCommand:
				return new RomiCommandExampleCommandTemplate();
			case templateType.romiCommandDrivetrainSubsystem:
				return new RomiCommandDrivetrainSubsystemTemplate();

			// Misc
			case templateType.buildGradle:
				return new BuildGradleTemplate();
			case templateType.emptyClass:
				return new EmptyClassTemplate();
			case templateType.romiBuildGradle:
				return new RomiBuildGradleTemplate();

			// Default case should never run because the Integrated Template Provider is the fail safe
			default:
				return null;
		}
	}
}
