import * as assert from "assert"
import { RobotType } from "../../../commands/models"
import { determineRobotType, parseTemplate } from "../../../commands/util"

suite("Determine Robot Type", function () {
	test("Command based", function () {
		let result = determineRobotType("edu.wpi.first.wpilibj2.command.Command", "")

		assert.strictEqual(result, RobotType.command)
	})

	test("Romi command based", function () {
		let result = determineRobotType("edu.wpi.first.wpilibj2.command.Command", "// Set the websocket remote host (the Romi IP address).")

		assert.strictEqual(result, RobotType.romiCommand)
	})

	test("Timed skeleton", function () {
		let result = determineRobotType("edu.wpi.first.wpilibj.TimedRobot", "")

		assert.strictEqual(result, RobotType.timedSkeleton)
	})

	test("Timed", function () {
		let result = determineRobotType("edu.wpi.first.wpilibj.TimedRobot edu.wpi.first.wpilibj.smartdashboard.SendableChooser", "")

		assert.strictEqual(result, RobotType.timed)
	})

	test("Romi timed", function () {
		let result = determineRobotType("edu.wpi.first.wpilibj.TimedRobot new RomiDrivetrain()", "")

		assert.strictEqual(result, RobotType.romiTimed)
	})

	test("Robot base skeleton", function () {
		let result = determineRobotType("edu.wpi.first.hal.HAL", "")

		assert.strictEqual(result, RobotType.robotBaseSkeleton)
	})
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
