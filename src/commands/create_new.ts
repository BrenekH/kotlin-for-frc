"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as templateinterpreter from "../templates/template_interpreter";
import * as kotlinExt from "../extension";
import { templateType } from "../templates/template_interpreter";

function parseAndSaveTemplateToDocument(filePath: any, packageName: string, templateType: templateType) {
	console.log(filePath);
	vscode.window.showInputBox({
		placeHolder: "Name your " + templateType.toString()
	}).then((value) => {
		if (!value) { return; }
		var userData = value;
		var workspaceFolderPath = kotlinExt.getWorkspaceFolderFsPath();
		var pathToPass = filePath.fsPath.replace(workspaceFolderPath, "");
		filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(pathToPass + "/" + userData + ".kt", templateinterpreter.parseTemplate(userData, packageName, templateType)));
	});
}

function createEmptyClass(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.emptyClass);
}

function createCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.command);
}

function createInstantCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.instantCommand);
}

function createParallelCommandGroup(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.parallelCommandGroup);
}

function createParallelDeadlineGroup(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.parallelDeadlineGroup);
}

function createParallelRaceGroup(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.parallelRaceGroup);
}

function createPIDCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.PIDCommand);
}

function createProfiledPIDCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.profiledPIDCommand);
}

function createSequentialCommandGroup(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.sequentialCommandGroup);
}

function createTrapezoidProfileCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.trapezoidProfileCommand);
}

function createNewCommand(filePath: any) {
	vscode.window.showQuickPick([
		templateType.command,
		templateType.instantCommand,
		templateType.parallelCommandGroup,
		templateType.parallelDeadlineGroup,
		templateType.parallelRaceGroup,
		templateType.PIDCommand,
		templateType.profiledPIDCommand,
		templateType.sequentialCommandGroup,
		templateType.trapezoidProfileCommand
	]).then((option: any) => {
		switch(option) {
			case templateType.command:
				createCommand(filePath);
				break;
			case templateType.instantCommand:
				createInstantCommand(filePath);
				break;
			case templateType.parallelCommandGroup:
				createParallelCommandGroup(filePath);
				break;
			case templateType.parallelDeadlineGroup:
				createParallelDeadlineGroup(filePath);
				break;
			case templateType.parallelRaceGroup:
				createParallelRaceGroup(filePath);
				break;
			case templateType.PIDCommand:
				createPIDCommand(filePath);
				break;
			case templateType.profiledPIDCommand:
				createProfiledPIDCommand(filePath);
				break;
			case templateType.sequentialCommandGroup:
				createSequentialCommandGroup(filePath);
				break;
			case templateType.trapezoidProfileCommand:
				createTrapezoidProfileCommand(filePath);
				break;
			default:
				return;
		}
	});
}

function createSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.subsystem);
}

function createPIDSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.PIDSubsystem);
}

function createProfiledPIDSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.profiledPIDSubsystem);
}

function createTrapezoidProfileSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.trapezoidProfileSubsystem);
}

function createNewSubsystem(filePath: any) {
	vscode.window.showQuickPick([
		templateType.subsystem,
		templateType.PIDSubsystem,
		templateType.profiledPIDSubsystem,
		templateType.trapezoidProfileSubsystem
	]).then((option: any) => {
		switch(option) {
			case templateType.subsystem:
				createSubsystem(filePath);
				break;
			case templateType.PIDSubsystem:
				createPIDSubsystem(filePath);
				break;
			case templateType.profiledPIDSubsystem:
				createProfiledPIDSubsystem(filePath);
				break;
			case templateType.trapezoidProfileSubsystem:
				createTrapezoidProfileSubsystem(filePath);
				break;
			default:
				return;
		}
	});
}

function commandBased(filePath: any) {
	vscode.window.showQuickPick(["Command", "Subsystem"]).then((option: any) => {
		switch(option) {
			case "Command":
				createNewCommand(filePath);
				break;
			case "Subsystem":
				createNewSubsystem(filePath);
				break;
			default:
				return;
		}
	});
}

function createOldCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldCommand);
}

function createOldCommandGroup(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldCommandGroup);
}

function createOldTimedCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldTimedCommand);
}

function createOldInstantCommand(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldInstantCommand);
}

function createNewOldCommand(filePath: any) {
	vscode.window.showQuickPick(["Command", "Command Group", "Instant Command", "Timed Command"]).then((option: any) => {
		switch(option) {
			case "Command":
				createOldCommand(filePath);
				break;
			case "Command Group":
				createOldCommandGroup(filePath);
				break;
			case "Instant Command":
				createOldInstantCommand(filePath);
				break;
			case "Timed Command":
				createOldTimedCommand(filePath);
				break;
			default:
				return;
		}
	});
}

function createOldTrigger(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldTrigger);
}

function createOldSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldSubsystem);
}

function createOldPIDSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldPIDSubsystem);
}

function createNewOldSubsystem(filePath: any) {
	vscode.window.showQuickPick(["Subsystem", "PID Subsystem"]).then((option: any) => {
		switch(option) {
			case "Subsystem":
				createOldSubsystem(filePath);
				break;
			case "PID Subsystem":
				createOldPIDSubsystem(filePath);
				break;
			default:
				return;
		}
	});
}

//! Old Command Based, remove when removed from WPILib
function oldCommandBased(filePath: any) {
	vscode.window.showQuickPick(["Command", "Subsystem", "Trigger"]).then((option: any) => {
		switch(option) {
			case "Command":
				createNewOldCommand(filePath);
				break;
			case "Subsystem":
				createNewOldSubsystem(filePath);
				break;
			case "Trigger":
				createOldTrigger(filePath);
				break;
			default:
				return;
		}
	});
}

export function createNew(filePath: any) {
	vscode.window.showQuickPick(["New Command Based Classes", "Old Command Based Classes", "Empty Class"]).then((option: any) => {
		switch(option) {
			case "New Command Based Classes":
				commandBased(filePath);
				break;
			case "Old Command Based Classes":
				oldCommandBased(filePath);
				break;
			case "Empty Class":
				createEmptyClass(filePath);
				break;
			default:
				return;
		}
	});
}
