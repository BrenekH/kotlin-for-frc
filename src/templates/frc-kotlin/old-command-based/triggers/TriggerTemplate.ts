export class OldCommandTriggerTemplate {
  text: string = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.buttons.Trigger

/**
 * Add your docs here.
 */
class #{NAME} : Trigger() {
    override fun get() : Boolean = false
}
`;
}
