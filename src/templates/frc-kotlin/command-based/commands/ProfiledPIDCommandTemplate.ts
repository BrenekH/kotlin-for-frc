export class ProfiledPIDCommandTemplate {
    private useAtProjectConversion: boolean;
    private text: string;
    constructor() {
    this.useAtProjectConversion = false;
    this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2019 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.controller.ProfiledPIDController
import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.ProfiledPIDCommand

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/latest/docs/software/commandbased/convenience-features.html
class #{NAME} : ProfiledPIDCommand() {
  init {
    super(
      // The ProfiledPIDController used by the command
      ProfiledPIDController(
        // The PID gains
        0, 0, 0,
        // The motion profile constraints
        TrapezoidProfile.Constraints(0, 0)),
      // This should return the measurement
      { 0 },
      // This should return the goal (can also be a constant)
      { TrapezoidProfile.State() },
      // This uses the output
      { output, setpoint->
        // Use the output (and setpoint, if desired) here
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
  
  public getText(): string {
    return this.text;
  }
  
  public useAtConversion(): boolean {
    return this.useAtProjectConversion;
  }
}
