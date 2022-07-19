import * as assert from "assert"
import * as vscode from "vscode"
import { determinePackage, simulateFRCKotlinCode } from "../../../commands/commands"

suite("Simulate FRC Kotlin Code", function () {
	test("Returns a function", function () {
		let cmdExecutor = {
			execute: (_: string, __: string, ___: vscode.WorkspaceFolder) => { }
		}

		const result = simulateFRCKotlinCode(cmdExecutor)
		assert.strictEqual(typeof result, typeof ((..._: any[]) => { }))
	})
})

suite("Determine package", function () {
	test("Basic usage", function () {
		const dir = vscode.Uri.file("/home/test/project/src/main/kotlin/frc/robot")

		assert.strictEqual(determinePackage(dir), "frc.robot")
	})

	test("Non-\"root\" folder", function () {
		const workDir = vscode.workspace.workspaceFolders
		if (workDir === undefined) {
			console.warn("No open workspaces for Determine package: Non-\"root\" folder to run")
			return
		}

		const dir = vscode.Uri.joinPath(workDir[0].uri, "src", "main", "kotlin", "frc", "robot", "subsystems")

		assert.strictEqual(determinePackage(dir), "frc.robot.subsystems")
	})
})
