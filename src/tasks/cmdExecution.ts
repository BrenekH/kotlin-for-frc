"use strict";
import * as vscode from "vscode";

export function executeCommand(cmd: string, name: string) {
	const execution = new vscode.ShellExecution(cmd);
	const task = new vscode.Task({type: "kffshell"}, vscode.TaskScope.Workspace, name, "Kotlin-FRC", execution);
	vscode.tasks.executeTask(task);
}
