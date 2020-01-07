export class OldCommandInstantCommandTemplate {
    private useAtProjectConversion: boolean;
    private text: string;
    constructor() {
    this.useAtProjectConversion = false;
    this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import edu.wpi.first.wpilibj.command.InstantCommand

/**
 * Add your docs here.
 */
class #{NAME}() : InstantCommand() {
    /**
     * Add your docs here.
     */
    init {
        // Use requires() here to declare subsystem dependencies
        // eg. requires(chassis);
    }

    // Called once when the command executes
    override fun initialize() {}
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
