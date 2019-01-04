export class PIDSubsystemTemplate {
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

import edu.wpi.first.wpilibj.command.PIDSubsystem

/**
 * Add your docs here.
 */
class #{NAME} : PIDSubsystem {
  /**
   * Add your docs here.
   */
  constructor() : super("SubsystemName", 1.0, 2.0, 3.0) {
    // Insert a subsystem name and PID values above
    // Use these to get going:
    // setSetpoint() - Sets where the PID controller should move the system
    // to
    // enable() - Enables the PID controller
  }
    
  override fun initDefaultCommand() {
    // Set the default command for a subsystem here.
    // setDefaultCommand(new MySpecialCommand())
  }

  override fun returnPIDInput() : Double {
    // Return your input value for the PID loop
    // e.g. a sensor, like a potentiometer:
    // yourPot.getAverageVoltage() / kYourMaxVoltage
    return 0.0
  }

  override fun usePIDOutput(output: Double) {
    // Use output to drive your system, like a motor
    // e.g. yourMotor.set(output)
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
