export class TrapezoidProfileSubsystemTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2019 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.TrapezoidProfileSubsystem

class #{NAME} : TrapezoidProfileSubsystem() {
  /**
   * Creates a new #{NAME}.
   */
  init {
    super(
      // The constraints for the generated profiles
      TrapezoidProfile.Constraints(0, 0),
      // The initial position of the mechanism
      0)
  }
  
  override fun useState(state: TrapezoidProfile.State) {
    // Use the computed profile state here.
  }
}
`;
}
