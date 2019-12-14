// Constants
import { targetGradleRioVersion } from '../constants';

// All Robot types
import { MainTemplate } from './frc-kotlin/Main';
import { BuildGradleTemplate } from './frc-kotlin/BuildGradle';
import { EmptyClassTemplate } from './frc-kotlin/EmptyClassTemplate';

// New Command based
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';
import { CommandSubsystemTemplate } from './frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandTemplate } from './frc-kotlin/command-based/commands/CommandTemplate';
import { CommandRobotContainerTemplate } from './frc-kotlin/command-based/RobotContainer';
import { CommandConstantsTemplate } from './frc-kotlin/command-based/Constants';

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

// Iterative
import { IterativeRobotTemplate } from './frc-kotlin/iterative/Robot';

// Sample
import { SampleRobotTemplate } from './frc-kotlin/sample/Robot';

// Timed
import { TimedRobotTemplate } from './frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './frc-kotlin/timed-skeleton/Robot';

// TODO: Differentiate between old and new command based
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
    robot = "Command Based Robot",
    constants = "Constants",
    robot_container = "Robot Container",
    command = "Command",
    subsystem = "Subsystem",

    // Misc templates
    empty_class = "Empty Class",
    build_gradle = "build.gradle",
}

// TODO: Differentiate between old and new command based
export enum robotType {
    command,
    old_command,
    sample,
    timed,
    iterative,
    timed_skeleton
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

// TODO: Differentiate between old and new command based
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
        case templateType.robot:
            return new CommandRobotTemplate();
        case templateType.robot_container:
            return new CommandRobotContainerTemplate();
        case templateType.constants:
            return new CommandConstantsTemplate();
        case templateType.subsystem:
            return new CommandSubsystemTemplate();
        case templateType.command:
            return new CommandTemplate();

        // Misc
        case templateType.build_gradle:
            return new BuildGradleTemplate();
        case templateType.empty_class:
            return new EmptyClassTemplate();
    }
}

export function getTemplateObjectFromRobotType(targetRobotType: robotType) {
    switch(targetRobotType) {
        case robotType.iterative:
            return new IterativeRobotTemplate();
        case robotType.sample:
            return new SampleRobotTemplate();
        case robotType.timed:
            return new TimedRobotTemplate();
        case robotType.command:
            return new CommandRobotTemplate();
        case robotType.old_command:
            return new OldCommandRobotTemplate();
        case robotType.timed_skeleton:
            return new TimedRobotSkeletonTemplate();
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}
