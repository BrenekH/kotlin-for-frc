"use strict";
import * as vscode from "vscode";
import * as filegenerator from "./file_manipulation/file_generator";
// import * as customfs from "./file_manipulation/file_system";
import * as templateinterpreter from "./templates/template_interpreter";
import * as compliance from "./util/compliance";
import * as rimraf from "rimraf";
import * as fs from "fs";
import * as kotlinExt from "./extension";
import * as chnglog from "./util/changelog";
import { setRunComplianceTests } from "./util/preferences";

export function createNew(file_path: any) {
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

export function forceCompliance() {
	// * Check build.gradle
	if (!compliance.isGradleRioVersionCompliant()) {
		compliance.makeGradleRioVersionCompliant();
	}
}

export function changeComplianceTestPref() {
	vscode.window.showQuickPick(["Turn GradleRio Version Checks On", "Turn GradleRio Version Checks Off"]).then((option: any) => {
		switch(option) {
			case "Turn GradleRio Version Checks On":
				setRunComplianceTests(true);
				break;
			case "Turn GradleRio Version Checks Off":
				setRunComplianceTests(false);
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

export function createCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.command);
}

export function createCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.command_group);
}

export function createSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.subsystem);
}

export function createTimedCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.timed_command);
}

export function createInstantCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.instant_command);
}

export function createPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.pid_subsystem);
}

export function createEmptyClass(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.empty_class);
}

export function createTrigger(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateinterpreter.templateType.trigger);
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

export function convertJavaProject(current_robot_type: templateinterpreter.robotType) {
	console.log("Deleting java project");
	var pathToDelete = kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java";
	console.log(pathToDelete);
	rimraf(pathToDelete, function () {
		console.log("Done deleting");
		console.log("Recreating structure");
		// if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin")) {
		// 	fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin");
		// }
		// if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc")) {
		// 	fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc");
		// }
		// if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot")) {
			// fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot");
		// }
		vscode.workspace.fs.createDirectory(vscode.Uri.file(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot")).then(() => {
			console.log("Done recreating basic file structure");
		
			switch(current_robot_type) {
				case templateinterpreter.robotType.command:
					convertCommand();
					break;
				case templateinterpreter.robotType.sample:
					convertSample();
					break;
				case templateinterpreter.robotType.iterative:
					convertIterative();
					break;
				case templateinterpreter.robotType.timed:
					convertTimed();
					break;
				case templateinterpreter.robotType.timed_skeleton:
					convertTimedSkeleton();
					break;
				default:
					vscode.window.showErrorMessage("Kotlin For FRC: ERROR 'Invalid Template Type'. Please report in the issues section on github with a detailed description of what steps were taken.");
					return;
			}

			vscode.window.showInformationMessage("Kotlin for FRC: Conversion complete!");
		});
	});
}

function convertIterative() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromRobotType(templateinterpreter.robotType.iterative).getText());
	createMainKtAndBuildGradle();
}

function convertTimed() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromRobotType(templateinterpreter.robotType.timed).getText());
	createMainKtAndBuildGradle();
}

function convertTimedSkeleton() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromRobotType(templateinterpreter.robotType.timed_skeleton).getText());
	createMainKtAndBuildGradle();
}

function convertCommand() {
	if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands")) {
		fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands");
	}
	if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems")) {
		fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems");
	}

	//Static files(don't need any name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.robot).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotMap.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.robot_map).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/OI.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.oi).getText());
	createMainKtAndBuildGradle();
	
	//Dynamic files(need name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", templateinterpreter.parseTemplate("ExampleCommand", "frc.robot.commands", templateinterpreter.templateType.command));
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", templateinterpreter.parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateinterpreter.templateType.subsystem));
}

function convertSample() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromRobotType(templateinterpreter.robotType.sample).getText());
	createMainKtAndBuildGradle();
}

function createMainKtAndBuildGradle() {
	createMainKt();
	createBuildGradle();
}

export function createMainKt() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Main.kt", templateinterpreter.getMainTemplateObject().getText());
}

export function createBuildGradle() {
	filegenerator.createFileWithContent("build.gradle", templateinterpreter.getParsedGradle());
}

export function showChangelog() { chnglog.showChangelog(); }

export function toggleChangelog(context: vscode.ExtensionContext) {
	var currentValue = context.globalState.get("toggleChangelog", true);
	if (currentValue === true) {
		context.globalState.update("toggleChangelog", false);
		vscode.window.showInformationMessage("Kotlin for FRC: Turned auto-show changelog off.");
	} else {
		context.globalState.update("toggleChangelog", true);
		vscode.window.showInformationMessage("Kotlin for FRC: Turned auto-show changelog on.");
	}
}

export function resetAutoShowChangelog(context: vscode.ExtensionContext ) {
	context.globalState.update("lastInitVersion", "0.0.0");
	vscode.window.showInformationMessage("Kotlin for FRC: Auto-Show changelog reset.");
}
