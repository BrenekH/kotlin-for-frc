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
