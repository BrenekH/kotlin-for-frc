import * as assert from "assert"
import { simulateFRCKotlinCode } from "../../../commands/commands"

suite("Simulate FRC Kotlin Code", function () {
	test("Telemetry is sent", function () {
		let recordCommandRanCalled = false
		let mockTelemetry = {
			recordCommandRan: (commandId: string) => {
				recordCommandRanCalled = true
			}
		}

		simulateFRCKotlinCode(mockTelemetry)()

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

		simulateFRCKotlinCode(mockTelemetry)()

		assert.strictEqual(usedCommandID, targetCmdID)
	})
})
