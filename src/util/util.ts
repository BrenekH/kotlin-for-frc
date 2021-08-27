import * as vscode from "vscode"

/**
 * Sets the isKFFProject context variable which is used for determining if commands should be available or not.
 */
export async function setIsKFFProject() {
    vscode.workspace.workspaceFolders?.forEach((workspace: vscode.WorkspaceFolder) => {
        vscode.workspace.fs.stat(vscode.Uri.joinPath(workspace.uri, ".wpilib", "wpilib_preferences.json")).then(() => {
            vscode.commands.executeCommand("setContext", "isKFFProject", true)
        }).then(undefined, _ => { })
    })
}

/**
 * Checks to see if the WPILib extension is activated and alert the user if it's not.
 */
export async function alertForMissingWPILibExt() {
    const wpilibExt = vscode.extensions.getExtension("wpilibsuite.vscode-wpilib");

    if (wpilibExt === undefined) {
        vscode.window.showWarningMessage("Kotlin for FRC is meant to be a companion to the official WPILib extension, but it is not installed or you are in a restricted workspace.");
    }
}

/**
 * Return the correct Gradle wrapper for the current platform
 *
 * @returns string file path to the wrapper script
 */
export function getPlatformGradlew(): string {
    if (process.platform === "win32") {
        return ".\\gradlew.bat";
    }
    return "./gradlew";
}

/**
 * Get the currently set java home with the gradle syntax prepended.
 *
 * @returns
 */
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
