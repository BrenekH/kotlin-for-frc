'use strict';
import * as vscode from 'vscode';
import * as fs from "fs";
import * as customfs from "../file_manipulation/file_system";
import * as kotlinExt from "../extension";

var defaultJson = `{"wpilib_version": "2019.0.1", "run_compliance_tests": true}`;

interface PreferencesJson {
    wpilib_version: string;
    run_compliance_tests: boolean;
}

export async function getWPILibVersion(): Promise<string> {
    let parsedJson = await loadPreferencesJson();
    return parsedJson.wpilib_version;
}

export async function getRunComplianceTests(): Promise<boolean> {
    let parsedJson = await loadPreferencesJson();
    if (typeof parsedJson.run_compliance_tests === 'undefined') {
        setRunComplianceTests(true);
        parsedJson = await loadPreferencesJson();
    }
    return parsedJson.run_compliance_tests;
}

export async function setWPILibVersion(version: string) {
    let parsedJson = await loadPreferencesJson();
    parsedJson.wpilib_version = version;
    savePreferencesJson(parsedJson);
}

export async function setRunComplianceTests(value: boolean) {
    let parsedJson = await loadPreferencesJson();
    parsedJson.run_compliance_tests = value;
    savePreferencesJson(parsedJson);
}

export function createPreferencesJson() {
    if (customfs.isVscodeFsAvailable) {
        customfs.mkdir(kotlinExt.getWorkspaceFolderPath() + "/.kotlin-for-frc");
        customfs.writeToFile(kotlinExt.getWorkspaceFolderPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", defaultJson);
    } else {
        if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc")) {
            fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc");
        }
        fs.writeFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", defaultJson);
    }
}

async function loadPreferencesJson(): Promise<PreferencesJson> {
    let parsedJson: PreferencesJson;
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        parsedJson = JSON.parse(defaultJson);
        parsedJson.wpilib_version = "null";
        return parsedJson;
    }
    try {
        parsedJson = JSON.parse(await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json"));
    }
    catch(e) {
        console.log("Caught Error: " + e);
        createPreferencesJson();
        parsedJson = JSON.parse(await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json"));
    }
    return parsedJson;
}

function savePreferencesJson(json: PreferencesJson) {
    customfs.writeToFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", JSON.stringify(json));
}
