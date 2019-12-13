"use strict";
import * as vscode from "vscode";
import { targetGradleRioVersion } from "../constants";
import { createFileWithContent } from "../file_manipulation/file_generator";
import * as customfs from "../file_manipulation/file_system";
import * as preferences from "./preferences";
import * as kotlinExt from "../extension";

export async function isGradleRioVersionCompliant(): Promise<Boolean> {
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

export async function isFRCKotlinProject(): Promise<Boolean> {
    return await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/Robot.kt");
}

export async function updateGradleRioVersion() {
    var re = /id \"edu.wpi.first.GradleRIO\" version \".+\"/gi;
    var fileContent = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/build.gradle");
    var replacementString = `id "edu.wpi.first.GradleRIO" version "${targetGradleRioVersion}"`;
    createFileWithContent("build.gradle", fileContent.replace(re, replacementString));
}
