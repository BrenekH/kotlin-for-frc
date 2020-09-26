// import * as vscode from 'vscode';
import * as assert from 'assert';
import * as kotlinExt from '../../extension';
// import * as compliance from '../compliance';
// import * as commands from '../commands';
// import * as file_generator from '../file_generator';
import * as preferences from '../../util/preferences';
// import * as template_interpreter from '../template_interpreter';
// import * as path from "path";
import * as fs from 'fs';
// import * as customfs from "../file_manipulation/file_system";
import * as testingConsts from "./testingConstants";

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

suite("Preferences API", function () {
    testingConsts.setupWorkspace();

    // test("Get WPILib version", async function() {
    //     assert.equal(await preferences.getWPILibVersion(), targetGradleRioVersion);
    // });
  
    // test("Set WPILib version", async function() {
    //   var filePath = kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json";
          
    //   await preferences.setWPILibVersion("2019.2.1");

    //   await sleep(100);
  
    //   var fileContents = fs.readFileSync(filePath, 'utf-8');
    //   assert.equal(fileContents, `{"wpilibVersion":"2019.2.1","runComplianceTests":true}`);
      
    //   await preferences.setWPILibVersion(targetGradleRioVersion);
    // });
    
    // test("Get Run Compliance Test", async function() {
    //     assert.equal(await preferences.getRunComplianceTests(), true);
    // });

    // test("Set Run Compliance Tests", async function() {
    //     var filePath = kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json";
        
    //     await preferences.setRunComplianceTests(false);

    //     await sleep(100);

    //     var fileContents = fs.readFileSync(filePath, "utf-8");
    //     assert.equal(fileContents, `{"wpilibVersion":"${targetGradleRioVersion}","runComplianceTests":false}`);
        
    //     await preferences.setRunComplianceTests(true);
    // });
});
