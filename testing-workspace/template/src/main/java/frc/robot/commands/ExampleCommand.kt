/*----------------------------------------------------------------------------*/
/* Copyright (c) 2017-2018 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package frc.robot.commands

import edu.wpi.first.wpilibj.command.Command
import frc.robot.Robot

/**
 * An example command. You can replace me with your own command.
 */
class ExampleCommand: Command() {
  init {
    // Use requires() here to declare subsystem dependencies
    requires(Robot.m_exampleSubsystem)
  }

  // Called just before this Command runs the first time
  override fun initialize () {}

  // Called repeatedly when this Command is scheduled to run
  override fun execute () {}

  // Make this return true when this Command no longer needs to run execute()
  override fun isFinished (): Boolean {
    return false
  }

  // Called once after isFinished returns true
  override fun end () {}

  // Called when another command which requires one or more of the same
  // subsystems is scheduled to run
  override fun interrupted () {}
}
