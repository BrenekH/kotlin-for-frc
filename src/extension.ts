'use strict';
import * as vscode from 'vscode';
import * as commands from "./commands";
import * as fs from "fs";
import { robotType } from './template_interpreter';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "kotlin-for-frc" is now active!');

    let disposable = vscode.commands.registerCommand('extension.createNew', (file_path: any) => {
        commands.createNew(file_path);
    });

    context.subscriptions.push(disposable);


    disposable = vscode.commands.registerCommand('extension.convertJavaProject', () => {
        if (typeof vscode.workspace.workspaceFolders === 'undefined') {
			console.log("Not a valid workspace");
			vscode.window.showErrorMessage("Kotlin for FRC: Not a valid workspace!");
			return;
        }
        console.log("Reading Robot.java");
        // Check to make sure file paths are even there
        try {
            var robot_java: string = fs.readFileSync(vscode.workspace.workspaceFolders[0].uri.fsPath + "/src/main/java/frc/robot/Robot.java", 'utf8');
        }
        catch (e) {
            console.log(e);
            vscode.window.showErrorMessage("Kotlin for FRC: Could not find Robot.java. You may have already converted this project or the correct directories are missing.");
            return;
        }
        var current_robot_type: robotType = robotType.sample;

        if (robot_java.includes("edu.wpi.first.wpilibj.command.Command")) {
            current_robot_type = robotType.command;
            console.log("Command");
        }
        else if (robot_java.includes("edu.wpi.first.wpilibj.IterativeRobot")) {
            current_robot_type = robotType.iterative;
            console.log("Iterative");
        }
        else if (robot_java.includes("edu.wpi.first.wpilibj.SampleRobot")) {
            current_robot_type = robotType.sample;
            console.log("Sample");
        }
        else if (robot_java.includes("edu.wpi.first.wpilibj.TimedRobot")) {
            if (robot_java.includes("edu.wpi.first.wpilibj.smartdashboard.SendableChooser")) {
                current_robot_type = robotType.timed;
                console.log("Timed");
            }
            else {
                current_robot_type = robotType.timed_skeleton;
                console.log("Timed skeleton");
            }
        }

        commands.convertJavaProject(current_robot_type);
    });
    
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}