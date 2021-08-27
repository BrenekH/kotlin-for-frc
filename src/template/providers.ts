import * as vscode from "vscode"
import { ITemplateProvider, TemplateType } from "./models";

export class FileSystemTemplateProvider implements ITemplateProvider {
	topLevelUri: vscode.Uri

	constructor(topLevelUri: vscode.Uri) {
		this.topLevelUri = topLevelUri
	}

	async getTemplate(t: TemplateType): Promise<string | null> {
		// TODO: Return null if readFile call fails
		const readData = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(this.topLevelUri, `${templateTypeToString(t)}.kfftemplate`))
		const templateString = Buffer.from(readData).toString("utf8")

		return templateString
	}
}

function templateTypeToString(t: TemplateType): string {
	switch(t) {
        // Old Command Based
        case TemplateType.oldCommandRobot:
            return "oldCommandRobot";
        case TemplateType.oldOI:
            return "oldOI";
        case TemplateType.oldRobotMap:
            return "oldRobotMap";
        case TemplateType.oldSubsystem:
            return "oldSubsystem";
        case TemplateType.oldCommand:
            return "oldCommand";
        case TemplateType.oldCommandGroup:
            return "oldCommandGroup";
        case TemplateType.oldPIDSubsystem:
            return "oldPIDSubsystem";
        case TemplateType.oldInstantCommand:
            return "oldInstantCommand";
        case TemplateType.oldTimedCommand:
            return "oldTimedCommand";
        case TemplateType.oldTrigger:
            return "oldTrigger";

        // Command based
        // General
        case TemplateType.commandRobot:
            return "commandRobot";
        case TemplateType.robotContainer:
            return "robotContainer";
        case TemplateType.commandConstants:
            return "commandConstants";
        // Commands
        case TemplateType.command:
            return "command";
        case TemplateType.instantCommand:
            return "instantCommand";
        case TemplateType.parallelCommandGroup:
            return "parallelCommandGroup";
        case TemplateType.parallelDeadlineGroup:
            return "parallelDeadlineGroup";
        case TemplateType.parallelRaceGroup:
            return "parallelRaceGroup";
        case TemplateType.PIDCommand:
            return "PIDCommand";
        case TemplateType.profiledPIDCommand:
            return "profiledPIDCommand";
        case TemplateType.sequentialCommandGroup:
            return "sequentialCommandGroup";
        case TemplateType.trapezoidProfileCommand:
            return "trapezoidProfileCommand";
        // Subsystems
        case TemplateType.subsystem:
            return "subsystem";
        case TemplateType.PIDSubsystem:
            return "PIDSubsystem";
        case TemplateType.profiledPIDSubsystem:
            return "profiledPIDSubsystem";
        case TemplateType.trapezoidProfileSubsystem:
            return "trapezoidProfileSubsystem";

        // Misc
        case TemplateType.buildGradle:
            return "buildGradle";
        case TemplateType.emptyClass:
            return "emptyClass";

        default:
            throw new Error("Invalid TemplateType passed to templateTypeToString");
    }
}
