// Constants
import { targetGradleRioVersion } from './constants';

// All Robot types
import { MainTemplate } from './templates/frc-kotlin/Main';
import { BuildGradleTemplate } from './templates/frc-kotlin/BuildGradle';

// Command based
import { CommandRobotTemplate } from './templates/frc-kotlin/command-based/Robot';
import { OITemplate } from './templates/frc-kotlin/command-based/OI';
import { RobotMapTemplate } from './templates/frc-kotlin/command-based/RobotMap';
import { SubsystemTemplate } from './templates/frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandGroupTemplate } from './templates/frc-kotlin/command-based/commands/CommandGroupTemplate';
import { CommandTemplate } from './templates/frc-kotlin/command-based/commands/CommandTemplate';
import { TimedCommandTemplate } from './templates/frc-kotlin/command-based/commands/TimedCommand';
import { InstantCommandTemplate } from './templates/frc-kotlin/command-based/commands/InstantCommandTemplate';
import { EmptyClassTemplate } from './templates/frc-kotlin/command-based/EmptyClassTemplate';
import { PIDSubsystemTemplate } from './templates/frc-kotlin/command-based/subsystems/PIDSubsystemTemplate';
import { TriggerTemplate } from './templates/frc-kotlin/command-based/triggers/TriggerTemplate';

// Iterative
import { IterativeRobotTemplate } from './templates/frc-kotlin/iterative/Robot';

// Sample
import { SampleRobotTemplate } from './templates/frc-kotlin/sample/Robot';

// Timed
import { TimedRobotTemplate } from './templates/frc-kotlin/timed/Robot';
import { TimedRobotSkeletonTemplate } from './templates/frc-kotlin/timed-skeleton/Robot';

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
    var className = className;
    var rawTemplateData: string;    
    var transformedData: string;
    rawTemplateData = getTemplateObjectFromTemplateType(templatetype).getText();
    transformedData = rawTemplateData;

    //Class name test
    var re = /#{NAME}/gi;
    transformedData = transformedData.replace(re, className);

    // Package generation
    re = /#{PACKAGE}/gi;
    transformedData = transformedData.replace(re, packageName);

    // Gradle Rio Versioning
    re = /#{GRADLE_RIO_VERSION}/gi;
    transformedData = transformedData.replace(re, targetGradleRioVersion);

    return transformedData;
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