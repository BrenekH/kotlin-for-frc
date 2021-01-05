"use strict";
import * as vscode from "vscode";
import * as chnglog from "../util/changelog";
import * as customfs from "../fileManipulation/fileSystem";
import * as kotlinExt from "../extension";
import { createNew } from "./create_new";
import { simulateCodeTerminalName } from "../constants";
import { updateGradleRioVersion } from "../gradlerioversion";
import { convertJavaProject, determineRobotType } from "./conversion";
import { getPlatformGradlew, getJavaHomeGradleArg } from "../util/gradle";

function showChangelog() { chnglog.showChangelog(); }

function resetAutoShowChangelog(context: vscode.ExtensionContext) {
	context.globalState.update("lastInitVersion", "0.0.0");
	vscode.window.showInformationMessage("Kotlin for FRC: Auto-Show changelog reset.");
}

export async function registerCommands(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("kotlinForFRC.createNew", (filePath: any) => {
        kotlinExt.telemetry.recordCommandRan("createNew");
        createNew(filePath);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.convertJavaProject", async () => {
        kotlinExt.telemetry.recordCommandRan("convertJavaProject");
        console.log("Reading Robot.java");
        // Check to make sure file paths are even there
        let robotJava: string = "";
        try {
            robotJava = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java/frc/robot/Robot.java");
        }
        catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Kotlin for FRC: Could not find Robot.java. You may have already converted this project or the correct directories are missing.");
            return;
        }

        let buildGradleContent: string = "";
		try {
			buildGradleContent = await customfs.readFile(`${kotlinExt.getWorkspaceFolderPath()}/build.gradle`);
		}
		catch (e) {
			console.error(e);
			vscode.window.showWarningMessage("Kotlin For FRC: Could not read build.gradle to differentiate between a Romi Command project and a regular Command project. Defaulting to the regular version.");
		}

        convertJavaProject(determineRobotType(robotJava, buildGradleContent));
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.showChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("showChangelog");
        showChangelog();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.resetAutoShowChangelog", () => {
        kotlinExt.telemetry.recordCommandRan("resetAutoShowChangelog");
        resetAutoShowChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.updateGradleRIOVersion", async () => {
        kotlinExt.telemetry.recordCommandRan("updateGradleRIOVersion");
        updateGradleRioVersion();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.resetGradleRIOCache", async () => {
        kotlinExt.telemetry.recordCommandRan("resetGradleRIOCache");
        await context.globalState.update("grvCache", "");
        await context.globalState.update("lastGradleRioVersionUpdateTime", 0);
        console.log("reset gradle rio cache");
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("kotlinForFRC.simulateFRCKotlinCode", () => {
        const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
        let searchTerminal;
        for (let t of terminals) {
            if (t.name === simulateCodeTerminalName) {
                searchTerminal = t;
            }
        }

        let terminal: vscode.Terminal = (searchTerminal === undefined) ? vscode.window.createTerminal(simulateCodeTerminalName) : searchTerminal;
		terminal.show();
		terminal.sendText(`${getPlatformGradlew()} simulateJava ${getJavaHomeGradleArg()}`);
    });

    context.subscriptions.push(disposable);
}
