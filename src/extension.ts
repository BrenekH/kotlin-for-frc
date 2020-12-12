"use strict";
import * as vscode from "vscode";
import * as semver from "semver";
import * as grv from "./gradlerioversion";
import * as customfs from "./file_manipulation/file_system";
import { homedir } from "os";
import { targetYear } from "./constants";
import { displayChangelog } from './util/changelog';
import { registerCommands } from "./commands/commands";
import { TelemetryReporter } from "./telemetry";
import { ITemplateProvider, IntegratedTemplateProvider, FileSystemTemplateProvider } from "./templates/template_provider";

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

    // Setup the latest valid version of GradleRIO for this workspace
    const currentVersion = await grv.getCurrentGradleRioVersion();
    const currentYear = semver.parse(currentVersion)?.major as string | undefined;
    // TODO: Maybe add a warning or error about not being able to get year of current GradleRIO version
    const latestVersion = await grv.getLatestGradleRioVersion((currentYear === undefined) ? targetYear : currentYear, context);

    console.log(`GradleRIO latestVersion: ${latestVersion}; currentVersion ${currentVersion}`);

    const autoUpdateGradleRIOVersion: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.gradleRioVersion").get("autoUpdate");
    if (latestVersion !== undefined) {
        if (latestVersion !== currentVersion && semver.parse(latestVersion)?.major === semver.parse(currentVersion)?.major) {
            validLatestGradleRioVersion = latestVersion;
        } else {
            validLatestGradleRioVersion = currentVersion;
        }
        console.log(`Valid Latest GradleRIO Version: ${validLatestGradleRioVersion}`);

        // Auto-Update GradleRIO version
        if (await isFRCKotlinProject() && autoUpdateGradleRIOVersion && !await isGradleRioVersionUpToDate()) {
            await grv.updateGradleRioVersion();
        }
    } else {
        if (await isFRCKotlinProject() && autoUpdateGradleRIOVersion) {
            console.error("KfF: Dispatching error message about latestVersion being undefined.");
            vscode.window.showErrorMessage("Kotlin for FRC: Unable to automatically update GradleRIO version. Error Code: 50740");
        }
    }

    // Check if the extension was updated and display the changelog if it was
    displayChangelog(context);

    // Instantiate the telemetryWrapper
    telemetry = new TelemetryReporter();

    if (await isFRCKotlinProject()) {
        const autoShowChangelog: boolean | undefined = vscode.workspace.getConfiguration("kotlinForFRC.changelog").get("showOnUpdate");
        telemetry.recordActivationEvent((autoShowChangelog === undefined) ? true : autoShowChangelog,
                                        (autoUpdateGradleRIOVersion === undefined) ? true : autoUpdateGradleRIOVersion);
    }

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
    console.log("Checking GradleRIO version up-to-date");
    let currentVersion = await grv.getCurrentGradleRioVersion();
    if (currentVersion === getValidLatestGradleRioVersion()) {
        return true;
    }
    return false;
}
