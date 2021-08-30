import * as assert from "assert"
import * as vscode from "vscode"
import { determinePackage, simulateFRCKotlinCode } from "../../../commands/commands"

suite("Simulate FRC Kotlin Code", function () {
	test("Returns a function", function () {
		let mockTelemetry = {
			recordCommandRan: (commandId: string) => { }
		}

		let cmdExecutor = {
			execute: (cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) => { }
		}

		const result = simulateFRCKotlinCode(mockTelemetry, cmdExecutor)
		assert.strictEqual(typeof result, typeof ((...args: any[]) => { }))
	})

	test("Telemetry is sent", function () {
		let recordCommandRanCalled = false
		let mockTelemetry = {
			recordCommandRan: (commandId: string) => {
				recordCommandRanCalled = true
			}
		}

		let cmdExecutor = {
			execute: (cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) => { }
		}

		simulateFRCKotlinCode(mockTelemetry, cmdExecutor)()

		assert.strictEqual(recordCommandRanCalled, true)
	})

	test("Correct command ID for telemetry", function () {
		const targetCmdID = "simulateFRCKotlinCode"

		let usedCommandID = ""
		let mockTelemetry = {
			recordCommandRan: (commandId: string) => {
				usedCommandID = commandId
			}
		}

		let cmdExecutor = {
			execute: (cmd: string, name: string, workspaceFolder: vscode.WorkspaceFolder) => { }
		}

		simulateFRCKotlinCode(mockTelemetry, cmdExecutor)()

		assert.strictEqual(usedCommandID, targetCmdID)
	})
})

suite("Determine package", function () {
	test("Basic usage", function () {
		const dir = vscode.Uri.file("/home/test/project/src/main/kotlin/frc/robot")

		assert.strictEqual(determinePackage(dir), "frc.robot")
	})

	test("Non-\"root\" folder", function () {
		const dir = vscode.Uri.file("/home/test/project/src/main/kotlin/frc/robot/subsystems")
		vscode.workspace.updateWorkspaceFolders(0, null, { uri: vscode.Uri.file("/home/test/project") })

		assert.strictEqual(determinePackage(dir), "frc.robot.subsystems")

		vscode.workspace.updateWorkspaceFolders(1, 1)
	})
})
