"use strict";
import * as vscode from "vscode";
import * as chnglog from "../util/changelog";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";
import { createNew } from "./create_new";
import { convertJavaProject, determineRobotType } from "./conversion";
import { getLatestGradleRioVersion } from "../gradlerioversion";

function showChangelog() { chnglog.showChangelog(); }

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
    });
    
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.showChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("showChangelog");
        showChangelog();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.resetAutoShowChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("resetAutoShowChangelog");
        resetAutoShowChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.updateGradleRIOVersion", async () => {
        kotlinExt.telemetry.recordCommandRan("updateGradleRIOVersion");
        // TODO: Update build.gradle with latest GradleRIO version
        console.log(await getLatestGradleRioVersion(context));
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinforfrc.resetGradleRIOCache", async () => {
        kotlinExt.telemetry.recordCommandRan("resetGradleRIOCache");
        await context.globalState.update("latestGradleRioVersion", "");
        await context.globalState.update("lastGradleRioVersionUpdateTime", 0);
        console.log("reset gradle rio cache");
    });
    
    context.subscriptions.push(disposable);
}
