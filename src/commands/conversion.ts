import * as vscode from "vscode"
import { ITemplateProvider, TemplateType } from "../template/models";

export async function writeCommandTemplate(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))

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

    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Robot.kt"), parseTemplate(robot, "", "", ""))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "Constants.kt"), parseTemplate(constants, "", "", ""))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "RobotContainer.kt"), parseTemplate(robotContainer, "", "", ""))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems", "ExampleSubsystem.kt"), parseTemplate(subsystem, "ExampleSubsystem", "frc.robot.subsystems", ""))
    createFileWithContent(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands", "ExampleCommand.kt"), parseTemplate(exampleCmd, "ExampleCommand", "frc.robot.commands", ""))
}

export async function writeOldCommandTemplate(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))
}

export async function writeRobotBaseSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {

}

export async function writeRomiCommand(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "commands"))
    await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceDir.uri, "src", "main", "kotlin", "frc", "robot", "subsystems"))
}

export async function writeRomiTimed(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {

}

export async function writeTimed(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {

}

export async function writeTimedSkeleton(workspaceDir: vscode.WorkspaceFolder, templateProvider: ITemplateProvider) {

}

async function createFileWithContent(file: vscode.Uri, content: string): Promise<void> {
    const data = Buffer.from(content, "utf8")
    return vscode.workspace.fs.writeFile(file, data)
}

function nullTemplateCheck(target: string | null) {
    if (target === null) {
        vscode.window.showErrorMessage("Kotlin-FRC: Received a null template. Cancelling...")
        throw new Error("Got null template")
    }
}

function parseTemplate(template: string, name: string, packageName: string, gradleRioVersion: string): string {
    // TODO: Test
    return template.replace(/#{NAME}/gi, name).replace(/#PACKAGE/gi, packageName).replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion)
}
