import * as vscode from "vscode"
import { RobotType } from "./models"
import {
	CMD_ROBOT_SEARCH_TERM, TIMED_ROBOT_USED_SEARCH_TERM, TIMED_ROBOT_SEARCH_TERM,
	ROBOT_BASE_SKELE_SEARCH_TERM, ROMI_CMD_VARIANT_SEARCH_TERM, ROMI_TIMED_VARIANT_SEARCH_TERM
} from "../constants"

/**
 * determineRobotType figures out the RobotType of the project by parsing through the contents of Robot.java and build.gradle.
 *
 * @param robotJava Contents of Robot.java
 * @param buildGradle Contents of build.gradle
 * @returns The determined RobotType of the project
 */
export function determineRobotType(robotJava: string, buildGradle: string): RobotType {
	let currentRobotType: RobotType = RobotType.timed

	if (robotJava.includes(CMD_ROBOT_SEARCH_TERM)) {
		if (buildGradle.includes(ROMI_CMD_VARIANT_SEARCH_TERM)) {
			currentRobotType = RobotType.romiCommand
		}
		else {
			currentRobotType = RobotType.command
		}
	} else if (robotJava.includes(TIMED_ROBOT_USED_SEARCH_TERM)) {
		if (robotJava.includes(ROMI_TIMED_VARIANT_SEARCH_TERM)) {
			currentRobotType = RobotType.romiTimed
		}
		else if (robotJava.includes(TIMED_ROBOT_SEARCH_TERM)) {
			currentRobotType = RobotType.timed
		}
		else {
			currentRobotType = RobotType.timedSkeleton
		}
	} else if (robotJava.includes(ROBOT_BASE_SKELE_SEARCH_TERM)) {
		currentRobotType = RobotType.robotBaseSkeleton
	}

	return currentRobotType
}

/**
 * parseTemplate replaces #{NAME}, #{PACKAGE}, and #{GRADLE_RIO_VERSION} with the provided values.
 *
 * @param template String to use as source
 * @param name The class name or file name to use
 * @param packageName Package of new file ('frc.robot')
 * @param gradleRioVersion Latest GradleRIO version
 * @returns Parsed string
 */
export function parseTemplate(template: string, name: string, packageName: string, gradleRioVersion: string): string {
	return template.replace(/#{NAME}/gi, name).replace(/#{PACKAGE}/gi, packageName).replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion)
}

/**
 * createFileWithContent writes to a file with the provided content.
 *
 * @param file File location
 * @param content Content to save to file
 */
export async function createFileWithContent(file: vscode.Uri, content: string): Promise<void> {
	const data = Buffer.from(content, "utf8")
	return vscode.workspace.fs.writeFile(file, data)
}
