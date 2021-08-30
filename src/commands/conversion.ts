import * as vscode from "vscode"
import { targetGradleRioVersion } from "../constants";
import { ITemplateProvider, TemplateType } from "../template/models";
import { createFileWithContent, parseTemplate } from "./util";

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

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Constants.kt"), parseTemplate(constants, "Constants", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotContainer.kt"), parseTemplate(robotContainer, "RobotContainer", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "ExampleSubsystem.kt"), parseTemplate(subsystem, "ExampleSubsystem", "frc.robot.subsystems", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(exampleCmd, "ExampleCommand", "frc.robot.commands", targetGradleRioVersion))
}

export async function writeOldCommandTemplate(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.oldCommandRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    const oi = await templateProvider.getTemplate(TemplateType.oldOI, workspaceDir.uri) as string
    nullTemplateCheck(oi)

    const robotMap = await templateProvider.getTemplate(TemplateType.oldRobotMap, workspaceDir.uri) as string
    nullTemplateCheck(robotMap)

    const oldSubsystem = await templateProvider.getTemplate(TemplateType.oldSubsystem, workspaceDir.uri) as string
    nullTemplateCheck(oldSubsystem)

    const oldExampleCmd = await templateProvider.getTemplate(TemplateType.oldCommand, workspaceDir.uri) as string
    nullTemplateCheck(oldExampleCmd)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "OI.kt"), parseTemplate(oi, "OI", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotMap.kt"), parseTemplate(robotMap, "RobotMap", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "ExampleSubsystem.kt"), parseTemplate(oldSubsystem, "ExampleSubsystem", "frc.robot.subsystems", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(oldExampleCmd, "ExampleCommand", "frc.robot.commands", targetGradleRioVersion))
}

export async function writeRobotBaseSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.robotBaseRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
}

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

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Constants.kt"), parseTemplate(constants, "Constants", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotContainer.kt"), parseTemplate(robotContainer, "RobotContainer", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "RomiDrivetrain.kt"), parseTemplate(subsystem, "RomiDrivetrain", "frc.robot.subsystems", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(exampleCmd, "ExampleCommand", "frc.robot.commands", targetGradleRioVersion))
}

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

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RomiDrivetrain.kt"), parseTemplate(romiDrivetrain, "RomiDrivetrain", "frc.robot", targetGradleRioVersion))
}

export async function writeTimed(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.timedRobot, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
}

export async function writeTimedSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot"))

    const buildGradle = await templateProvider.getTemplate(TemplateType.buildGradle, workspaceDir.uri) as string
    nullTemplateCheck(buildGradle)

    const main = await templateProvider.getTemplate(TemplateType.main, workspaceDir.uri) as string
    nullTemplateCheck(main)

    const robot = await templateProvider.getTemplate(TemplateType.timedSkeleton, workspaceDir.uri) as string
    nullTemplateCheck(robot)

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "build.gradle"), parseTemplate(buildGradle, "", "", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Main.kt"), parseTemplate(main, "Main", "frc.robot", targetGradleRioVersion))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "Robot", "frc.robot", targetGradleRioVersion))
}

function nullTemplateCheck(target: string | null) {
    if (target === null) {
        vscode.window.showErrorMessage("Kotlin-FRC: Received a null template. Cancelling...")
        throw new Error("Got null template")
    }
}
