export class SubsystemTemplate {
  private useAtProjectConversion: boolean;
  private text: string;  
  constructor() {
      this.useAtProjectConversion = false;
      this.text = `package frc.robot.subsystems

import edu.wpi.first.wpilibj.command.Subsystem

/**
 *
 */
class #{NAME}: Subsystem() {
  // Put methods for controlling this subsystem
  // here. Call these from Commands.

  override fun initDefaultCommand() {
    // Set the default command for a subsystem here.
    // setDefaultCommand(new MySpecialCommand());
  }
}`;
}
public getText(): string {
  return this.text;
}
public useAtConversion(): boolean {
  return this.useAtProjectConversion;
}
}