"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import { templateType } from "../templates/template_interpreter";
import { parseAndSaveTemplateToDocument } from "./create_new";

export function createCommandBased(filePath: any) {
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
