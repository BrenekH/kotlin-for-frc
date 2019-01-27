// import * as vscode from 'vscode';
import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
// import * as preferences from '../preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
// import * as fs from 'fs';
import * as testingConsts from "./testingConstants";

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {
    testingConsts.setupWorkspace();

    // Defines a Mocha unit test
    test("Setting up workspace folders", function() {
        console.log("Path: " + kotlinExt.getWorkspaceFolderPath());
        console.log("FsPath: " + kotlinExt.getWorkspaceFolderFsPath());

        assert.equal(1, 1);
    });
});