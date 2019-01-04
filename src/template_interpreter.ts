//All Robot types
import { MainTemplate } from './templates/frc-kotlin/Main';

// Command based
import { CommandRobotTemplate } from './templates/frc-kotlin/command-based/Robot';
import { OITemplate } from './templates/frc-kotlin/command-based/OI';
import { RobotMapTemplate } from './templates/frc-kotlin/command-based/RobotMap';
import { SubsystemTemplate } from './templates/frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandGroupTemplate } from './templates/frc-kotlin/command-based/commands/CommandGroupTemplate';
import { CommandTemplate } from './templates/frc-kotlin/command-based/commands/CommandTemplate';
import { BuildGradleTemplate } from './templates/frc-kotlin/BuildGradle';

// Iterative
import { IterativeRobotTemplate } from './templates/frc-kotlin/iterative/Robot';

// Sample
import { SampleRobotTemplate } from './templates/frc-kotlin/sample/Robot';

// Timed
import { TimedRobotTemplate } from './templates/frc-kotlin/timed/Robot';

export enum templateType {
    subsystem,
    command,
    command_group,
    robot,
    oi,
    robot_map,
    build_gradle
}

export enum robotType {
    command,
    sample,
    timed,
    iterative
}

export function parseTemplate(className: string, templatetype: templateType) {
    var className = className;
    var rawTemplateData: string;    
    var transformedData: string;
    rawTemplateData = getTemplateObjectFromTemplateType(templatetype).getText();
    transformedData = rawTemplateData;

    //Class name test
    var re = /#{NAME}/gi;
    transformedData = transformedData.replace(re, className);
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
    }
}

export function getMainTemplateObject() {
    return new MainTemplate();
}