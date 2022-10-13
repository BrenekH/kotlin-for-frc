import * as vscode from "vscode"
import { SIMULATE_CODE_TASK_NAME, TARGET_GRADLE_RIO_VER } from "../constants"
import { executeCommand } from "../tasks/cmdExecution"
import { ITemplateProvider } from "../template/models"
import { showChangelog } from "../util/changelog"
import updateGradleRioVersion from "../util/gradleRioUpdate"
import { getJavaHomeGradleArg, getPlatformGradlew } from "../util/util"
import { writeCommandTemplate, writeRobotBaseSkeleton, writeRomiCommand, writeRomiTimed, writeTimed, writeTimedSkeleton } from "./conversion"
import { RobotType } from "./models"
import { createFileWithContent, determineRobotType, parseTemplate } from "./util"
import { TemplateType } from "../template/models"
import { ensureExtensionsRecommended } from "../util/recommendations"

/**
 * ICommandExecutor defines the behavior the simulateFRCKotlinCode function requires
 * from an object which aims to run the simulation command.
 */
interface ICommandExecutor {
	/**
	 * execute executes a given command.
	 *
	 * @param cmd The command to run
	 * @param name The name of tab to use
	 * @param workspaceFolder The workspace folder to execute the command in
	 */
	execute(cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder): void
}

/**
 * registerCommands simply registers all of the required command handlers with the VSCode
 * Extension Host.
 *
 * @param context VSCode extension context, used to add command handlers
 * @param templateProvider The ITemplateProvider to use for any commands which deal with templates
 */
export async function registerCommands(context: vscode.ExtensionContext, templateProvider: ITemplateProvider) {
	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.convertJavaProject", async () => {
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

		ensureExtensionsRecommended(workspaceDir, ["Brenek.kotlin-for-frc", "wpilibsuite.vscode-wpilib"])

		vscode.window.showInformationMessage("Kotlin-FRC: Conversion complete!")
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.createNew", async (filePath: vscode.Uri) => {
		vscode.window.showQuickPick(["Command-Based", "Empty Class"]).then((result: string | undefined) => {
			switch (result) {
				case "Command-Based":
					vscode.window.showQuickPick(["Command", "Subsystem"]).then((result: string | undefined) => {
						switch (result) {
							case "Command":
								vscode.window.showQuickPick([
									TemplateType.command,
									TemplateType.instantCommand,
									TemplateType.parallelCommandGroup,
									TemplateType.parallelDeadlineGroup,
									TemplateType.parallelRaceGroup,
									TemplateType.PIDCommand,
									TemplateType.profiledPIDCommand,
									TemplateType.sequentialCommandGroup,
									TemplateType.trapezoidProfileCommand,
								]).then((result: string | undefined) => {
									if (result === undefined) { return }

									createNewFromTemplate(result as TemplateType, templateProvider, filePath)
								})
								break
							case "Subsystem":
								vscode.window.showQuickPick([
									TemplateType.subsystem,
									TemplateType.PIDSubsystem,
									TemplateType.profiledPIDSubsystem,
									TemplateType.trapezoidProfileSubsystem,
								]).then((result: string | undefined) => {
									if (result === undefined) { return }

									createNewFromTemplate(result as TemplateType, templateProvider, filePath)
								})
								break
							default:
								return
						}
					})
					break
				case "Empty Class":
					createNewFromTemplate(TemplateType.emptyClass, templateProvider, filePath)
					break
				default:
					return
			}
		})
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.showChangelog", async () => {
		showChangelog()
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetAutoShowChangelog", async () => {
		context.globalState.update("lastInitVersion", "0.0.0")
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.updateGradleRIOVersion", async () => {
		updateGradleRioVersion(true, context)
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.resetGradleRIOCache", async () => {
		context.globalState.update("grvCache", "")
		context.globalState.update("lastGradleRioVersionUpdateTime", 0)
	}))

	context.subscriptions.push(vscode.commands.registerCommand("kotlinForFRC.simulateFRCKotlinCode", simulateFRCKotlinCode({
		execute: (cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) => {
			executeCommand(cmd, name, workspaceFolder)
		}
	})))
}

/**
 * simulateFRCKotlinCode builds and returns a function that can be used as a callback for vscode.commands.registerCommand.
 * This should not be used outside of its original file. It is only exported for testing purposes.
 *
 * @returns Function that is callable by vscode as a command
 */
export function simulateFRCKotlinCode(cmdExecutor: ICommandExecutor): (...args: any[]) => any {
	return async () => {
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

		cmdExecutor.execute(`${getPlatformGradlew()} simulateJava ${getJavaHomeGradleArg()}`, SIMULATE_CODE_TASK_NAME, workspaceDir)
	}
}

/**
 * createNewFromTemplate creates a new file with the provided information, while also prompting
 * the user for a name.
 *
 * @param templateType The template to parse
 * @param templateProvider The provider to pull the template from
 * @param dirPath The directory to put the new file in
 */
async function createNewFromTemplate(templateType: TemplateType, templateProvider: ITemplateProvider, dirPath: vscode.Uri): Promise<void> {
	const workspaceDir = vscode.workspace.getWorkspaceFolder(dirPath)
	if (workspaceDir === undefined) { return }

	const templateContents = await templateProvider.getTemplate(templateType, workspaceDir.uri)
	if (templateContents === null) { return }

	const className = await vscode.window.showInputBox({ placeHolder: `Name your ${templateType.toString()}` })
	if (className === undefined) { return }

	createFileWithContent(vscode.Uri.joinPath(dirPath, `${className}.kt`), parseTemplate(templateContents, className, determinePackage(dirPath), TARGET_GRADLE_RIO_VER))
}

/**
 *
 * @param filePath The path to form into a package directory
 * @returns
 */
export function determinePackage(filePath: vscode.Uri): string {
	const workspaceDir = vscode.workspace.getWorkspaceFolder(filePath)
	if (workspaceDir === undefined) { return "frc.robot" }

	const mainFolderUri = vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin")

	// mainFolderUri.path + "/" is required because just the path leaves behind a leading /
	return filePath.path.replace(mainFolderUri.path + "/", "").replace(/\//g, ".")
}
