"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as customfs from "../file_manipulation/file_system";
import * as templateinterpreter from "../templates/template_interpreter";
import * as rimraf from "rimraf";
import * as kotlinExt from "../extension";
import { robotType } from "../templates/template_interpreter";

export function determineRobotType(robot_java: string) {
	var current_robot_type: robotType = robotType.sample;

	if (robot_java.includes("edu.wpi.first.wpilibj2.command.Command")) {
		current_robot_type = robotType.command;
		console.log("Command");
	}
	else if (robot_java.includes("edu.wpi.first.wpilibj.command.Command")) {
		current_robot_type = robotType.old_command;
		console.log("Old Command");
	}
	else if (robot_java.includes("edu.wpi.first.wpilibj.IterativeRobot")) {
		current_robot_type = robotType.iterative;
		console.log("Iterative");
	}
	else if (robot_java.includes("edu.wpi.first.wpilibj.SampleRobot")) {
		current_robot_type = robotType.sample;
		console.log("Sample");
	}
	else if (robot_java.includes("edu.wpi.first.wpilibj.TimedRobot")) {
		if (robot_java.includes("edu.wpi.first.wpilibj.smartdashboard.SendableChooser")) {
			current_robot_type = robotType.timed;
			console.log("Timed");
		}
		else {
			current_robot_type = robotType.timed_skeleton;
			console.log("Timed skeleton");
		}
	}

	return current_robot_type;
}

export function convertJavaProject(current_robot_type: templateinterpreter.robotType) {
	console.log("Deleting java project");
	var pathToDelete = kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java";
	console.log(pathToDelete);
	rimraf(pathToDelete, function () {
		console.log("Done deleting");
		console.log("Recreating structure");
		vscode.workspace.fs.createDirectory(vscode.Uri.file(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot")).then(async () => {
			console.log("Done recreating basic file structure");
		
			switch(current_robot_type) {
				case templateinterpreter.robotType.command:
					await convertCommand();
					break;
				case templateinterpreter.robotType.old_command:
					await convertOldCommand();
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

async function convertCommand() {
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands");
	}
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems");
	}

	// Static files(don't need any name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.robot).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Constants.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.constants).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotContainer.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.robot_container).getText());
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", templateinterpreter.parseTemplate("ExampleCommand", "frc.robot.commands", templateinterpreter.templateType.command));
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", templateinterpreter.parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateinterpreter.templateType.subsystem));
}

async function convertOldCommand() {
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands");
	}
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems");
	}

	// Static files(don't need any name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.old_robot).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotMap.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.old_robot_map).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/OI.kt", templateinterpreter.getTemplateObjectFromTemplateType(templateinterpreter.templateType.old_oi).getText());
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", templateinterpreter.parseTemplate("ExampleCommand", "frc.robot.commands", templateinterpreter.templateType.old_command));
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", templateinterpreter.parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateinterpreter.templateType.old_subsystem));
}

function convertSample() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", templateinterpreter.getTemplateObjectFromRobotType(templateinterpreter.robotType.sample).getText());
	createMainKtAndBuildGradle();
}

function createMainKtAndBuildGradle() {
	createMainKt();
	createBuildGradle();
}

function createMainKt() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Main.kt", templateinterpreter.getMainTemplateObject().getText());
}

function createBuildGradle() {
	filegenerator.createFileWithContent("build.gradle", templateinterpreter.getParsedGradle());
}
