import * as vscode from "vscode"
import { TARGET_GRADLE_RIO_VER } from "../constants";
import { ITemplateProvider, TemplateType } from "../template/models";
import { createFileWithContent, parseTemplate } from "./util";

/**
 * writeCommandTemplate creates the necessary directories and files for a Command-based Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeCommandTemplate(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.commandRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    const constants = await templateProvider.getTemplate(TemplateType.commandConstants, workspaceDir.uri) as string
    nullTemplateCheck(constants)

    const robotContainer = await templateProvider.getTemplate(TemplateType.robotContainer, workspaceDir.uri) as string
    nullTemplateCheck(robotContainer)

    const subsystem = await templateProvider.getTemplate(TemplateType.subsystem, workspaceDir.uri) as string
    nullTemplateCheck(subsystem)

    const exampleCmd = await templateProvider.getTemplate(TemplateType.commandExampleCommand, workspaceDir.uri) as string
    nullTemplateCheck(exampleCmd)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Constants.kt"), parseTemplate(constants, "Constants", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotContainer.kt"), parseTemplate(robotContainer, "RobotContainer", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "ExampleSubsystem.kt"), parseTemplate(subsystem, "ExampleSubsystem", "frc.robot.subsystems", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(exampleCmd, "ExampleCommand", "frc.robot.commands", TARGET_GRADLE_RIO_VER))
}

/**
 * writeRobotBaseSkeleton creates the necessary directories and files for a Robot Base Skeleton Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeRobotBaseSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.robotBaseRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
}

/**
 * writeRomiCommand creates the necessary directories and files for a Romi Command-based Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeRomiCommand(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.romiBuildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    // The Romi command template uses the exact same Robot class file as normal command-based, so just use that.
    const robot = await templateProvider.getTemplate(TemplateType.commandRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    const constants = await templateProvider.getTemplate(TemplateType.romiCommandConstants, workspaceDir.uri) as string
    nullTemplateCheck(constants)

    const robotContainer = await templateProvider.getTemplate(TemplateType.romiCommandRobotContainer, workspaceDir.uri) as string
    nullTemplateCheck(robotContainer)

    const subsystem = await templateProvider.getTemplate(TemplateType.romiCommandDrivetrainSubsystem, workspaceDir.uri) as string
    nullTemplateCheck(subsystem)

    const exampleCmd = await templateProvider.getTemplate(TemplateType.romiCommandExampleCommand, workspaceDir.uri) as string
    nullTemplateCheck(exampleCmd)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Constants.kt"), parseTemplate(constants, "Constants", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotContainer.kt"), parseTemplate(robotContainer, "RobotContainer", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "RomiDrivetrain.kt"), parseTemplate(subsystem, "RomiDrivetrain", "frc.robot.subsystems", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(exampleCmd, "ExampleCommand", "frc.robot.commands", TARGET_GRADLE_RIO_VER))
}

/**
 * writeRomiTimed creates the necessary directories and files for a Romi TimedRobot Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeRomiTimed(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.romiBuildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.romiTimedRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    const romiDrivetrain = await templateProvider.getTemplate(TemplateType.romiTimedDrivetrain, workspaceDir.uri) as string
    nullTemplateCheck(romiDrivetrain)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RomiDrivetrain.kt"), parseTemplate(romiDrivetrain, "RomiDrivetrain", "frc.robot", TARGET_GRADLE_RIO_VER))
}

/**
 * writeTimed creates the necessary directories and files for a TimedRobot Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeTimed(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.timedRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
}

/**
 * writeTimedSkeleton creates the necessary directories and files for a Skeleton TimedRobot Kotlin project.
 *
 * @param workspaceDir The workspace folder to create the new project in
 * @param templateProvider The provider to pull templates from
 */
export async function writeTimedSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.timedSkeleton, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", TARGET_GRADLE_RIO_VER))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", TARGET_GRADLE_RIO_VER))
}

/**
 * nullTemplateCheck displays an error message to the user and throws an error
 * if it is passed a null value.
 *
 * This is meant to be used as a to ensure all templates are actual strings before
 * trying to create files with them.
 *
 * @param target Value to check for null
 */
function nullTemplateCheck(target: string | null) {
    if (target === null) {
        vscode.window.showErrorMessage("Kotlin-FRC: Received a null template. Cancelling...")
        throw new Error("Got null template")
    }
}
