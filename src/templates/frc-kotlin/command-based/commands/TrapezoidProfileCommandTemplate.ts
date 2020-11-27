export class TrapezoidProfileCommandTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2019 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.TrapezoidProfileCommand

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/latest/docs/software/commandbased/convenience-features.html
class #{NAME} : TrapezoidProfileCommand() {
  init {
    super(
      new TrapezoidProfile(
        // The motion profile constraints
        TrapezoidProfile.Constraints(0, 0),
        // Goal state
        TrapezoidProfile.State(),
        // Initial state
        TrapezoidProfile.State()
      ),
      { state ->
        // Use current trajectory state here
      })
  }
}
`;
}
