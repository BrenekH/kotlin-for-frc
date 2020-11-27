"use strict";
import * as vscode from "vscode";
import * as semver from "semver";
import * as preferences from "./util/preferences";
import * as compliance from "./util/compliance";
import * as grv from "./gradlerioversion";
import { homedir } from "os";
import { displayChangelog } from './util/changelog';
import { registerCommands } from "./commands/commands";
import { TelemetryWrapper } from "./telemetry";
import { ITemplateProvider, IntegratedTemplateProvider, FileSystemTemplateProvider } from "./templates/template_provider";

var currentWorkspacePath: string;
var currentWorkspaceFsPath: string;
var validLatestGradleRioVersion: string;
export var telemetryWrapper: TelemetryWrapper;
export var localTemplateProvider: ITemplateProvider;
export var globalTemplateProvider: ITemplateProvider;
export const integratedTemplateProvider: ITemplateProvider = new IntegratedTemplateProvider();

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
        if (await preferences.getRunComplianceTests()) {
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

    // Setup the latest valid version of GradleRIO
    const latestVersion = await grv.getLatestGradleRioVersion(context);
    const currentVersion = await grv.getCurrentGradleRioVersion();

    console.log(`GradleRIO latestVersion: ${latestVersion}; currentVersion ${currentVersion}`);

    if (latestVersion !== currentVersion && semver.parse(latestVersion)?.major === semver.parse(currentVersion)?.major) {
        validLatestGradleRioVersion = latestVersion;
    } else {
        validLatestGradleRioVersion = currentVersion;
    }
    console.log(`Valid Latest GradleRIO Version: ${validLatestGradleRioVersion}`);

    // Instantiate template providers
    localTemplateProvider = new FileSystemTemplateProvider(getWorkspaceFolderPath() + "/.kfftemplates");
    globalTemplateProvider = new FileSystemTemplateProvider(homedir() + "/.kfftemplates");
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

export function getValidLatestGradleRioVersion() {
    return validLatestGradleRioVersion;
}
