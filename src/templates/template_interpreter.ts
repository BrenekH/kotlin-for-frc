// Constants
import { targetGradleRioVersion } from '../constants';

// All Robot types
import { MainTemplate } from './frc-kotlin/Main';
import { BuildGradleTemplate } from './frc-kotlin/BuildGradle';

// Command based
import { CommandRobotTemplate } from './frc-kotlin/command-based/Robot';
import { OITemplate } from './frc-kotlin/command-based/OI';
import { RobotMapTemplate } from './frc-kotlin/command-based/RobotMap';
import { SubsystemTemplate } from './frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandGroupTemplate } from './frc-kotlin/command-based/commands/CommandGroupTemplate';
import { CommandTemplate } from './frc-kotlin/command-based/commands/CommandTemplate';
import { TimedCommandTemplate } from './frc-kotlin/command-based/commands/TimedCommand';
import { InstantCommandTemplate } from './frc-kotlin/command-based/commands/InstantCommandTemplate';
import { EmptyClassTemplate } from './frc-kotlin/command-based/EmptyClassTemplate';
import { PIDSubsystemTemplate } from './frc-kotlin/command-based/subsystems/PIDSubsystemTemplate';
import { TriggerTemplate } from './frc-kotlin/command-based/triggers/TriggerTemplate';

// Iterative
import { IterativeRobotTemplate } from './frc-kotlin/iterative/Robot';

// Sample
import { SampleRobotTemplate } from './frc-kotlin/sample/Robot';

// Timed
import { TimedRobotTemplate } from './frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './frc-kotlin/timed-skeleton/Robot';

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

export function getTemplateObjectFromTemplateType(targetTemplateType: templateType) {
    switch(targetTemplateType) {
        case templateType.robot:
            return new CommandRobotTemplate();
        case templateType.oi:
            return new OITemplate();
        case templateType.robot_map:
            return new RobotMapTemplate();
        case templateType.subsystem:
            return new SubsystemTemplate();
        case templateType.command:
            return new CommandTemplate();
        case templateType.command_group:
            return new CommandGroupTemplate();
        case templateType.build_gradle:
            return new BuildGradleTemplate();
        case templateType.empty_class:
            return new EmptyClassTemplate();
        case templateType.pid_subsystem:
            return new PIDSubsystemTemplate();
        case templateType.instant_command:
            return new InstantCommandTemplate();
        case templateType.timed_command:
            return new TimedCommandTemplate();
        case templateType.trigger:
            return new TriggerTemplate();
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
        case robotType.timed_skeleton:
            return new TimedRobotSkeletonTemplate();
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}