export class PIDSubsystemTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018-2019 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.controller.PIDController
import edu.wpi.first.wpilibj2.command.PIDSubsystem

class #{NAME} : PIDSubsystem() {
  /**
   * Creates a new #{NAME}.
   */
  init {
    super(
      // The PIDController used by the subsystem
      PIDController(0, 0, 0))
  }

  override fun useOutput(output: Double, setpoint: Double) {
    // Use the output here
  }

  override fun getMeasurement() {
    // Return the process variable measurement here
    return 0;
  }
}
`;
}
