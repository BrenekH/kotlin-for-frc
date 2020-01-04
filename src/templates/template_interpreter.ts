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
    old_subsystem = "Old Subsystem",
    old_command = "Old Command",
    old_command_group = "Old Command Group",
    old_instant_command = "Old Instant Command",
    old_timed_command = "Old Timed Command",
    old_pid_subsystem = "Old PID Subsystem",
    old_trigger = "Old Trigger",
    old_robot = "Old Command Based Robot",
    old_oi = "Old OI",
    old_robot_map = "Old Robot Map",
    
    // Command based templates
    // General
    robot = "Command Based Robot",
    constants = "Constants",
    robot_container = "Robot Container",
    // Commands
    command = "Command",
    instant_command = "Instant Command",
    parallel_command_group = "Parallel Command Group",
    parallel_deadline_group = "Parallel Deadline Group",
    parallel_race_group = "Parallel Race Group",
    pid_command = "PID Command",
    profiled_pid_command = "Profiled PID Command",
    sequential_command_group = "Sequential Command Group",
    trapezoid_profile_command = "Trapezoid Profile Command",
    // Subsystems
    subsystem = "Subsystem",
    pid_subsystem = "PID Subsystem",
    profiled_pid_subsystem = "Profiled PID Subsystem",
    trapezoid_profile_subsystem = "Trapezoid Profile Subsystem",

    // Misc templates
    empty_class = "Empty Class",
    build_gradle = "build.gradle",
}

export enum robotType {
    command = "command",
    old_command = "old_command",
    timed = "timed",
    timed_skeleton = "timed_skeleton",
    robot_base_skeleton = "robot_base_skeleton",
}

export function parseTemplate(className: string, packageName: string, templatetype: templateType) {
    var rawTemplateData = getTemplateObjectFromTemplateType(templatetype).getText();

    return parseForClassName(className, parseForPackageName(packageName, rawTemplateData));
}

export function getParsedGradle() {
    return parseForGradleRioVersion(targetGradleRioVersion, getTemplateObjectFromTemplateType(templateType.build_gradle).getText());
}

export function parseForClassName(className: string, toParse: string) {
    return toParse.replace(/#{NAME}/gi, className);
}

export function parseForPackageName(packageName: string, toParse: string) {
    return toParse.replace(/#{PACKAGE}/gi, packageName);
}

export function parseForGradleRioVersion(gradleRioVersion: string, toParse: string) {
    return toParse.replace(/#{GRADLE_RIO_VERSION}/gi, gradleRioVersion);
}

export function getTemplateObjectFromTemplateType(targetTemplateType: templateType) {
    switch(targetTemplateType) {
        // Old Command Based
        case templateType.old_robot:
            return new OldCommandRobotTemplate();
        case templateType.old_oi:
            return new OldCommandOITemplate();
        case templateType.old_robot_map:
            return new OldCommandRobotMapTemplate();
        case templateType.old_subsystem:
            return new OldCommandSubsystemTemplate();
        case templateType.old_command:
            return new OldCommandTemplate();
        case templateType.old_command_group:
            return new OldCommandGroupTemplate();
        case templateType.old_pid_subsystem:
            return new OldCommandPIDSubsystemTemplate();
        case templateType.old_instant_command:
            return new OldCommandInstantCommandTemplate();
        case templateType.old_timed_command:
            return new OldCommandTimedCommandTemplate();
        case templateType.old_trigger:
            return new OldCommandTriggerTemplate();
        
        // Command based
        // General
        case templateType.robot:
            return new CommandRobotTemplate();
        case templateType.robot_container:
            return new CommandRobotContainerTemplate();
        case templateType.constants:
            return new CommandConstantsTemplate();
        // Commands
        case templateType.command:
            return new CommandTemplate();
        case templateType.instant_command:
            return new InstantCommandTemplate();
        case templateType.parallel_command_group:
            return new ParallelCommandGroupTemplate();
        case templateType.parallel_deadline_group:
            return new ParallelDeadlineGroupTemplate();
        case templateType.parallel_race_group:
            return new ParallelRaceGroupTemplate();
        case templateType.pid_command:
            return new PIDCommandTemplate();
        case templateType.profiled_pid_command:
            return new ProfiledPIDCommandTemplate();
        case templateType.sequential_command_group:
            return new SequentialCommandGroupTemplate();
        case templateType.trapezoid_profile_command:
            return new TrapezoidProfileCommandTemplate();
        // Subsystems
        case templateType.subsystem:
            return new CommandSubsystemTemplate();
        case templateType.pid_subsystem:
            return new PIDSubsystemTemplate();
        case templateType.profiled_pid_subsystem:
            return new ProfiledPIDSubsystemTemplate();
        case templateType.trapezoid_profile_subsystem:
            return new TrapezoidProfileSubsystemTemplate();

        // Misc
        case templateType.build_gradle:
            return new BuildGradleTemplate();
        case templateType.empty_class:
            return new EmptyClassTemplate();
    }
}

export function getTemplateObjectFromRobotType(targetRobotType: robotType) {
    switch(targetRobotType) {
        case robotType.timed:
            return new TimedRobotTemplate();
        case robotType.command:
            return new CommandRobotTemplate();
        case robotType.old_command:
            return new OldCommandRobotTemplate();
        case robotType.timed_skeleton:
            return new TimedRobotSkeletonTemplate();
        case robotType.robot_base_skeleton:
            return new RobotBaseSkeleton();
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}
