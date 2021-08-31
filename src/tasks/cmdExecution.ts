"use strict";
import * as vscode from "vscode";

export function executeCommand(cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) {
	const execution = new vscode.ShellExecution(cmd);
	const task = new vscode.Task({ type: "kffshell" }, workspaceFolder, name, "Kotlin-FRC", execution);
	vscode.tasks.executeTask(task);
}
