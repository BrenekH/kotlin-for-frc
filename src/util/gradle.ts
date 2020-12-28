"use strict";
import * as vscode from "vscode";

export function getPlatformGradlew(): string {
    if (process.platform === "win32") {
        return ".\\gradlew.bat";
    }
    return "./gradlew";
}

export function getJavaHomeGradleArg(): string {
    let javaHomeConfig = vscode.workspace.getConfiguration("java").get("home");
    if (javaHomeConfig === null || javaHomeConfig === undefined) {
        return "";
    }
    return `-Dorg.gradle.java.home="${javaHomeConfig}"`;
}
