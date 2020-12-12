"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/fileGenerator";
import * as customfs from "../file_manipulation/fileSystem";
import * as rimraf from "rimraf";
import * as kotlinExt from "../extension";
import { templateType, robotType, getTemplateObjectFromRobotType,
		getTemplateObjectFromTemplateType, parseTemplate,
		getParsedGradle, getMainTemplateObject } from "../templates/templateInterpreter";
import { ITemplate } from "../templates/templateProvider";

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
	getParsedGradle().then((value: string) => { filegenerator.createFileWithContent("build.gradle", value); });
}

function createMainKt() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Main.kt", getMainTemplateObject().text);
}

function createMainKtAndBuildGradle() {
	createMainKt();
	createBuildGradle();
}

function convertTimed() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.timed).text);
	createMainKtAndBuildGradle();
}

function convertTimedSkeleton() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.timedSkeleton).text);
	createMainKtAndBuildGradle();
}

function convertRobotBaseSkeleton() {
	filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", getTemplateObjectFromRobotType(robotType.robotBaseSkeleton).text);
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
	getTemplateObjectFromTemplateType(templateType.robot).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", value.text); });
	getTemplateObjectFromTemplateType(templateType.constants).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Constants.kt", value.text); });
	getTemplateObjectFromTemplateType(templateType.robotContainer).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotContainer.kt", value.text); });
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	parseTemplate("ExampleCommand", "frc.robot.commands", templateType.command).then((value: string) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", value); });
	parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateType.subsystem).then((value: string) => {  filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", value); });
}

async function convertOldCommand() {
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/commands");
	}
	if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems")) {
		await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/subsystems");
	}

	// Static files(don't need any name changes)
	getTemplateObjectFromTemplateType(templateType.oldRobot).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/Robot.kt", value.text); });
	getTemplateObjectFromTemplateType(templateType.oldRobotMap).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/RobotMap.kt", value.text); });
	getTemplateObjectFromTemplateType(templateType.oldOI).then((value: ITemplate) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/OI.kt", value.text); });
	createMainKtAndBuildGradle();
	
	// Dynamic files(need name changes)
	parseTemplate("ExampleCommand", "frc.robot.commands", templateType.oldCommand).then((value: string) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/commands/ExampleCommand.kt", value); });
	parseTemplate("ExampleSubsystem", "frc.robot.subsystems", templateType.oldSubsystem).then((value: string) => { filegenerator.createFileWithContent("/src/main/kotlin/frc/robot/subsystems/ExampleSubsystem.kt", value); });
}

export function convertJavaProject(currentRobotType: robotType) {
	kotlinExt.telemetry.recordConversionEvent(currentRobotType);
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
