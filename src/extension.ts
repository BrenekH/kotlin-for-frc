"use strict";
import * as vscode from "vscode";
import * as semver from "semver";
import * as grv from "./gradlerioversion";
import { homedir } from "os";
import { displayChangelog } from './util/changelog';
import { registerCommands } from "./commands/commands";
import { TelemetryReporter } from "./telemetry";
import { ITemplateProvider, IntegratedTemplateProvider, FileSystemTemplateProvider } from "./templates/template_provider";
import * as customfs from "./file_manipulation/file_system";

var currentWorkspacePath: string;
var currentWorkspaceFsPath: string;
var validLatestGradleRioVersion: string;
export var telemetry: TelemetryReporter;
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

    // Auto-Update GradleRIO version
    const autoUpdateGradleRIOVersion: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.gradleRioVersion").get("autoUpdate");
    if (await isFRCKotlinProject()) {
        if (autoUpdateGradleRIOVersion) {
            if (!await isGradleRioVersionUpToDate()) {
                await grv.updateGradleRioVersion();
            }
        }

        const autoShowChangelog: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.changelog").get("showOnUpdate");
        telemetry.recordActivationEvent((autoShowChangelog === undefined) ? true : autoShowChangelog,
                                        (autoUpdateGradleRIOVersion === undefined) ? true : autoUpdateGradleRIOVersion);
    }

    // Check if the extension was updated and display the changelog if it was
    displayChangelog(context);

    // Instantiate the telemetryWrapper
    telemetry = new TelemetryReporter();

    // Instantiate template providers
    localTemplateProvider = new FileSystemTemplateProvider(getWorkspaceFolderPath() + "/.kfftemplates");
    globalTemplateProvider = new FileSystemTemplateProvider(homedir() + "/.kfftemplates");
}

// this method is called when your extension is deactivated
export function deactivate() {}

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

export async function isFRCKotlinProject(): Promise<Boolean> {
    return await customfs.exists(getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/Robot.kt");
}

export async function isGradleRioVersionUpToDate(): Promise<boolean> {
    console.log("Checking build.gradle compliance");
    let currentVersion = await grv.getCurrentGradleRioVersion();
    if (currentVersion === getValidLatestGradleRioVersion()) {
        return true;
    }
    return false;
}
