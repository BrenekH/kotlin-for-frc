"use strict";
import * as vscode from "vscode";
import { createFileWithContent } from "../file_manipulation/file_generator";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";
import * as grv from "../gradlerioversion";

export async function isGradleRioVersionCompliant(): Promise<boolean> {
    console.log("Checking build.gradle compliance");
    let currentVersion = await grv.getCurrentGradleRioVersion();
    if (currentVersion === kotlinExt.getValidLatestGradleRioVersion()) {
        return true;
    }
    return false;
}

export async function updateGradleRioVersion() {
    var re = /id \"edu.wpi.first.GradleRIO\" version \".+\"/gi;
    var fileContent = await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/build.gradle");
    var replacementString = `id "edu.wpi.first.GradleRIO" version "${kotlinExt.getValidLatestGradleRioVersion()}"`;
    createFileWithContent("build.gradle", fileContent.replace(re, replacementString));
}

export async function makeGradleRioVersionCompliant() {
    console.log("Forcing build.gradle compliance");
    await updateGradleRioVersion();
    vscode.window.showInformationMessage("GradleRio version updated");
}

export async function isFRCKotlinProject(): Promise<Boolean> {
    return await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/kotlin/frc/robot/Robot.kt");
}
