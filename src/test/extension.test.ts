//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';
// import * as path from "path";
// import * as fs from 'fs';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    // Defines a Mocha unit test
    test("Something 1", function() {
        if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			console.log("Not a valid workspace");
            assert.equal(1, 0);
            return;
        }
        assert.equal(1, 1);
    });
});