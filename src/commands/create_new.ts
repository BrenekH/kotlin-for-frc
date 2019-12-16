"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as templateinterpreter from "../templates/template_interpreter";
import * as kotlinExt from "../extension";

export function createNew(file_path: any) {
	// TODO: Differentiate between old and new command based
	vscode.window.showQuickPick(["Command", "Subsystem", "Trigger", "Empty Class"]).then((option: any) => {
		switch(option) {
			case "Command":
				createNewCommand(file_path);
				break;
			case "Subsystem":
				createNewSubsystem(file_path);
				break;
			case "Trigger":
				createTrigger(file_path);
				break;
			case "Empty Class":
				createEmptyClass(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewSubsystem(file_path: any) {
	vscode.window.showQuickPick(["Subsystem", "PID Subsystem"]).then((option: any) => {
		switch(option) {
			case "Subsystem":
				createSubsystem(file_path);
				break;
			case "PID Subsystem":
				createPIDSubsystem(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewCommand(file_path: any) {
	vscode.window.showQuickPick(["Command", "Command Group", "Instant Command", "Timed Command"]).then((option: any) => {
		switch(option) {
			case "Command":
				createCommand(file_path);
				break;
			case "Command Group":
				createCommandGroup(file_path);
				break;
			case "Instant Command":
				createInstantCommand(file_path);
				break;
			case "Timed Command":
				createTimedCommand(file_path);
				break;
			default:
				return;
		}
	});
}

function createCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_command);
}

function createCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_command_group);
}

function createSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_subsystem);
}

function createTimedCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_timed_command);
}

function createInstantCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_instant_command);
}

function createPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_pid_subsystem);
}

function createEmptyClass(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.empty_class);
}

function createTrigger(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.old_trigger);
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
