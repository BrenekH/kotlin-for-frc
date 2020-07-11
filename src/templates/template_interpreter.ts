// Constants
import { targetGradleRioVersion } from '../constants';

// All Robot types
import { MainTemplate } from './frc-kotlin/Main';
import { BuildGradleTemplate } from './frc-kotlin/BuildGradle';
import { EmptyClassTemplate } from './frc-kotlin/EmptyClassTemplate';

// Command based General
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';
import { CommandRobotContainerTemplate } from './frc-kotlin/command-based/RobotContainer';
import { CommandConstantsTemplate } from './frc-kotlin/command-based/Constants';

// Command based Commands
import { CommandTemplate } from './frc-kotlin/command-based/commands/CommandTemplate';
import { InstantCommandTemplate } from './frc-kotlin/command-based/commands/InstantCommandTemplate';
import { ParallelCommandGroupTemplate } from './frc-kotlin/command-based/commands/ParallelCommandGroupTemplate';
import { ParallelDeadlineGroupTemplate } from './frc-kotlin/command-based/commands/ParallelDeadlineGroupTemplate';
import { ParallelRaceGroupTemplate } from './frc-kotlin/command-based/commands/ParallelRaceGroupTemplate';
import { PIDCommandTemplate } from './frc-kotlin/command-based/commands/PIDCommandTemplate';
import { ProfiledPIDCommandTemplate } from './frc-kotlin/command-based/commands/ProfiledPIDCommandTemplate';
import { SequentialCommandGroupTemplate } from './frc-kotlin/command-based/commands/SequentialCommandGroupTemplate';
import { TrapezoidProfileCommandTemplate } from './frc-kotlin/command-based/commands/TrapezoidProfileCommandTemplate';

// Command based Subsystems
import { CommandSubsystemTemplate } from './frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { PIDSubsystemTemplate } from './frc-kotlin/command-based/subsystems/PIDSubsystemTemplate';
import { ProfiledPIDSubsystemTemplate } from './frc-kotlin/command-based/subsystems/ProfiledPIDSubsystemTemplate';
import { TrapezoidProfileSubsystemTemplate } from './frc-kotlin/command-based/subsystems/TrapezoidProfileSubsystemTemplate';

// Old Command Based
import { OldCommandTimedCommandTemplate } from './frc-kotlin/old-command-based/commands/TimedCommand';
import { OldCommandInstantCommandTemplate } from './frc-kotlin/old-command-based/commands/InstantCommandTemplate';
import { OldCommandPIDSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/PIDSubsystemTemplate';
import { OldCommandTriggerTemplate } from './frc-kotlin/old-command-based/triggers/TriggerTemplate';
import { OldCommandRobotMapTemplate } from './frc-kotlin/old-command-based/RobotMap';
import { OldCommandOITemplate } from './frc-kotlin/old-command-based/OI';
import { OldCommandGroupTemplate } from './frc-kotlin/old-command-based/commands/CommandGroupTemplate';
import { OldCommandSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/SubsystemTemplate';
import { OldCommandRobotTemplate } from './frc-kotlin/old-command-based/Robot';
import { OldCommandTemplate } from './frc-kotlin/old-command-based/commands/CommandTemplate';

// Timed
import { TimedRobotTemplate } from './frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './frc-kotlin/timed-skeleton/Robot';

// Robot Base Skeleton
import { RobotBaseSkeleton } from './frc-kotlin/robotbase-skeleton/Robot';

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

export function getTemplateObjectFromTemplateType(targetTemplateType: templateType) {
    switch(targetTemplateType) {
        // Old Command Based
        case templateType.oldRobot:
            return new OldCommandRobotTemplate();
        case templateType.oldOI:
            return new OldCommandOITemplate();
        case templateType.oldRobotMap:
            return new OldCommandRobotMapTemplate();
        case templateType.oldSubsystem:
            return new OldCommandSubsystemTemplate();
        case templateType.oldCommand:
            return new OldCommandTemplate();
        case templateType.oldCommandGroup:
            return new OldCommandGroupTemplate();
        case templateType.oldPIDSubsystem:
            return new OldCommandPIDSubsystemTemplate();
        case templateType.oldInstantCommand:
            return new OldCommandInstantCommandTemplate();
        case templateType.oldTimedCommand:
            return new OldCommandTimedCommandTemplate();
        case templateType.oldTrigger:
            return new OldCommandTriggerTemplate();
        
        // Command based
        // General
        case templateType.robot:
            return new CommandRobotTemplate();
        case templateType.robotContainer:
            return new CommandRobotContainerTemplate();
        case templateType.constants:
            return new CommandConstantsTemplate();
        // Commands
        case templateType.command:
            return new CommandTemplate();
        case templateType.instantCommand:
            return new InstantCommandTemplate();
        case templateType.parallelCommandGroup:
            return new ParallelCommandGroupTemplate();
        case templateType.parallelDeadlineGroup:
            return new ParallelDeadlineGroupTemplate();
        case templateType.parallelRaceGroup:
            return new ParallelRaceGroupTemplate();
        case templateType.PIDCommand:
            return new PIDCommandTemplate();
        case templateType.profiledPIDCommand:
            return new ProfiledPIDCommandTemplate();
        case templateType.sequentialCommandGroup:
            return new SequentialCommandGroupTemplate();
        case templateType.trapezoidProfileCommand:
            return new TrapezoidProfileCommandTemplate();
        // Subsystems
        case templateType.subsystem:
            return new CommandSubsystemTemplate();
        case templateType.PIDSubsystem:
            return new PIDSubsystemTemplate();
        case templateType.profiledPIDSubsystem:
            return new ProfiledPIDSubsystemTemplate();
        case templateType.trapezoidProfileSubsystem:
            return new TrapezoidProfileSubsystemTemplate();

        // Misc
        case templateType.buildGradle:
            return new BuildGradleTemplate();
        case templateType.emptyClass:
            return new EmptyClassTemplate();
    }
}

export function parseForClassName(className: string, toParse: string) {
    return toParse.replace(/#{NAME}/gi, className);
}

export function parseTemplate(className: string, packageName: string, templatetype: templateType) {
    var rawTemplateData = getTemplateObjectFromTemplateType(templatetype).getText();

    return parseForClassName(className, parseForPackageName(packageName, rawTemplateData));
}

export function parseForGradleRioVersion(gradleRioVersion: string, toParse: string) {
    return toParse.replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion);
}

export function getParsedGradle() {
    return parseForGradleRioVersion(targetGradleRioVersion, getTemplateObjectFromTemplateType(templateType.buildGradle).getText());
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
