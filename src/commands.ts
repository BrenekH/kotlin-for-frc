"use strict";
import * as vscode from "vscode";
import * as filegenerator from "./file_generator";
import * as templateinterpreter from "./template_interpreter";
import * as rimraf from "rimraf";
import * as fs from "fs";

export function createCommand(file_path: any) {
  console.log(file_path);
  vscode.window
	.showInputBox({
	  placeHolder: "Name your command"
	})
	.then(value => {
	  if (!value) {
		return;
	  }
	  var user_data = value;
	  if (typeof vscode.workspace.workspaceFolders === "undefined") {
		return;
	  }
	  var workspace_folder_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
	  var path_to_pass = file_path.fsPath.replace(workspace_folder_path, "");
	  filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(path_to_pass + "/" + user_data + ".kt", templateinterpreter.parseTemplate(user_data, templateinterpreter.templateType.command)));
	});
}

export function createCommandGroup(file_path: any) {
	console.log(file_path);
	vscode.window.showInputBox({
		placeHolder: "Name your command group"
	}).then(value => {
		if (!value) { return; }
		var user_data = value;
		if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			return;
		}
		var workspace_folder_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
		var path_to_pass = file_path.fsPath.replace(workspace_folder_path, "");
		filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(path_to_pass + "/" + user_data + ".kt", templateinterpreter.parseTemplate(user_data, templateinterpreter.templateType.command_group)));
	});
}

export function createSubsystem(file_path: any) {
	console.log(file_path);
	vscode.window.showInputBox({
		placeHolder: "Name your subsystem"
	}).then(value => {
		if (!value) { return; }
		var user_data = value;
		if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			return;
		}
		var workspace_folder_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
		var path_to_pass = file_path.fsPath.replace(workspace_folder_path, "");
		filegenerator.showDocumentInViewer(filegenerator.createFileWithContent(path_to_pass + "/" + user_data + ".kt", templateinterpreter.parseTemplate(user_data, templateinterpreter.templateType.subsystem)));
	});
}

export function convertJavaProject() {
	console.log("Deleting java project");
	if (typeof vscode.workspace.workspaceFolders === 'undefined') {
		return;
	}
	var pathToDelete = vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/java";
	console.log(pathToDelete);
	rimraf(pathToDelete, function () {
		console.log("Done deleteing");
		console.log("Recreating structure");
		if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			console.log("Not a valid workspace");
			vscode.window.showErrorMessage("Kotlin for FRC: Not a valid workspace!");
			return;
		}
		if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin")) {
			fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin");
		}
		if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc")) {
			fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc");
		}
		if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot")) {
			fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot");
		}
		if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot/commands")) {
			fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot/commands");
		}
		if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot/subsystems")) {
			fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/kotlin/frc/robot/subsystems");
		}
		console.log("Done recreating");
		//Static files(don't need any name changes)
		filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObject(templateinterpreter.templateType.robot).getText());
		filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotMap.kt", templateinterpreter.getTemplateObject(templateinterpreter.templateType.robot_map).getText());
		filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/OI.kt", templateinterpreter.getTemplateObject(templateinterpreter.templateType.oi).getText());
		filegenerator.createFileWithContent("build.gradle", templateinterpreter.getTemplateObject(templateinterpreter.templateType.build_gradle).getText());
		
		//Dynamic files(need name changes)
		filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", templateinterpreter.parseTemplate("ExampleCommand", templateinterpreter.templateType.command));
		filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", templateinterpreter.parseTemplate("ExampleSubsystem", templateinterpreter.templateType.subsystem));
		
		vscode.window.showInformationMessage("Kotlin for FRC: Conversion complete!");
	});
}