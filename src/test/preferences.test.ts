// import * as vscode from 'vscode';
import * as assert from 'assert';
import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
import * as preferences from '../preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
import * as fs from 'fs';
import * as testingConsts from "./testingConstants";

suite("Preferences.ts Test", function () {
    testingConsts.setupWorkspace();

    test("Get Main Kt ", function() {
        assert.equal(preferences.getMainKt(), false);
    });

    test("Set Main Kt", function() {
        var filePath = kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json";
        
        preferences.setMainKt(true);

        var fileContents = fs.readFileSync(filePath, 'utf-8');
        assert.equal(fileContents, `{"wpilib_version":"2019.0.1","main_kt":true,"run_compliance_tests":true}`);
        
        preferences.setMainKt(false);
    });
  
  test("Get WPILib version", function() {
      assert.equal(preferences.getWPILibVersion(), "2019.0.1");
  });
});