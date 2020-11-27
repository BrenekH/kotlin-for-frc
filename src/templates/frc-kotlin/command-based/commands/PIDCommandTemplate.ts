export class PIDCommandTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2019 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.PIDController
import edu.wpi.first.wpilibj2.command.PIDCommand

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/latest/docs/software/commandbased/convenience-features.html
class #{NAME} : PIDCommand() {
  init {
    super(
      // The controller that the command will use
      PIDController(0, 0, 0),
      // This should return the measurement,
      { 0 },
      // This should return the setpoint (can also be a constant)
      { 0 },
      // This uses the output
      { output -> 
        // Use the output here
      })
    // Use addRequirements() here to declare subsystem dependencies.
    // Configure additional PID options by calling getController() here.
  }

  // Returns true when the command should end.
  override fun isFinished() {
    return false
  }
}
`;
}
