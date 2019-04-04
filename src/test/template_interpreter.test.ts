// import * as vscode from 'vscode';
import * as assert from 'assert';
// import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
// import * as preferences from '../preferences';
import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';
import * as testingConsts from "./testingConstants";
import { MainTemplate } from '../templates/frc-kotlin/Main';
import { BuildGradleTemplate } from '../templates/frc-kotlin/BuildGradle';
import { SubsystemTemplate } from '../templates/frc-kotlin/command-based/subsystems/SubsystemTemplate';
import { CommandTemplate } from '../templates/frc-kotlin/command-based/commands/CommandTemplate';
import { CommandGroupTemplate } from '../templates/frc-kotlin/command-based/commands/CommandGroupTemplate';
import { EmptyClassTemplate } from '../templates/frc-kotlin/command-based/EmptyClassTemplate';
import { InstantCommandTemplate } from '../templates/frc-kotlin/command-based/commands/InstantCommandTemplate';
import { TimedCommandTemplate } from '../templates/frc-kotlin/command-based/commands/TimedCommand';
import { PIDSubsystemTemplate } from '../templates/frc-kotlin/command-based/subsystems/PIDSubsystemTemplate';
import { TriggerTemplate } from '../templates/frc-kotlin/command-based/triggers/TriggerTemplate';

suite("Grabbing Templates", function () {
    test("Main.kt", function() {
        testingConsts.resetTestingWorkspace();
        var mainTemplate = new MainTemplate;
        assert.equal(template_interpreter.getMainTemplateObject().getText(), mainTemplate.getText());
    });

    test("build.gradle", function() {
        testingConsts.resetTestingWorkspace();
        var buildGradleTemplate = new BuildGradleTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.build_gradle).getText(), buildGradleTemplate.getText());
    });

    test("Subsystem", function() {
        testingConsts.resetTestingWorkspace();
        var subsystemTemplate = new SubsystemTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.subsystem).getText(), subsystemTemplate.getText());
    });

    test("Command", function() {
        testingConsts.resetTestingWorkspace();
        var commandTemplate = new CommandTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.command).getText(), commandTemplate.getText());
    });

    test("Command Group", function() {
        testingConsts.resetTestingWorkspace();
        var commandGroupTemplate = new CommandGroupTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.command_group).getText(), commandGroupTemplate.getText());
    });

    test("Empty Class", function() {
        testingConsts.resetTestingWorkspace();
        var emptyClassTemplate = new EmptyClassTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.empty_class).getText(), emptyClassTemplate.getText());
    });

    test("Instant Command", function() {
        testingConsts.resetTestingWorkspace();
        var instantCommandTemplate = new InstantCommandTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.instant_command).getText(), instantCommandTemplate.getText());
    });

    test("Timed Command", function() {
        testingConsts.resetTestingWorkspace();
        var timedCommandTemplate = new TimedCommandTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.timed_command).getText(), timedCommandTemplate.getText());
    });

    test("PID Subsystem", function() {
        testingConsts.resetTestingWorkspace();
        var pidSubsystemTemplate = new PIDSubsystemTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.pid_subsystem).getText(), pidSubsystemTemplate.getText());
    });

    test("Trigger", function() {
        testingConsts.resetTestingWorkspace();
        var triggerTemplate = new TriggerTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.trigger).getText(), triggerTemplate.getText());
    });
});

suite("Parsing Templates", function() {
    test("Reset testing workspace", function() {
        testingConsts.resetTestingWorkspace();
    });
});