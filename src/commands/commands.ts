"use strict";
import * as vscode from "vscode";
import * as compliance from "../util/compliance";
import * as chnglog from "../util/changelog";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";
import { setRunComplianceTests, createPreferencesJson } from "../util/preferences";
import { createNew } from "./create_new";
import { convertJavaProject, determineRobotType } from "./conversion";
import { getLatestGradleRioVersion } from "../gradlerioversion";

function showChangelog() { chnglog.showChangelog(); }

async function forceCompliance() {
	// Check build.gradle
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

export async function registerCommands(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("kotlinforfrc.createNew", (filePath: any) => {
        kotlinExt.telemetry.recordCommandRan("createNew");
        createNew(filePath);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('kotlinforfrc.forceCompliance', async () => {
        kotlinExt.telemetry.recordCommandRan("forceCompliance");
        await forceCompliance();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.changeComplianceTestPref", () => {
        kotlinExt.telemetry.recordCommandRan("changeComplianceTestPref");
        changeComplianceTestPref();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('kotlinforfrc.convertJavaProject', async () => {
        kotlinExt.telemetry.recordCommandRan("convertJavaProject");
        console.log("Reading Robot.java");
        // Check to make sure file paths are even there
        var robotJava: string = "";
        try {
            robotJava = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java/frc/robot/Robot.java");
        }
        catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Kotlin for FRC: Could not find Robot.java. You may have already converted this project or the correct directories are missing.");
            return;
        }
        
        convertJavaProject(determineRobotType(robotJava));

        createPreferencesJson();
    });
    
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.showChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("showChangelog");
        showChangelog();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.toggleChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("toggleChangelog");
        toggleChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.resetAutoShowChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("resetAutoShowChangelog");
        resetAutoShowChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.gradlerioversion", async () => {
        kotlinExt.telemetry.recordCommandRan("gradlerioversion");
        console.log(await getLatestGradleRioVersion(context));
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.resetgradleriocache", async () => {
        kotlinExt.telemetry.recordCommandRan("resetgradleriocache");
        await context.globalState.update("latestGradleRioVersion", "");
        await context.globalState.update("lastGradleRioVersionUpdateTime", 0);
        console.log("reset gradle rio cache");
    });
    
    context.subscriptions.push(disposable);
}
