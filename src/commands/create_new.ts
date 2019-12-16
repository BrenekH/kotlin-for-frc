"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as templateinterpreter from "../templates/template_interpreter";
import * as kotlinExt from "../extension";

export function createNew(file_path: any) {
	vscode.window.showQuickPick(["New Command Based Classes", "Old Command Based Classes", "Empty Class"]).then((option: any) => {
		switch(option) {
			case "New Command Based Classes":
				commandBased(file_path);
				break;
			case "Old Command Based Classes":
				oldCommandBased(file_path);
				break;
			case "Empty Class":
				createEmptyClass(file_path);
				break;
			default:
				return;
		}
	});
}

//* Command Based
function commandBased(file_path: any) {
	vscode.window.showQuickPick(["Command", "Subsystem"]).then((option: any) => {
		switch(option) {
			case "Command":
				createCommand(file_path);
				break;
			case "Subsystem":
				createSubsystem(file_path);
				break;
			default:
				return;
		}
	});
}

function createCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.command);
}

function createSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.subsystem);
}

//! Old Command Based, remove when removed from WPILib
function oldCommandBased(file_path: any) {
	vscode.window.showQuickPick(["Command", "Subsystem", "Trigger"]).then((option: any) => {
		switch(option) {
			case "Command":
				createNewOldCommand(file_path);
				break;
			case "Subsystem":
				createNewOldSubsystem(file_path);
				break;
			case "Trigger":
				createOldTrigger(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewOldSubsystem(file_path: any) {
	vscode.window.showQuickPick(["Subsystem", "PID Subsystem"]).then((option: any) => {
		switch(option) {
			case "Subsystem":
				createOldSubsystem(file_path);
				break;
			case "PID Subsystem":
				createOldPIDSubsystem(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewOldCommand(file_path: any) {
	vscode.window.showQuickPick(["Command", "Command Group", "Instant Command", "Timed Command"]).then((option: any) => {
		switch(option) {
			case "Command":
				createOldCommand(file_path);
				break;
			case "Command Group":
				createOldCommandGroup(file_path);
				break;
			case "Instant Command":
				createOldInstantCommand(file_path);
				break;
			case "Timed Command":
				createOldTimedCommand(file_path);
				break;
			default:
				return;
		}
	});
}

function createOldCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_command);
}

function createOldCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_command_group);
}

function createOldSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_subsystem);
}

function createOldTimedCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_timed_command);
}

function createOldInstantCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_instant_command);
}

function createOldPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_pid_subsystem);
}

function createOldTrigger(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_trigger);
}

//* Miscellaneous
function createEmptyClass(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.empty_class);
}

function parseAndSaveTemplateToDocument(file_path: any, package_name: string, templateType: templateinterpreter.templateType) {
	console.log(file_path);
	vscode.window.showInputBox({
		placeHolder: "Name your " + templateType.toString()
	}).then(value => {
		if (!value) { return; }
		var user_data = value;
		var workspace_folder_path = kotlinExt.getWorkspaceFolderFsPath();
		var path_to_pass = file_path.fsPath.replace(workspace_folder_path, "");
		filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(path_to_pass + "/" + user_data + ".kt", templateinterpreter.parseTemplate(user_data, package_name, templateType)));
	});
}
