'use strict';
import * as vscode from 'vscode';
import * as commands from "./commands";
import * as fs from "fs";
import { robotType } from './template_interpreter';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "kotlin-for-frc" is now active!');

    let disposable = vscode.commands.registerCommand('extension.createCommand', (file_path: any) => {
        commands.createCommand(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.createCommandGroup', (file_path: any) => {
        commands.createCommandGroup(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.createSubsystem', (file_path: any) => {
        commands.createSubsystem(file_path);
    });

    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.convertJavaProject', () => {
        if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			console.log("Not a valid workspace");
			vscode.window.showErrorMessage("Kotlin for FRC: Not a valid workspace!");
			return;
        }
        console.log("Reading Robot.java");
        var robot_java: string = fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/java/frc/robot/Robot.java", 'utf8');
        var current_robot_type: robotType = robotType.sample;

        if (robot_java.includes("iterative")) {
            current_robot_type = robotType.iterative;
        }
        else if (robot_java.includes("sample")) {
            current_robot_type = robotType.sample;
        }
        else if (robot_java.includes("command")) {
            current_robot_type = robotType.command;
        }
        else if (robot_java.includes("timed")) {
            current_robot_type = robotType.timed;
        }

        commands.convertJavaProject(current_robot_type);
    });
    
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}