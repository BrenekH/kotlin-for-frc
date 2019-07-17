// import * as vscode from 'vscode';
import * as assert from 'assert';
import * as kotlinExt from '../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
import * as preferences from '../util/preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
import * as fs from 'fs';
import * as testingConsts from "./testingConstants";

suite("Preferences API", function () {
    testingConsts.setupWorkspace();

    test("Get WPILib version", function() {
        assert.equal(preferences.getWPILibVersion(), "2019.0.1");
    });
  
    test("Set WPILib version", function() {
      var filePath = kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json";
          
      preferences.setWPILibVersion("2019.2.1");
  
      var fileContents = fs.readFileSync(filePath, 'utf-8');
      assert.equal(fileContents, `{"wpilib_version":"2019.2.1","main_kt":false,"run_compliance_tests":true}`);
      
      preferences.setWPILibVersion("2019.0.1");
    });
    
    test("Get Run Compliance Test", function() {
        assert.equal(preferences.getRunComplianceTests(), true);
    });

    test("Set Run Compliance Tests", function() {
        var filePath = kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json";
        
        preferences.setRunComplianceTests(false);

        var fileContents = fs.readFileSync(filePath, 'utf-8');
        assert.equal(fileContents, `{"wpilib_version":"2019.0.1","main_kt":false,"run_compliance_tests":false}`);
        
        preferences.setRunComplianceTests(true);
    });
});