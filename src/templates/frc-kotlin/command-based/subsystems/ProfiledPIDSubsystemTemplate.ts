export class ProfiledPIDSubsystemTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018-2019 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.controller.ProfiledPIDController
import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.ProfiledPIDSubsystem

class #{NAME} : ProfiledPIDSubsystem() {
  /**
   * Creates a new #{NAME}.
   */
  init {
    super(
      // The ProfiledPIDController used by the subsystem
      ProfiledPIDController(
        // PID gains
        0, 0, 0,
        // The motion profile constraints
        TrapezoidProfile.Constraints(0, 0)
      ))
  }

  override fun useOutput(output: Double, setpoint: TrapezoidProfile.State) {
    // Use the output (and optionally the setpoint) here
  }

  override fun getMeasurement(): Double {
    // Return the process variable measurement here
    return 0
  }
}
`;
}
