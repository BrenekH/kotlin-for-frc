"use strict";
import * as vscode from "vscode";
import * as filegenerator from "../file_manipulation/file_generator";
import * as templateinterpreter from "../templates/template_interpreter";
import * as kotlinExt from "../extension";
import { templateType } from "../templates/template_interpreter";

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
				createNewCommand(file_path);
				break;
			case "Subsystem":
				createNewSubsystem(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewCommand(file_path: any) {
	vscode.window.showQuickPick([
		templateType.command,
		templateType.instant_command,
		templateType.parallel_command_group,
		templateType.parallel_deadline_group,
		templateType.parallel_race_group,
		templateType.pid_command,
		templateType.profiled_pid_command,
		templateType.sequential_command_group,
		templateType.trapezoid_profile_command
	]).then((option: any) => {
		switch(option) {
			case templateType.command:
				createCommand(file_path);
				break;
			case templateType.instant_command:
				createInstantCommand(file_path);
				break;
			case templateType.parallel_command_group:
				createParallelCommandGroup(file_path);
				break;
			case templateType.parallel_deadline_group:
				createParallelDeadlineGroup(file_path);
				break;
			case templateType.parallel_race_group:
				createParallelRaceGroup(file_path);
				break;
			case templateType.pid_command:
				createPIDCommand(file_path);
				break;
			case templateType.profiled_pid_command:
				createProfiledPIDCommand(file_path);
				break;
			case templateType.sequential_command_group:
				createSequentialCommandGroup(file_path);
				break;
			case templateType.trapezoid_profile_command:
				createTrapezoidProfileCommand(file_path);
				break;
			default:
				return;
		}
	});
}

function createNewSubsystem(file_path: any) {
	vscode.window.showQuickPick([
		templateType.subsystem,
		templateType.pid_subsystem,
		templateType.profiled_pid_subsystem,
		templateType.trapezoid_profile_subsystem
	]).then((option: any) => {
		switch(option) {
			case templateType.subsystem:
				createSubsystem(file_path);
				break;
			case templateType.pid_subsystem:
				createPIDSubsystem(file_path);
				break;
			case templateType.profiled_pid_subsystem:
				createProfiledPIDSubsystem(file_path);
				break;
			case templateType.trapezoid_profile_subsystem:
				createTrapezoidProfileSubsystem(file_path);
				break;
			default:
				return;
		}
	});
}

// Commands
function createCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.command);
}

function createInstantCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.instant_command);
}

function createParallelCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.parallel_command_group);
}

function createParallelDeadlineGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.parallel_deadline_group);
}

function createParallelRaceGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.parallel_race_group);
}

function createPIDCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.pid_command);
}

function createProfiledPIDCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.profiled_pid_command);
}

function createSequentialCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.sequential_command_group);
}

function createTrapezoidProfileCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.trapezoid_profile_command);
}

// Subsystems

function createSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.subsystem);
}

function createPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.pid_subsystem);
}

function createProfiledPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.profiled_pid_subsystem);
}

function createTrapezoidProfileSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.trapezoid_profile_subsystem);
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
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_command);
}

function createOldCommandGroup(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_command_group);
}

function createOldSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_subsystem);
}

function createOldTimedCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_timed_command);
}

function createOldInstantCommand(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_instant_command);
}

function createOldPIDSubsystem(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_pid_subsystem);
}

function createOldTrigger(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.old_trigger);
}

//* Miscellaneous
function createEmptyClass(file_path: any) {
	parseAndSaveTemplateToDocument(file_path, filegenerator.generatePackage(file_path), templateType.empty_class);
}

function parseAndSaveTemplateToDocument(file_path: any, package_name: string, templateType: templateType) {
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
