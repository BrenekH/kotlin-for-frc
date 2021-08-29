import * as vscode from "vscode"
import { simulateCodeTaskName } from "../constants"
import { executeCommand } from "../tasks/cmdExecution"
import { ITemplateProvider } from "../template/models"
import { showChangelog } from "../util/changelog"
import updateGradleRioVersion from "../util/gradleRioUpdate"
import { getJavaHomeGradleArg, getPlatformGradlew } from "../util/util"
import { writeCommandTemplate, writeOldCommandTemplate, writeRobotBaseSkeleton, writeRomiCommand, writeRomiTimed, writeTimed, writeTimedSkeleton } from "./conversion"
import { RobotType } from "./models"
import { determineRobotType } from "./util"

interface ITelemetry {
	recordCommandRan(commandId: string): void
}

export async function registerCommands(context: vscode.ExtensionContext, telemetry: ITelemetry, templateProvider: ITemplateProvider) {
	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.convertJavaProject", async () => {
		telemetry.recordCommandRan("convertJavaProject")

		if (vscode.workspace.workspaceFolders === undefined) {
			vscode.window.showErrorMessage("Kotlin-FRC: Cannot convert project without an open workspace.")
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

		const robotJavaUri = vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "java", "frc", "robot", "Robot.java")
		let robotJava: string
		try {
			const robotJavaData = await vscode.workspace.fs.readFile(robotJavaUri)
			robotJava = Buffer.from(robotJavaData).toString("utf8")
		} catch (e) {
			console.error(e)
			vscode.window.showErrorMessage(`Kotlin-FRC: Could not read ${robotJavaUri.toString()}. Cancelling project conversion.`)
			return
		}

		const buildGradleUri = vscode.Uri.joinPath(workspaceDir.uri, "build.gradle")
		let buildGradle: string
		try {
			const buildGradleData = await vscode.workspace.fs.readFile(buildGradleUri)
			buildGradle = Buffer.from(buildGradleData).toString("utf8")
		} catch (e) {
			console.error(e)
			vscode.window.showErrorMessage(`Kotlin-FRC: Could not read ${buildGradleUri.toString()}. Cancelling project conversion.`)
			return
		}

		const projectRobotType = determineRobotType(robotJava, buildGradle)

		// Delete existing files
		const toDelete = vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "java")
		await vscode.workspace.fs.delete(toDelete, { recursive: true })

		// Add new files with parsed template contents
		switch (projectRobotType) {
			case RobotType.command:
				writeCommandTemplate(workspaceDir, templateProvider)
				break
			case RobotType.oldCommand:
				writeOldCommandTemplate(workspaceDir, templateProvider)
				break
			case RobotType.robotBaseSkeleton:
				writeRobotBaseSkeleton(workspaceDir, templateProvider)
				break
			case RobotType.romiCommand:
				writeRomiCommand(workspaceDir, templateProvider)
				break
			case RobotType.romiTimed:
				writeRomiTimed(workspaceDir, templateProvider)
				break
			case RobotType.timed:
				writeTimed(workspaceDir, templateProvider)
				break
			case RobotType.timedSkeleton:
				writeTimedSkeleton(workspaceDir, templateProvider)
				break

			default:
				vscode.window.showErrorMessage("Kotlin-FRC: Unknown RobotType for conversion. Cancelling...")
				return
		}

		vscode.window.showInformationMessage("Kotlin-FRC: Conversion complete!")
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.createNew", async () => {
		telemetry.recordCommandRan("createNew")
		// TODO: Get user choice of template from quick pick
		// TODO: Get user name for class/file
		// TODO: Create new file with parsed template contents
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
			vscode.window.showErrorMessage("Kotlin-FRC: Cannot simulate code while the workspace is untrusted.")
			return
		}

		if (vscode.workspace.workspaceFolders === undefined) {
			vscode.window.showErrorMessage("Kotlin-FRC: Cannot simulate code without an open workspace.")
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

		// TODO: Change this to an object that gets passed into the function builder. This is not very testable.
		executeCommand(`${getPlatformGradlew()} simulateJava ${getJavaHomeGradleArg()}`, simulateCodeTaskName, workspaceDir)
	}
}
