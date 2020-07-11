"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as customfs from "../file_manipulation/file_system";
import * as rimraf from "rimraf";
import * as kotlinExt from "../extension";
import { templateType, robotType, getTemplateObjectFromRobotType,
		getTemplateObjectFromTemplateType, parseTemplate,
		getParsedGradle, getMainTemplateObject } from "../templates/template_interpreter";

export function determineRobotType(robotJava: string) {
	var currentRobotType: robotType = robotType.timed;

	if (robotJava.includes("edu.wpi.first.wpilibj2.command.Command")) {
		currentRobotType = robotType.command;
		console.log("Command");
	}
	else if (robotJava.includes("edu.wpi.first.wpilibj.command.Command")) {
		currentRobotType = robotType.oldCommand;
		console.log("Old Command");
	}
	else if (robotJava.includes("edu.wpi.first.wpilibj.TimedRobot")) {
		if (robotJava.includes("edu.wpi.first.wpilibj.smartdashboard.SendableChooser")) {
			currentRobotType = robotType.timed;
			console.log("Timed");
		}
		else {
			currentRobotType = robotType.timedSkeleton;
			console.log("Timed skeleton");
		}
	}
	else if (robotJava.includes("edu.wpi.first.hal.HAL")) {
		currentRobotType = robotType.robotBaseSkeleton;
		console.log("Robot Base Skeleton");
	}

	return currentRobotType;
}

function createBuildGradle() {
	filegenerator.createFileWithContent("build.gradle", getParsedGradle());
}

function createMainKt() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Main.kt", getMainTemplateObject().getText());
}

function createMainKtAndBuildGradle() {
	createMainKt();
	createBuildGradle();
}

function convertTimed() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.timed).getText());
	createMainKtAndBuildGradle();
}

function convertTimedSkeleton() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.timedSkeleton).getText());
	createMainKtAndBuildGradle();
}

function convertRobotBaseSkeleton() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.robotBaseSkeleton).getText());
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
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromTemplateType(templateType.robot).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Constants.kt", getTemplateObjectFromTemplateType(templateType.constants).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotContainer.kt", getTemplateObjectFromTemplateType(templateType.robotContainer).getText());
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", parseTemplate("ExampleCommand", "frc.robot.commands", templateType.command));
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateType.subsystem));
}

async function convertOldCommand() {
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands");
	}
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems");
	}

	// Static files(don't need any name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromTemplateType(templateType.oldRobot).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotMap.kt", getTemplateObjectFromTemplateType(templateType.oldRobotMap).getText());
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/OI.kt", getTemplateObjectFromTemplateType(templateType.oldOI).getText());
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", parseTemplate("ExampleCommand", "frc.robot.commands", templateType.oldCommand));
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateType.oldSubsystem));
}

export function convertJavaProject(currentRobotType: robotType) {
	kotlinExt.telemetryWrapper.sendRobotType(currentRobotType);
	console.log("Deleting java project");
	var pathToDelete = kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java";
	console.log(pathToDelete);
	rimraf(pathToDelete, function () {
		console.log("Done deleting");
		console.log("Recreating structure");
		vscode.workspace.fs.createDirectory(vscode.Uri.file(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot")).then(async () => {
			console.log("Done recreating basic file structure");
		
			switch(currentRobotType) {
				case robotType.command:
					await convertCommand();
					break;
				case robotType.oldCommand:
					await convertOldCommand();
					break;
				case robotType.timed:
					convertTimed();
					break;
				case robotType.timedSkeleton:
					convertTimedSkeleton();
					break;
				case robotType.robotBaseSkeleton:
					convertRobotBaseSkeleton();
					break;
				default:
					vscode.window.showErrorMessage("Kotlin For FRC: ERROR 'Invalid Template Type'. Please report in the issues section on github with a detailed description of what steps were taken.");
					return;
			}

			vscode.window.showInformationMessage("Kotlin for FRC: Conversion complete!");
		});		
	});
}
