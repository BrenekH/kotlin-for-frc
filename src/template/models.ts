export interface ITemplateProvider {
    getTemplate(t: TemplateType): Promise<string | null>
}

export enum TemplateType {
    // Old command based templates
    oldSubsystem = "Old Subsystem",
    oldCommand = "Old Command",
    oldCommandGroup = "Old Command Group",
    oldInstantCommand = "Old Instant Command",
    oldTimedCommand = "Old Timed Command",
    oldPIDSubsystem = "Old PID Subsystem",
    oldTrigger = "Old Trigger",
    oldCommandRobot = "Old Command Based Robot",
    oldOI = "Old OI",
    oldRobotMap = "Old Robot Map",

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
    // Subsystems
    subsystem = "Subsystem",
    PIDSubsystem = "PID Subsystem",
    profiledPIDSubsystem = "Profiled PID Subsystem",
    trapezoidProfileSubsystem = "Trapezoid Profile Subsystem",

    // Romi
    romiTimedDrivetrain = "Romi Timed Drivetrain",
    romiCommandRobotContainer = "Romi Command Robot Container",
    romiCommandConstants = "Romi Command Constants",
    romiCommandExampleCommand = "Romi Command Example Command",
    romiCommandDrivetrainSubsystem = "Romi Command Drivetrain Subsystem",

    // Misc templates
    emptyClass = "Empty Class",
    buildGradle = "build.gradle",
    romiBuildGradle = "Romi-specific build.gradle",
}

export function parseStringToTemplateType(input: string): TemplateType {
    switch (input) {
        // Old Command Based
        case "oldCommandRobot":
            return TemplateType.oldCommandRobot;
        case "oldOI":
            return TemplateType.oldOI;
        case "oldRobotMap":
            return TemplateType.oldRobotMap;
        case "oldSubsystem":
            return TemplateType.oldSubsystem;
        case "oldCommand":
            return TemplateType.oldCommand;
        case "oldCommandGroup":
            return TemplateType.oldCommandGroup;
        case "oldPIDSubsystem":
            return TemplateType.oldPIDSubsystem;
        case "oldInstantCommand":
            return TemplateType.oldInstantCommand;
        case "oldTimedCommand":
            return TemplateType.oldTimedCommand;
        case "oldTrigger":
            return TemplateType.oldTrigger;

        // Command based
        // General
        case "commandRobot":
            return TemplateType.commandRobot;
        case "robotContainer":
            return TemplateType.robotContainer;
        case "commandConstants":
            return TemplateType.commandConstants;
        // Commands
        case "command":
            return TemplateType.command;
        case "instantCommand":
            return TemplateType.instantCommand;
        case "parallelCommandGroup":
            return TemplateType.parallelCommandGroup;
        case "parallelDeadlineGroup":
            return TemplateType.parallelDeadlineGroup;
        case "parallelRaceGroup":
            return TemplateType.parallelRaceGroup;
        case "PIDCommand":
            return TemplateType.PIDCommand;
        case "profiledPIDCommand":
            return TemplateType.profiledPIDCommand;
        case "sequentialCommandGroup":
            return TemplateType.sequentialCommandGroup;
        case "trapezoidProfileCommand":
            return TemplateType.trapezoidProfileCommand;
        // Subsystems
        case "subsystem":
            return TemplateType.subsystem;
        case "PIDSubsystem":
            return TemplateType.PIDSubsystem;
        case "profiledPIDSubsystem":
            return TemplateType.profiledPIDSubsystem;
        case "trapezoidProfileSubsystem":
            return TemplateType.trapezoidProfileSubsystem;

        // Misc
        case "buildGradle":
            return TemplateType.buildGradle;
        case "emptyClass":
            return TemplateType.emptyClass;

        default:
            throw new Error("Invalid string passed to parseStringToTemplateType");
    }
}
