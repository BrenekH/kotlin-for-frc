import * as vscode from "vscode"

/**
 * Sets the isKFFProject context variable which is used for determining if commands should be available or not.
 */
export async function setIsKFFProject() {
	vscode.workspace.workspaceFolders?.forEach((workspace: vscode.WorkspaceFolder) => {
		vscode.workspace.fs.stat(vscode.Uri.joinPath(workspace.uri, ".wpilib", "wpilib_preferences.json")).then(() => {
			vscode.commands.executeCommand("setContext", "isKFFProject", true)
		}).then(undefined, _ => {})
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
