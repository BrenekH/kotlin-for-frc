import * as kotlinExt from "../extension";

// All Robot types
import { MainTemplate } from './frc-kotlin/Main';

// Command based General
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';

// Old Command Based
import { OldCommandRobotTemplate } from './frc-kotlin/old-command-based/Robot';

// Timed
import { TimedRobotTemplate } from './frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './frc-kotlin/timed-skeleton/Robot';

// Robot Base Skeleton
import { RobotBaseSkeleton } from './frc-kotlin/robotbase-skeleton/Robot';
import { ITemplate, DummyTemplate } from "./templateProvider";
import { RomiTimedRobotTemplate } from "./frc-kotlin/romi-timed/robot";

export enum templateType {
    // Old command based templates
    oldSubsystem = "Old Subsystem",
    oldCommand = "Old Command",
    oldCommandGroup = "Old Command Group",
    oldInstantCommand = "Old Instant Command",
    oldTimedCommand = "Old Timed Command",
    oldPIDSubsystem = "Old PID Subsystem",
    oldTrigger = "Old Trigger",
    oldRobot = "Old Command Based Robot",
    oldOI = "Old OI",
    oldRobotMap = "Old Robot Map",

    // Command based templates
    // General
    robot = "Command Based Robot",
    constants = "Constants",
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

export enum robotType {
    command = "command",
    oldCommand = "old_command",
    timed = "timed",
    timedSkeleton = "timed_skeleton",
    robotBaseSkeleton = "robot_base_skeleton",
    romiCommand = "romi_command",
    romiTimed = "romi_timed",
}

export async function getTemplateObjectFromTemplateType(targetTemplateType: templateType): Promise<ITemplate> {
    var templateObj;
    try {
        templateObj = await kotlinExt.localTemplateProvider.getTemplateObject(targetTemplateType);
    } catch (e) {
        console.error("Caught error: " + e);
        templateObj = null;
    }
    if (templateObj === null) {
        try {
            templateObj = await kotlinExt.globalTemplateProvider.getTemplateObject(targetTemplateType);
        } catch (e) {
            console.error("Caught error: " + e);
            templateObj = null;
        }
        if (templateObj === null) {
            templateObj = await kotlinExt.integratedTemplateProvider.getTemplateObject(targetTemplateType);
        }
    }

    return (templateObj === null) ? new DummyTemplate() : templateObj;
}

export function parseForClassName(className: string, toParse: string) {
    return toParse.replace(/#{NAME}/gi, className);
}

export async function parseTemplate(className: string, packageName: string, templatetype: templateType) {
    var rawTemplateData = (await getTemplateObjectFromTemplateType(templatetype)).text;

    return parseForClassName(className, parseForPackageName(packageName, rawTemplateData));
}

export function parseForGradleRioVersion(gradleRioVersion: string, toParse: string) {
    return toParse.replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion);
}

export async function getParsedGradle(useRomiBuildGradle: boolean) {
    let buildGradleTemplateType: templateType;
    if (useRomiBuildGradle) {
        buildGradleTemplateType = templateType.romiBuildGradle;
    } else {
        buildGradleTemplateType = templateType.buildGradle;
    }
    return parseForGradleRioVersion(kotlinExt.getValidLatestGradleRioVersion(), (await getTemplateObjectFromTemplateType(buildGradleTemplateType)).text);
}

export function parseForPackageName(packageName: string, toParse: string) {
    return toParse.replace(/#{PACKAGE}/gi, packageName);
}

export function getTemplateObjectFromRobotType(targetRobotType: robotType) {
    switch(targetRobotType) {
        case robotType.timed:
            return new TimedRobotTemplate();
        case robotType.command:
            return new CommandRobotTemplate();
        case robotType.oldCommand:
            return new OldCommandRobotTemplate();
        case robotType.timedSkeleton:
            return new TimedRobotSkeletonTemplate();
        case robotType.robotBaseSkeleton:
            return new RobotBaseSkeleton();
        case robotType.romiCommand:
            return new CommandRobotTemplate();
        case robotType.romiTimed:
            return new RomiTimedRobotTemplate();
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}

export function parseStringToTemplateType(input: string): templateType {
    switch(input) {
        // Old Command Based
        case "oldRobot":
            return templateType.oldRobot;
        case "oldOI":
            return templateType.oldOI;
        case "oldRobotMap":
            return templateType.oldRobotMap;
        case "oldSubsystem":
            return templateType.oldSubsystem;
        case "oldCommand":
            return templateType.oldCommand;
        case "oldCommandGroup":
            return templateType.oldCommandGroup;
        case "oldPIDSubsystem":
            return templateType.oldPIDSubsystem;
        case "oldInstantCommand":
            return templateType.oldInstantCommand;
        case "oldTimedCommand":
            return templateType.oldTimedCommand;
        case "oldTrigger":
            return templateType.oldTrigger;

        // Command based
        // General
        case "robot":
            return templateType.robot;
        case "robotContainer":
            return templateType.robotContainer;
        case "constants":
            return templateType.constants;
        // Commands
        case "command":
            return templateType.command;
        case "instantCommand":
            return templateType.instantCommand;
        case "parallelCommandGroup":
            return templateType.parallelCommandGroup;
        case "parallelDeadlineGroup":
            return templateType.parallelDeadlineGroup;
        case "parallelRaceGroup":
            return templateType.parallelRaceGroup;
        case "PIDCommand":
            return templateType.PIDCommand;
        case "profiledPIDCommand":
            return templateType.profiledPIDCommand;
        case "sequentialCommandGroup":
            return templateType.sequentialCommandGroup;
        case "trapezoidProfileCommand":
            return templateType.trapezoidProfileCommand;
        // Subsystems
        case "subsystem":
            return templateType.subsystem;
        case "PIDSubsystem":
            return templateType.PIDSubsystem;
        case "profiledPIDSubsystem":
            return templateType.profiledPIDSubsystem;
        case "trapezoidProfileSubsystem":
            return templateType.trapezoidProfileSubsystem;

        // Misc
        case "buildGradle":
            return templateType.buildGradle;
        case "emptyClass":
            return templateType.emptyClass;

        default:
            throw new Error("Invalid string passed to template_interpreter.parseStringToTemplateType");
    }
}
