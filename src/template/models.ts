import * as vscode from "vscode"

export interface ITemplateProvider {
    getTemplate(t: TemplateType, workspaceFolder: vscode.Uri): Promise<string | null>
}

export enum TemplateType {
    // Command based templates
    // General
    commandRobot = "Command Based Robot",
    commandConstants = "Constants",
    robotContainer = "Robot Container",
    // Commands
    command = "Command",
    instantCommand = "Instant Command",
    parallelCommandGroup = "Parallel Command Group",
    parallelDeadlineGroup = "Parallel Deadline Group",
    parallelRaceGroup = "Parallel Race Group",
    PIDCommand = "PID Command",
    profiledPIDCommand = "Profiled PID Command",
    sequentialCommandGroup = "Sequential Command Group",
    trapezoidProfileCommand = "Trapezoid Profile Command",
    commandExampleCommand = "Example Command",
    // Subsystems
    subsystem = "Subsystem",
    PIDSubsystem = "PID Subsystem",
    profiledPIDSubsystem = "Profiled PID Subsystem",
    trapezoidProfileSubsystem = "Trapezoid Profile Subsystem",

    // Romi
    romiTimedRobot = "Romi Timed Robot",
    romiTimedDrivetrain = "Romi Timed Drivetrain",
    romiCommandRobotContainer = "Romi Command Robot Container",
    romiCommandConstants = "Romi Command Constants",
    romiCommandExampleCommand = "Romi Command Example Command",
    romiCommandDrivetrainSubsystem = "Romi Command Drivetrain Subsystem",

    // Robot.kt files
    robotBaseRobot = "Robot Base",
    timedRobot = "Timed Robot",
    timedSkeleton = "Timed Skeleton",

    // Misc templates
    main = "Main.kt",
    emptyClass = "Empty Class",
    buildGradle = "build.gradle",
    romiBuildGradle = "Romi-specific build.gradle",
}

export function parseStringToTemplateType(input: string): TemplateType {
    switch (input) {
        // Command based
        // General
        case "commandRobot":
            return TemplateType.commandRobot
        case "robotContainer":
            return TemplateType.robotContainer
        case "commandConstants":
            return TemplateType.commandConstants
        // Commands
        case "command":
            return TemplateType.command
        case "instantCommand":
            return TemplateType.instantCommand
        case "parallelCommandGroup":
            return TemplateType.parallelCommandGroup
        case "parallelDeadlineGroup":
            return TemplateType.parallelDeadlineGroup
        case "parallelRaceGroup":
            return TemplateType.parallelRaceGroup
        case "PIDCommand":
            return TemplateType.PIDCommand
        case "profiledPIDCommand":
            return TemplateType.profiledPIDCommand
        case "sequentialCommandGroup":
            return TemplateType.sequentialCommandGroup
        case "trapezoidProfileCommand":
            return TemplateType.trapezoidProfileCommand
        // Subsystems
        case "subsystem":
            return TemplateType.subsystem
        case "PIDSubsystem":
            return TemplateType.PIDSubsystem
        case "profiledPIDSubsystem":
            return TemplateType.profiledPIDSubsystem
        case "trapezoidProfileSubsystem":
            return TemplateType.trapezoidProfileSubsystem

        // Misc
        case "buildGradle":
            return TemplateType.buildGradle
        case "emptyClass":
            return TemplateType.emptyClass

        default:
            throw new Error("Invalid string passed to parseStringToTemplateType")
    }
}
