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
import { ITemplate, DummyTemplate } from "./template_provider";

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

    // Misc templates
    emptyClass = "Empty Class",
    buildGradle = "build.gradle",
}

export enum robotType {
    command = "command",
    oldCommand = "old_command",
    timed = "timed",
    timedSkeleton = "timed_skeleton",
    robotBaseSkeleton = "robot_base_skeleton",
}

export function getTemplateObjectFromTemplateType(targetTemplateType: templateType): ITemplate {
    var templateObj;
    templateObj = kotlinExt.localTemplateProvider.getTemplateObject(targetTemplateType);
    if (templateObj === null) {
        templateObj = kotlinExt.globalTemplateProvider.getTemplateObject(targetTemplateType);
        if (templateObj === null) {
            templateObj = kotlinExt.integratedTemplateProvider.getTemplateObject(targetTemplateType);
        }
    }

    return (templateObj === null) ? new DummyTemplate() : templateObj;
}

export function parseForClassName(className: string, toParse: string) {
    return toParse.replace(/#{NAME}/gi, className);
}

export function parseTemplate(className: string, packageName: string, templatetype: templateType) {
    var rawTemplateData = getTemplateObjectFromTemplateType(templatetype).text;

    return parseForClassName(className, parseForPackageName(packageName, rawTemplateData));
}

export function parseForGradleRioVersion(gradleRioVersion: string, toParse: string) {
    return toParse.replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion);
}

export function getParsedGradle() {
    return parseForGradleRioVersion(kotlinExt.getValidLatestGradleRioVersion(), getTemplateObjectFromTemplateType(templateType.buildGradle).text);
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
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}
