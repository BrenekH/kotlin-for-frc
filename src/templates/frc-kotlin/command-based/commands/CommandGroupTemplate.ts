export class CommandGroupTemplate {
  private useAtProjectConversion: boolean;
  private text: string;
  constructor() {
    this.useAtProjectConversion = false;
    this.text = `package frc.robot.commands

import edu.wpi.first.wpilibj.command.CommandGroup

class #{NAME}: CommandGroup() {
  init {
    //Add commands here using: AddParallel or AddSequential
  }
}`;
  }
  public getText(): string {
    return this.text;
  }
  public useAtConversion(): boolean {
    return this.useAtProjectConversion;
  }
}