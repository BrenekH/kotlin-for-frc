import * as vscode from 'vscode';

export function ensureExtensionsRecommended(extensions: string[]) {
	console.log(extensions)
	console.log("extensions.recommendations:", vscode.workspace.getConfiguration("extensions").get("recommendations"))
	// vscode.workspace.getConfiguration().update("extensions.recommendations", ["wpilibsuite.vscode-wpilib"])
}
