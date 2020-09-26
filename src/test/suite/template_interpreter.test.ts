import * as assert from 'assert';
// import * as vscode from 'vscode';
// import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
// import * as preferences from '../preferences';
import * as templateInterpreter from '../../templates/template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';
import * as testingConsts from "./testingConstants";
import { MainTemplate } from '../../templates/frc-kotlin/Main';
import { BuildGradleTemplate } from '../../templates/frc-kotlin/BuildGradle';
import { OldCommandSubsystemTemplate } from '../../templates/frc-kotlin/old-command-based/subsystems/SubsystemTemplate';
import { OldCommandTemplate } from '../../templates/frc-kotlin/old-command-based/commands/CommandTemplate';
import { OldCommandGroupTemplate } from '../../templates/frc-kotlin/old-command-based/commands/CommandGroupTemplate';
import { EmptyClassTemplate } from '../../templates/frc-kotlin/EmptyClassTemplate';
import { OldCommandInstantCommandTemplate } from '../../templates/frc-kotlin/old-command-based/commands/InstantCommandTemplate';
import { OldCommandTimedCommandTemplate } from '../../templates/frc-kotlin/old-command-based/commands/TimedCommand';
import { OldCommandPIDSubsystemTemplate } from '../../templates/frc-kotlin/old-command-based/subsystems/PIDSubsystemTemplate';
import { OldCommandTriggerTemplate } from '../../templates/frc-kotlin/old-command-based/triggers/TriggerTemplate';
import { OldCommandRobotTemplate } from '../../templates/frc-kotlin/old-command-based/Robot';
import { OldCommandOITemplate } from '../../templates/frc-kotlin/old-command-based/OI';
import { OldCommandRobotMapTemplate } from '../../templates/frc-kotlin/old-command-based/RobotMap';

// TODO: Differentiate between old and new command based
suite("Grabbing Templates", function () {
    test("Main.kt", function() {
        testingConsts.resetTestingWorkspace();
        var mainTemplate = new MainTemplate;
        assert.equal(templateInterpreter.getMainTemplateObject().getText(), mainTemplate.getText());
    });

    test("build.gradle", function() {
        testingConsts.resetTestingWorkspace();
        var buildGradleTemplate = new BuildGradleTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.buildGradle).getText(), buildGradleTemplate.getText());
    });

    test("Subsystem", function() {
        testingConsts.resetTestingWorkspace();
        var subsystemTemplate = new OldCommandSubsystemTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldSubsystem).getText(), subsystemTemplate.getText());
    });

    test("Command", function() {
        testingConsts.resetTestingWorkspace();
        var commandTemplate = new OldCommandTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldCommand).getText(), commandTemplate.getText());
    });

    test("Command Group", function() {
        testingConsts.resetTestingWorkspace();
        var commandGroupTemplate = new OldCommandGroupTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldCommandGroup).getText(), commandGroupTemplate.getText());
    });

    test("Empty Class", function() {
        testingConsts.resetTestingWorkspace();
        var emptyClassTemplate = new EmptyClassTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.emptyClass).getText(), emptyClassTemplate.getText());
    });

    test("Instant Command", function() {
        testingConsts.resetTestingWorkspace();
        var instantCommandTemplate = new OldCommandInstantCommandTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldInstantCommand).getText(), instantCommandTemplate.getText());
    });

    test("Timed Command", function() {
        testingConsts.resetTestingWorkspace();
        var timedCommandTemplate = new OldCommandTimedCommandTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldTimedCommand).getText(), timedCommandTemplate.getText());
    });

    test("PID Subsystem", function() {
        testingConsts.resetTestingWorkspace();
        var pidSubsystemTemplate = new OldCommandPIDSubsystemTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldPIDSubsystem).getText(), pidSubsystemTemplate.getText());
    });

    test("Trigger", function() {
        testingConsts.resetTestingWorkspace();
        var triggerTemplate = new OldCommandTriggerTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldTrigger).getText(), triggerTemplate.getText());
    });

    test("CommandRobot", function() {
        testingConsts.resetTestingWorkspace();
        var robotTemplate = new OldCommandRobotTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldRobot).getText(), robotTemplate.getText());
    });

    test("OI", function() {
        testingConsts.resetTestingWorkspace();
        var oiTemplate = new OldCommandOITemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldOI).getText(), oiTemplate.getText());
    });

    test("Robot Map", function() {
        testingConsts.resetTestingWorkspace();
        var robotMapTemplate = new OldCommandRobotMapTemplate;
        assert.equal(templateInterpreter.getTemplateObjectFromTemplateType(templateInterpreter.templateType.oldRobotMap).getText(), robotMapTemplate.getText());
    });
});

suite("Template Parsing", function() {
    /* Possible Tests
     * All parameters (className, packageName, gradleRioVersion, templateType)
     * className
     * packageName
     * gradleRioVersion
     * templateType
    */
    test("Class Name Parsing - Basic", function() {
        assert.equal("The class name is: MyAmazingClass", templateInterpreter.parseForClassName("MyAmazingClass", "The class name is: #{NAME}"));
    });

    test("Package Name Parsing - Basic", function() {
        assert.equal("The class name is: frc.robot.team.cool", templateInterpreter.parseForPackageName("frc.robot.team.cool", "The class name is: #{PACKAGE}"));
    });

    test("GradleRio Version Parsing - Basic", function() {
        assert.equal(`The current GradleRIO Version is: 2020.0.0`, templateInterpreter.parseForGradleRioVersion("2020.0.0", "The current GradleRIO Version is: #{GRADLE_RIO_VERSION}"));
    });

    test("Template Type Parsing", function() {
        testingConsts.resetTestingWorkspace();
    });
});
