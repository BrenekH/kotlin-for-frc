"use strict";
import * as vscode from "vscode";

export function getPlatformGradlew(): string {
    if (process.platform === "win32") {
        return ".\\gradlew.bat";
    }
    return "./gradlew";
}

export function getJavaHomeGradleArg(): string {
    let javaHomeConfig = vscode.workspace.getConfiguration("java").get<string | undefined | null>("home");
    let kffJavaHomeConfig = vscode.workspace.getConfiguration("kotlinForFRC.simulate").get<string | undefined | null>("javaHome");
    if ((kffJavaHomeConfig === null || kffJavaHomeConfig === undefined) && (javaHomeConfig === null || javaHomeConfig === undefined)) {
        return "";
    }
    let javaHome = "";
    if (kffJavaHomeConfig !== null && kffJavaHomeConfig !== undefined) {
        javaHome = kffJavaHomeConfig;
    } else if (javaHomeConfig !== null && javaHomeConfig !== undefined) {
        // Should just be an else but typescript doesn't realize that the above return statement exists to check null/undefined
        javaHome = javaHomeConfig;
    }
    return `-Dorg.gradle.java.home="${javaHome}"`;
}
