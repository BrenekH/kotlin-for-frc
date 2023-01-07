"use strict";
import * as vscode from "vscode";

/**
 * executeCommand takes command information and runs the command in a VSCode Task.
 *
 * @param cmd Command to run
 * @param name Name of the command
 * @param workspaceFolder Workspace folder to run the command in
 */
export function executeCommand(cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) {
	const execution = new vscode.ShellExecution(cmd);
	const task = new vscode.Task({ type: "kffshell" }, workspaceFolder, name, "Kotlin-FRC", execution);
	vscode.tasks.executeTask(task);
}
