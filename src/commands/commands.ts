"use strict";
import * as vscode from "vscode";
import * as compliance from "../util/compliance";
import * as chnglog from "../util/changelog";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";
import { setRunComplianceTests } from "../util/preferences";
import { createNew } from "./create_new";
import { convertJavaProject, determineRobotType } from "./conversion";

export async function registerCommands(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("kotlinforfrc.createNew", (file_path: any) => {
        kotlinExt.telemetryWrapper.sendCommandRun("createNew");
        createNew(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('kotlinforfrc.forceCompliance', async () => {
        kotlinExt.telemetryWrapper.sendCommandRun("forceCompliance");
        await forceCompliance();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.changeComplianceTestPref", () => {
        kotlinExt.telemetryWrapper.sendCommandRun("changeComplianceTestPref");
        changeComplianceTestPref();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('kotlinforfrc.convertJavaProject', async () => {
        kotlinExt.telemetryWrapper.sendCommandRun("convertJavaProject");
        console.log("Reading Robot.java");
        // Check to make sure file paths are even there
        try {
            var robot_java: string = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java/frc/robot/Robot.java");
        }
        catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Kotlin for FRC: Could not find Robot.java. You may have already converted this project or the correct directories are missing.");
            return;
        }
        
        convertJavaProject(determineRobotType(robot_java));
    });
    
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.showChangelog", () => {
        kotlinExt.telemetryWrapper.sendCommandRun("showChangelog");
        showChangelog();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.toggleChangelog", () => {
        kotlinExt.telemetryWrapper.sendCommandRun("toggleChangelog");
        toggleChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.resetAutoShowChangelog", () => {
        kotlinExt.telemetryWrapper.sendCommandRun("resetAutoShowChangelog");
        resetAutoShowChangelog(context);
    });

    context.subscriptions.push(disposable);
}

async function forceCompliance() {
	// * Check build.gradle
	if (!await compliance.isGradleRioVersionCompliant()) {
		await compliance.makeGradleRioVersionCompliant();
	}
}

function changeComplianceTestPref() {
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

function showChangelog() { chnglog.showChangelog(); }

function toggleChangelog(context: vscode.ExtensionContext) {
	var currentValue = context.globalState.get("toggleChangelog", true);
	if (currentValue === true) {
		context.globalState.update("toggleChangelog", false);
		vscode.window.showInformationMessage("Kotlin for FRC: Turned auto-show changelog off.");
	} else {
		context.globalState.update("toggleChangelog", true);
		vscode.window.showInformationMessage("Kotlin for FRC: Turned auto-show changelog on.");
	}
}

function resetAutoShowChangelog(context: vscode.ExtensionContext) {
	context.globalState.update("lastInitVersion", "0.0.0");
	vscode.window.showInformationMessage("Kotlin for FRC: Auto-Show changelog reset.");
}
