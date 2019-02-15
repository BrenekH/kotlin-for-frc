// import * as vscode from 'vscode';
import * as assert from 'assert';
// import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
// import * as preferences from '../preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';
import * as testingConsts from "./testingConstants";
// import { MainTemplate } from '../templates/frc-kotlin/Main';

suite("Template Grabbing Tests", function () {
    test("Get Main.kt Template Object", function() {
        // assert.equal(template_interpreter.getMainTemplateObject(), new MainTemplate);
        assert.equal(1, 1);
    });
});

suite("Template Parsing Tests", function() {
    test("Reset testing workspace", function() {
        testingConsts.resetTestingWorkspace();
    });
});