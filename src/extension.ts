"use strict";
import * as vscode from "vscode";
import * as preferences from "./util/preferences";
import * as compliance from "./util/compliance";
import { displayChangelog } from './util/changelog';
import { registerCommands } from "./commands/commands";
import { TelemetryWrapper } from "./telemetry";

var currentWorkspacePath: string;
var currentWorkspaceFsPath: string;
export var telemetryWrapper: TelemetryWrapper;

export function resetWorkspaceFolderPaths() {
    if (typeof vscode.workspace.workspaceFolders === "undefined") {
        console.log("Not a valid workspace");
        vscode.window.showErrorMessage("Kotlin for FRC: Not a workspace!");
        return;
    }

    currentWorkspacePath = vscode.workspace.workspaceFolders[0].uri.path;
    currentWorkspaceFsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
}

export async function activate(context: vscode.ExtensionContext) {
    // Setting up current workspace
    resetWorkspaceFolderPaths();

    // Registering commands
    console.log("Registering commands");
    await registerCommands(context);

    // Compliance testing
    console.log("Compliance testing");
    if (await compliance.isFRCKotlinProject()) {
        if (preferences.getRunComplianceTests()) {
            // * Check build.gradle
            if (!await compliance.isGradleRioVersionCompliant()) {
                await compliance.makeGradleRioVersionCompliant();
            }
        }
    }

    // Check if the extension was updated and display the changelog if it was
    displayChangelog(context);

    // Instantiate the telemetryWrapper
    telemetryWrapper = new TelemetryWrapper();
}

// this method is called when your extension is deactivated
export function deactivate() {
    telemetryWrapper.dispose();
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
