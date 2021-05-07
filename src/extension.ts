"use strict";
import * as vscode from "vscode";
import * as semver from "semver";
import * as grv from "./util/gradlerioversion";
import * as customfs from "./fileManipulation/fileSystem";
import { homedir } from "os";
import { targetYear } from "./constants";
import { displayChangelog } from './util/changelog';
import { registerCommands } from "./commands/commands";
import { TelemetryReporter } from "./util/telemetry";
import { ITemplateProvider, IntegratedTemplateProvider, FileSystemTemplateProvider } from "./templates/templateProvider";

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

    // Set custom isKFFProject context
    setIsKFFProject();

    // Notify user if the WPILib VSCode extension is not installed
    alertForMissingWPILibExt();

    // Registering commands
    console.log("Registering commands");
    await registerCommands(context);

    // Setup the latest valid version of GradleRIO for this workspace
    const currentVersion = await grv.getCurrentGradleRioVersion();
    const currentYear = semver.parse(currentVersion)?.major as string | undefined;

    if (currentYear === undefined) {
        console.warn("KfF: Dispatching warning because currentYear returned undefined");
        vscode.window.showWarningMessage(`Kotlin for FRC: Could not infer current year from build.gradle. Defaulting to ${targetYear}. Warning Code: 15730`);
    }

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

function setIsKFFProject() {
    customfs.exists(currentWorkspacePath + "/.wpilib/wpilib_preferences.json").then((wpilibPrefExists: Boolean) => {
        vscode.commands.executeCommand("setContext", "isKFFProject", wpilibPrefExists);
    });
}

function alertForMissingWPILibExt() {
    const wpilibExt = vscode.extensions.getExtension("wpilibsuite.vscode-wpilib");

    if (wpilibExt === undefined) {
        vscode.window.showWarningMessage("Kotlin for FRC is meant to be a companion to the official WPILib extension, but it is not installed or you are in a restricted workspace.");
    }
}
