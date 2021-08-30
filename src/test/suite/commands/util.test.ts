import * as assert from "assert"
import { parseTemplate } from "../../../commands/util"

suite("Determine Robot Type", function () {
})

suite("Parse Template", function () {
	test("Class Name", function () {
		let result = parseTemplate("#{NAME}", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "TestName")

		result = parseTemplate("class #{NAME} {}", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "class TestName {}")
	})

	test("Package name", function () {
		let result = parseTemplate("#{PACKAGE}", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "frc.robot")

		result = parseTemplate("package #{PACKAGE};", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "package frc.robot;")
	})

	test("GradleRIO version", function () {
		let result = parseTemplate("#{GRADLE_RIO_VERSION}", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "9999.9.9")

		result = parseTemplate("edu.wpilib.GradleRio #{GRADLE_RIO_VERSION};", "TestName", "frc.robot", "9999.9.9")
		assert.strictEqual(result, "edu.wpilib.GradleRio 9999.9.9;")
	})
})
