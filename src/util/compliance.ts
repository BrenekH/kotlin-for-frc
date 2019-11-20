"use strict";
import * as vscode from "vscode";
import { targetGradleRioVersion } from "../constants";
import { createFileWithContent } from "../file_manipulation/file_generator";
import * as preferences from "./preferences";
// import * as fs from "fs";
import * as kotlinExt from "../extension";

export function isGradleRioVersionCompliant(): boolean {
    console.log("Checking build.gradle compliance");
    let registeredVersion = preferences.getWPILibVersion();
    if (registeredVersion === targetGradleRioVersion) {
        return true;
    }
    return false;
}

export function makeGradleRioVersionCompliant() {
    console.log("Forcing build.gradle compliance");
    updateGradleRioVersion();
    vscode.window.showInformationMessage("GradleRio version updated");
    preferences.setWPILibVersion(targetGradleRioVersion);
}

export function isKotlinProject(): boolean {
    return fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/src/main/java/frc/robot/Robot.kt");
}

export function updateGradleRioVersion() {
    var re = /id \"edu.wpi.first.GradleRIO\" version \".+\"/gi;
    var fileContent = fs.readFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/build.gradle", "utf-8");
    var replacementString = `id "edu.wpi.first.GradleRIO" version "${targetGradleRioVersion}"`;
    createFileWithContent("build.gradle", fileContent.replace(re, replacementString));
}
