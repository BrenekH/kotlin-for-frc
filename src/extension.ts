"use strict";
import * as vscode from "vscode";
import * as commands from "./commands";
// import * as fs from "fs";
import * as customfs from "./file_manipulation/file_system";
import * as preferences from "./util/preferences";
import * as compliance from "./util/compliance";
import { robotType } from './templates/template_interpreter';
import { displayChangelog } from './util/changelog';

var currentWorkspacePath: string;
var currentWorkspaceFsPath: string;

export async function activate(context: vscode.ExtensionContext) {

    console.log("Congratulations, your extension \"kotlin-for-frc\" is now active!");

    // Setting up current workspace
    resetWorkspaceFolderPaths();

    // * Registering commands
    console.log("Registering commands");
    let disposable = vscode.commands.registerCommand("extension.createNew", (file_path: any) => {
        commands.createNew(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.forceCompliance', async (file_path: any) => {
        await commands.forceCompliance();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("extension.changeComplianceTestPref", (file_path: any) => {
        commands.changeComplianceTestPref();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.convertJavaProject', async () => {
        console.log("Reading Robot.java");
        // Check to make sure file paths are even there
        try {
            var robot_java: string = await customfs.readFile(currentWorkspaceFsPath + "/src/main/java/frc/robot/Robot.java");
        }
        catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Kotlin for FRC: Could not find Robot.java. You may have already converted this project or the correct directories are missing.");
            return;
        }
        var current_robot_type: robotType = robotType.sample;

        if (robot_java.includes("edu.wpi.first.wpilibj.command.Command")) {
            current_robot_type = robotType.command;
            console.log("Command");
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

        commands.convertJavaProject(current_robot_type);
    });
    
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("extension.showChangelog", (file_path: any) => {
        commands.showChangelog();
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("extension.toggleChangelog", (file_path: any) => {
        commands.toggleChangelog(context);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand("extension.resetAutoShowChangelog", (file_path: any) => {
        commands.resetAutoShowChangelog(context);
    });

    context.subscriptions.push(disposable);

    // * End registering commands

    // * Compliance testing
    console.log("Compliance testing");
    if (preferences.getRunComplianceTests() && compliance.isKotlinProject()) {
        // * Check build.gradle
        if (!await compliance.isGradleRioVersionCompliant()) {
            await compliance.makeGradleRioVersionCompliant();
        }
    }

    // * Check if the extension was updated and display the changelog if it was
    displayChangelog(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

export function getWorkspaceFolderPath() {
    return currentWorkspacePath;
}

export function setWorkspaceFolderPath(path: string) {
    currentWorkspacePath = path;
} 

export function getWorkspaceFolderFsPath() {
    return currentWorkspaceFsPath;
}

export function setWorkspaceFolderFsPath(fsPath: string) {
    currentWorkspaceFsPath = fsPath;
}

export function setWorkspaceFolderPathsFromUri(uri: vscode.Uri) {
    currentWorkspaceFsPath = uri.fsPath;
    currentWorkspacePath = uri.path;
}

export function resetWorkspaceFolderPaths() {
    if (typeof vscode.workspace.workspaceFolders === "undefined") {
        console.log("Not a valid workspace");
        vscode.window.showErrorMessage("Kotlin for FRC: Not a workspace!");
        return;
    }

    currentWorkspacePath = vscode.workspace.workspaceFolders[0].uri.path;
    currentWorkspaceFsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
}
