// import * as vscode from 'vscode';
import * as assert from 'assert';
// import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
import * as preferences from '../preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';
import * as testingConsts from "./testingConstants";

suite("Preferences.ts Test", function () {
    testingConsts.setupWorkspace();

    test("Preferences Main Kt value", function() {
        assert.equal(preferences.getMainKt(), false);
    });

    test("Set main kt", function() {
        preferences.setMainKt(true);
        assert.equal(preferences.getMainKt(), true);
    });
});