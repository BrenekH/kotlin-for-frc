"use strict";
import * as vscode from "vscode";

import { getPlatformGradlew, getJavaHomeGradleArg } from "../util/gradle";

export function getTaskProvider(): vscode.TaskProvider {
	return {
		provideTasks(token): Array<vscode.Task> {
			return [
				simulationTask(),
			];
		},
		resolveTask(task: vscode.Task, token: vscode.CancellationToken): vscode.Task {
			return task;
		}
	};
}

function simulationTask(): vscode.Task {
	const execution = new vscode.ShellExecution(`${getPlatformGradlew()} simulateJava ${getJavaHomeGradleArg()}`);
	return new vscode.Task({type: "simulateFRCKotlinCode"}, vscode.TaskScope.Workspace, "Simulate FRC Kotlin", "Kotlin-FRC", execution);
}
