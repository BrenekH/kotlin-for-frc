'use strict';
import * as vscode from 'vscode';
import * as fs from "fs";
import * as kotlinExt from "../extension";

var defaultJson = `{"wpilib_version": "2019.0.1", "main_kt": false, "run_compliance_tests": true}`;

interface PreferencesJson {
    wpilib_version: string;
    main_kt: boolean;
    run_compliance_tests: boolean;
}

export function getWPILibVersion(): string {
    let parsedJson = loadPreferencesJson();
    return parsedJson.wpilib_version;
}

export function getMainKt(): boolean {
    let parsedJson = loadPreferencesJson();
    return parsedJson.main_kt;
}

export function getRunComplianceTests(): boolean {
    let parsedJson = loadPreferencesJson();
    if (typeof parsedJson.run_compliance_tests === 'undefined') {
        setRunComplianceTests(true);
        parsedJson = loadPreferencesJson();
    }
    return parsedJson.run_compliance_tests;
}

export function setWPILibVersion(version: string) {
    let parsedJson = loadPreferencesJson();
    parsedJson.wpilib_version = version;
    savePreferencesJson(parsedJson);
}

export function setMainKt(value: boolean) {
    let parsedJson = loadPreferencesJson();
    parsedJson.main_kt = value;
    savePreferencesJson(parsedJson);
}

export function setRunComplianceTests(value: boolean) {
    let parsedJson = loadPreferencesJson();
    parsedJson.run_compliance_tests = value;
    savePreferencesJson(parsedJson);
}

export function createPreferencesJson() {
    if (!fs.existsSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc")) {
        fs.mkdirSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc");
    }
    fs.writeFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", defaultJson);
}

function loadPreferencesJson(): PreferencesJson {
    let parsedJson: PreferencesJson;
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        parsedJson = JSON.parse(defaultJson);
        parsedJson.wpilib_version = "null";
        return parsedJson;
    }
    try {
        parsedJson = JSON.parse(fs.readFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", 'utf8'));
    }
    catch(e) {
        console.log("Caught Error: " + e);
        createPreferencesJson();
        parsedJson = JSON.parse(fs.readFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", 'utf8'));
    }
    return parsedJson;
}

function savePreferencesJson(json: PreferencesJson) {
    fs.writeFileSync(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", JSON.stringify(json));
}
