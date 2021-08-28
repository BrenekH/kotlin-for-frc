import * as vscode from "vscode"
import { simulateCodeTerminalName } from "../constants"
import { executeCommand } from "../tasks/cmdExecution"
import { showChangelog } from "../util/changelog"
import updateGradleRioVersion from "../util/gradleRioUpdate"
import { getJavaHomeGradleArg, getPlatformGradlew } from "../util/util"

interface ITelemetry {
	recordCommandRan(commandId: string): void
}

export async function registerCommands(context: vscode.ExtensionContext, telemetry: ITelemetry) {
	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.convertJavaProject", async () => {
		telemetry.recordCommandRan("convertJavaProject")
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.createNew", async () => {
		telemetry.recordCommandRan("createNew")
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.showChangelog", async () => {
		telemetry.recordCommandRan("showChangelog")
		showChangelog()
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetAutoShowChangelog", async () => {
		telemetry.recordCommandRan("resetAutoShowChangelog")
		context.globalState.update("lastInitVersion", "0.0.0")
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.updateGradleRIOVersion", async () => {
		telemetry.recordCommandRan("updateGradleRIOVersion")
		updateGradleRioVersion(true, context)
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetGradleRIOCache", async () => {
		telemetry.recordCommandRan("resetGradleRIOCache")
		context.globalState.update("grvCache", "")
		context.globalState.update("lastGradleRioVersionUpdateTime", 0)
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.simulateFRCKotlinCode", simulateFRCKotlinCode(telemetry)))
}

/**
 * simulateFRCKotlinCode builds and returns a function that can be used as a callback for vscode.commands.registerCommand.
 * This should not be used outside of its original file. It is only exported for testing purposes.
 *
 * @param telemetry Object that satisfies the ITelemetry interface
 * @returns Function that is callable by vscode as a command
 */
export function simulateFRCKotlinCode(telemetry: ITelemetry): (...args: any[]) => any {
	return async () => {
		telemetry.recordCommandRan("simulateFRCKotlinCode")

		if (!vscode.workspace.isTrusted) {
			vscode.window.showErrorMessage("Cannot simulate code while the workspace is untrusted.")
			return
		}

		if (vscode.workspace.workspaceFolders === undefined) {
			vscode.window.showErrorMessage("Cannot simulate code without an open workspace.")
			return
		}

		let workspaceDir = vscode.workspace.workspaceFolders[0]
		if (vscode.workspace.workspaceFolders.length > 1) {
			const temp = await vscode.window.showWorkspaceFolderPick()
			if (temp === undefined) {
				return
			}
			workspaceDir = temp
		}

		executeCommand(`${getPlatformGradlew()} simulateJava ${getJavaHomeGradleArg()}`, "Simulate FRC Code", workspaceDir)
	}
}
