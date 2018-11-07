import { RobotTemplate } from './templates/frc-kotlin/command-based/Robot';
import { OITemplate } from './templates/frc-kotlin/command-based/OI';
import { RobotMapTemplate } from './templates/frc-kotlin/command-based/RobotMap';
import { SubsystemTemplate } from './templates/frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandGroupTemplate } from './templates/frc-kotlin/command-based/commands/CommandGroupTemplate';
import { CommandTemplate } from './templates/frc-kotlin/command-based/commands/CommandTemplate';

export enum templateType {
    subsystem,
    command,
    command_group,
    robot,
    oi,
    robot_map
}

export function parseTemplate(className: string, templatetype: templateType) {
    var className = className;
    var rawTemplateData: string;    
    var transformedData: string;
    rawTemplateData = getTemplateObject(templatetype).getText();
    transformedData = rawTemplateData;

    //Class name test
    var re = /#{NAME}/gi;
    transformedData = transformedData.replace(re, className);
    return transformedData;
}

export function getTemplateObject(targetTemplateType: templateType) {
    switch(targetTemplateType) {
        case templateType.robot:
            return new RobotTemplate();
        case templateType.oi:
            return new OITemplate;
        case templateType.robot_map:
            return new RobotMapTemplate;
        case templateType.subsystem:
            return new SubsystemTemplate;
        case templateType.command:
            return new CommandTemplate;
        case templateType.command_group:
            return new CommandGroupTemplate;
    }
}