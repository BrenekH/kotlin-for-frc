'use strict';
import * as vscode from 'vscode';
import * as fs from "fs";

var defaultJson = `{"wpilib_version": "2019.1.1", "main_kt": false}`;

interface PreferencesJson {
    wpilib_version: string;
    main_kt: boolean;
}

export function getWPILibVersion(): string {
    let parsedJson = loadPreferencesJson();
    return parsedJson.wpilib_version;
}

export function getMainKt(): boolean {
    let parsedJson = loadPreferencesJson();
    return parsedJson.main_kt;
}

export function setWPILibVersion(version: string) {
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        return;
    }
    let parsedJson = loadPreferencesJson();
    parsedJson.wpilib_version = version;
    fs.writeFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc/kotlin-frc-preferences.json", JSON.stringify(parsedJson));
}

export function setMainKt(value: boolean) {
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        return;
    }
    let parsedJson = loadPreferencesJson();
    parsedJson.main_kt = value;
    fs.writeFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc/kotlin-frc-preferences.json", JSON.stringify(parsedJson));
}

export function createPreferencesJson() {
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        return;
    }
    if (!fs.existsSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc")) {
        fs.mkdirSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc");
    }
    fs.writeFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc/kotlin-frc-preferences.json", defaultJson);
}

function loadPreferencesJson(): PreferencesJson {
    let parsedJson: PreferencesJson;
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        parsedJson = JSON.parse(defaultJson);
        parsedJson.wpilib_version = "null";
        return parsedJson;
    }
    try {
        parsedJson = JSON.parse(fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc/kotlin-frc-preferences.json", 'utf8'));
    }
    catch(e) {
        console.log("Caught Error: " + e);
        createPreferencesJson();
        parsedJson = JSON.parse(fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/.kotlin-for-frc/kotlin-frc-preferences.json", 'utf8'));
    }
    return parsedJson;
}
