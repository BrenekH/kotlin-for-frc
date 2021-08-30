import * as vscode from "vscode"
import { RobotType } from "./models"

export function determineRobotType(robotJava: string, buildGradle: string): RobotType {
	let currentRobotType: RobotType = RobotType.timed

	if (robotJava.includes("edu.wpi.first.wpilibj2.command.Command")) {
		if (buildGradle.includes("// Set the websocket remote host (the Romi IP address).")) {
			currentRobotType = RobotType.romiCommand
		}
		else {
			currentRobotType = RobotType.command
		}
	}
	else if (robotJava.includes("edu.wpi.first.wpilibj.command.Command")) {
		currentRobotType = RobotType.oldCommand
	}
	else if (robotJava.includes("edu.wpi.first.wpilibj.TimedRobot")) {
		if (robotJava.includes("new RomiDrivetrain()")) {
			currentRobotType = RobotType.romiTimed
		}
		else if (robotJava.includes("edu.wpi.first.wpilibj.smartdashboard.SendableChooser")) {
			currentRobotType = RobotType.timed
		}
		else {
			currentRobotType = RobotType.timedSkeleton
		}
	}
	else if (robotJava.includes("edu.wpi.first.hal.HAL")) {
		currentRobotType = RobotType.robotBaseSkeleton
	}

	return currentRobotType
}

export function parseTemplate(template: string, name: string, packageName: string, gradleRioVersion: string): string {
	return template.replace(/#{NAME}/gi, name).replace(/#{PACKAGE}/gi, packageName).replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion)
}

export async function createFileWithContent(file: vscode.Uri, content: string): Promise<void> {
	const data = Buffer.from(content, "utf8")
	return vscode.workspace.fs.writeFile(file, data)
}
