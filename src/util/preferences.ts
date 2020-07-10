'use strict';
import * as vscode from 'vscode';
import * as kotlinExt from "../extension";
import * as customfs from "../file_manipulation/file_system";
import { targetGradleRioVersion } from "../constants";

var defaultJson = `{"wpilib_version": "${targetGradleRioVersion}", "run_compliance_tests": true}`;

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

export async function createPreferencesJson() {
    if (!await customfs.exists(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc")) {
        await customfs.mkdir(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc");
    }
    await customfs.writeToFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", defaultJson);
}

async function loadPreferencesJson(): Promise<PreferencesJson> {
    var parsedJson: PreferencesJson;
    if (typeof vscode.workspace.workspaceFolders === 'undefined') {
        parsedJson = JSON.parse(defaultJson);
        return parsedJson;
    }
    try {
        parsedJson = JSON.parse(await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json"));
    }
    catch(e) {
        console.log("Caught Error: " + e);
        await createPreferencesJson();
        await sleep(500);
        parsedJson = JSON.parse(await customfs.readFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json"));
    }
    return parsedJson;
}

async function savePreferencesJson(json: PreferencesJson) {
    customfs.writeToFile(kotlinExt.getWorkspaceFolderFsPath() + "/.kotlin-for-frc/kotlin-frc-preferences.json", JSON.stringify(json));
}

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
