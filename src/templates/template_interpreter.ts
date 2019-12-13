// Constants
import { targetGradleRioVersion } from '../constants';

// All Robot types
import { MainTemplate } from './frc-kotlin/Main';
import { BuildGradleTemplate } from './frc-kotlin/BuildGradle';

// New Command based
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';
// import { CommandSubsystemTemplate } from './frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandTemplate } from './frc-kotlin/command-based/commands/CommandTemplate';
// import { CommandRobotContainerTemplate } from './frc-kotlin/command-based/RobotContainer';

// Old Command Based
import { OldCommandTimedCommandTemplate } from './frc-kotlin/old-command-based/commands/TimedCommand';
import { OldCommandInstantCommandTemplate } from './frc-kotlin/old-command-based/commands/InstantCommandTemplate';
import { EmptyClassTemplate } from './frc-kotlin/EmptyClassTemplate';
import { OldCommandPIDSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/PIDSubsystemTemplate';
import { OldCommandTriggerTemplate } from './frc-kotlin/old-command-based/triggers/TriggerTemplate';
import { OldCommandRobotMapTemplate } from './frc-kotlin/old-command-based/RobotMap';
import { OldCommandOITemplate } from './frc-kotlin/old-command-based/OI';
import { OldCommandGroupTemplate } from './frc-kotlin/old-command-based/commands/CommandGroupTemplate';
import { OldCommandSubsystemTemplate } from './frc-kotlin/old-command-based/subsystems/SubsystemTemplate';

// Iterative
import { IterativeRobotTemplate } from './frc-kotlin/iterative/Robot';

// Sample
import { SampleRobotTemplate } from './frc-kotlin/sample/Robot';

// Timed
import { TimedRobotTemplate } from './frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './frc-kotlin/timed-skeleton/Robot';

// TODO: Differentiate between old and new command based
export enum templateType {
    subsystem = "Subsystem",
    command = "Command",
    command_group = "Command Group",
    empty_class = "Empty Class",
    instant_command = "Instant Command",
    timed_command = "Timed Command",
    pid_subsystem = "PID Subsystem",
    trigger = "Trigger",
    robot = "Robot",
    oi = "OI",
    robot_map = "Robot Map",
    build_gradle = "build.gradle"
}

// TODO: Differentiate between old and new command based
export enum robotType {
    command,
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
        case templateType.robot:
            return new CommandRobotTemplate();
        case templateType.oi:
            return new OldCommandOITemplate();
        case templateType.robot_map:
            return new OldCommandRobotMapTemplate();
        case templateType.subsystem:
            return new OldCommandSubsystemTemplate();
        case templateType.command:
            return new CommandTemplate();
        case templateType.command_group:
            return new OldCommandGroupTemplate();
        case templateType.build_gradle:
            return new BuildGradleTemplate();
        case templateType.empty_class:
            return new EmptyClassTemplate();
        case templateType.pid_subsystem:
            return new OldCommandPIDSubsystemTemplate();
        case templateType.instant_command:
            return new OldCommandInstantCommandTemplate();
        case templateType.timed_command:
            return new OldCommandTimedCommandTemplate();
        case templateType.trigger:
            return new OldCommandTriggerTemplate();
    }
}

// TODO: Differentiate between old and new command based
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
        case robotType.timed_skeleton:
            return new TimedRobotSkeletonTemplate();
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}
