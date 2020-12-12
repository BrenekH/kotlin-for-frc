"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/fileGenerator";
import { templateType } from "../templates/templateInterpreter";
import { parseAndSaveTemplateToDocument } from "./create_new";

//! Old Command Based, remove when removed from WPILib
export function oldCommandBased(filePath: any) {
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

function createOldTrigger(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldTrigger);
}

function createOldSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldSubsystem);
}

function createOldPIDSubsystem(filePath: any) {
	parseAndSaveTemplateToDocument(filePath, filegenerator.generatePackage(filePath), templateType.oldPIDSubsystem);
}
