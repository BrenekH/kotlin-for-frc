import { templateType } from "./template_interpreter";

// All Robot types
import { BuildGradleTemplate } from './frc-kotlin/BuildGradle';
import { EmptyClassTemplate } from './frc-kotlin/EmptyClassTemplate';

// Command based General
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';
import { CommandRobotContainerTemplate } from './frc-kotlin/command-based/RobotContainer';
import { CommandConstantsTemplate } from './frc-kotlin/command-based/Constants';

// Command based Commands
import { CommandTemplate } from './frc-kotlin/command-based/commands/CommandTemplate';
import { InstantCommandTemplate } from './frc-kotlin/command-based/commands/InstantCommandTemplate';
import { ParallelCommandGroupTemplate } from './frc-kotlin/command-based/commands/ParallelCommandGroupTemplate';
import { ParallelDeadlineGroupTemplate } from './frc-kotlin/command-based/commands/ParallelDeadlineGroupTemplate';
import { ParallelRaceGroupTemplate } from './frc-kotlin/command-based/commands/ParallelRaceGroupTemplate';
import { PIDCommandTemplate } from './frc-kotlin/command-based/commands/PIDCommandTemplate';
import { ProfiledPIDCommandTemplate } from './frc-kotlin/command-based/commands/ProfiledPIDCommandTemplate';
import { SequentialCommandGroupTemplate } from './frc-kotlin/command-based/commands/SequentialCommandGroupTemplate';
import { TrapezoidProfileCommandTemplate } from './frc-kotlin/command-based/commands/TrapezoidProfileCommandTemplate';

// Command based Subsystems
import { CommandSubsystemTemplate } from './frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { PIDSubsystemTemplate } from './frc-kotlin/command-based/subsystems/PIDSubsystemTemplate';
import { ProfiledPIDSubsystemTemplate } from './frc-kotlin/command-based/subsystems/ProfiledPIDSubsystemTemplate';
import { TrapezoidProfileSubsystemTemplate } from './frc-kotlin/command-based/subsystems/TrapezoidProfileSubsystemTemplate';

// Old Command Based
import { OldCommandTimedCommandTemplate } from './frc-kotlin/old-command-based/commands/TimedCommand';
import { OldCommandInstantCommandTemplate } from './frc-kotlin/old-command-based/commands/InstantCommandTemplate';
import { OldCommandPIDSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/PIDSubsystemTemplate';
import { OldCommandTriggerTemplate } from './frc-kotlin/old-command-based/triggers/TriggerTemplate';
import { OldCommandRobotMapTemplate } from './frc-kotlin/old-command-based/RobotMap';
import { OldCommandOITemplate } from './frc-kotlin/old-command-based/OI';
import { OldCommandGroupTemplate } from './frc-kotlin/old-command-based/commands/CommandGroupTemplate';
import { OldCommandSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/SubsystemTemplate';
import { OldCommandRobotTemplate } from './frc-kotlin/old-command-based/Robot';
import { OldCommandTemplate } from './frc-kotlin/old-command-based/commands/CommandTemplate';

export interface ITemplateProvider {
	// TODO: Define completely
	getTemplateObject(targetTemplateType: templateType): ITemplate | null;
}

export interface ITemplate {
	text: string;
}

export class DummyTemplateProvider {
	getTemplateObject(targetTemplateType: templateType): ITemplate | null {
		return null;
	}
}

export class DummyTemplate {
	text = "";
}

export class IntegratedTemplateProvider {
	getTemplateObject(targetTemplateType: templateType): ITemplate | null {
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

			// Misc
			case templateType.buildGradle:
				return new BuildGradleTemplate();
			case templateType.emptyClass:
				return new EmptyClassTemplate();

			// Default case should never run because the Integrated Template Provider is the fail safe
			default:
				return null;
		}
	}
}
