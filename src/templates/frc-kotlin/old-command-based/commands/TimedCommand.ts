export class OldCommandTimedCommandTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.command.TimedCommand

/**
 * Add your docs here.
 */
class #{NAME}(val timeout: Double) : TimedCommand(timeout) {
  /**
   * Add your docs here.
   */
  init {
    // Use requires() here to declare subsystem dependencies
    // eg. requires(chassis);
  }

  // Called just before this Command runs the first time
  override fun initialize() {}

  // Called repeatedly when this Command is scheduled to run
  override fun execute() {}

  // Called once after timeout
  override fun end() {}

  // Called when another command which requires one or more of the same
  // subsystems is scheduled to run
  override fun interrupted() {}
}
`;
}
