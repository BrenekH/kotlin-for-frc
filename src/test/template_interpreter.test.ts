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

suite("Grabbing Templates", function () {
    test("Main.kt", function() {
        testingConsts.resetTestingWorkspace();
        var mainTemplate = new MainTemplate;
        assert.equal(template_interpreter.getMainTemplateObject().getText(), mainTemplate.getText());
    });

    test("build.gradle", function() {
        testingConsts.resetTestingWorkspace();
        var buildGradleTemplate = new BuildGradleTemplate;
        assert.equal(template_interpreter.getTemplateObjectFromTemplateType(template_interpreter.templateType.build_gradle), buildGradleTemplate.getText());
    });
});

suite("Parsing Templates", function() {
    test("Reset testing workspace", function() {
        testingConsts.resetTestingWorkspace();
    });
});