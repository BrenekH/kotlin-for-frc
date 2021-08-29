import { RobotType } from "./models"

export function determineRobotType(robotJava: string, buildGradle: string): RobotType {
	// TODO: Unit test this function
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
