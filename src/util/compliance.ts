"use strict";
import * as vscode from "vscode";
import { targetGradleRioVersion } from "../constants";
import { createFileWithContent } from "../file_manipulation/file_generator";
import * as preferences from "./preferences";
import * as fs from "fs";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";

export async function isGradleRioVersionCompliant(): Promise<boolean> {
    console.log("Checking build.gradle compliance");
    let registeredVersion = await preferences.getWPILibVersion();
    if (registeredVersion === targetGradleRioVersion) {
        return true;
    }
    return false;
}

export async function makeGradleRioVersionCompliant() {
    console.log("Forcing build.gradle compliance");
    await updateGradleRioVersion();
    vscode.window.showInformationMessage("GradleRio version updated");
    preferences.setWPILibVersion(targetGradleRioVersion);
}

export function isKotlinProject(): boolean {
    return fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java/frc/robot/Robot.kt");
}

export async function updateGradleRioVersion() {
    var re = /id \"edu.wpi.first.GradleRIO\" version \".+\"/gi;
    var fileContent = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/build.gradle");
    var replacementString = `id "edu.wpi.first.GradleRIO" version "${targetGradleRioVersion}"`;
    createFileWithContent("build.gradle", fileContent.replace(re, replacementString));
}
