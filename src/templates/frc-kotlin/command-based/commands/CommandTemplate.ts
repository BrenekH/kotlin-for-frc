export class CommandTemplate {
  private useAtProjectConversion: boolean;
  private text: string;
  constructor() {
    this.useAtProjectConversion = false;
    this.text = `package frc.robot.commands

import edu.wpi.first.wpilibj.command.Command

import frc.robot.Robot

/**
 *
 */
class #{NAME}: Command() {
  init {
    // Use requires() here to declare subsystem dependencies
    requires(Robot.exampleSubsystem)
  }

  // Called just before this Command runs the first time
  override fun initialize () {
    TODO("Not Implemented")
  }

  // Called repeatedly when this Command is scheduled to run
  override fun execute () {
    TODO("Not Implemented")
  }

  // Make this return true when this Command no longer needs to run execute()
  override fun isFinished (): Boolean {
    return false
  }

  // Make this return true when this Command no longer needs to run execute()
  override fun end () {
    TODO("Not Implemented")
  }

  // Called when another command which requires one or more of the same
  // subsystems is scheduled to run
  override fun interrupted () {
    TODO("Not Implemented")
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