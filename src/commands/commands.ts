import * as vscode from "vscode"

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
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetAutoShowChangelog", async () => {
		telemetry.recordCommandRan("resetAutoShowChangelog")
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.updateGradleRIOVersion", async () => {
		telemetry.recordCommandRan("updateGradleRIOVersion")
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetGradleRIOCache", async() => {
		telemetry.recordCommandRan("resetGradleRIOCache")
		// TODO: Implement
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.simulateFRCKotlinCode", async () => {
		telemetry.recordCommandRan("simulateFRCKotlinCode")
		// TODO: Implement
	}))
}
