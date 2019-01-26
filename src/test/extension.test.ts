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
        try {
            console.log("Current 1 workspace: " + vscode.workspace.workspaceFolders[1].uri.fsPath);
        } catch (e) {
            console.log("Didn't catch that: " + e);
        }
        vscode.workspace.updateWorkspaceFolders(1, undefined, {uri: vscode.Uri.parse("C:\\Users\\metah\\Repos\\VSCodeExtensions\\kotlin-for-frc\\testing-workspace\\workspace")});
        console.log("After update: " + vscode.workspace.workspaceFolders[1].uri.fsPath);
        var moddedPath = vscode.workspace.workspaceFolders[0].uri.fsPath.replace("\\out\\test", "\\testing-workspace\\workspace");
        console.log("Modded path" + moddedPath);
        var file = vscode.workspace.workspaceFolders[1].uri.fsPath + "/src/main/java/frc/robot/Main.kt";
        console.log("File path: " + file);
        assert.equal(1, 1);
    });
});