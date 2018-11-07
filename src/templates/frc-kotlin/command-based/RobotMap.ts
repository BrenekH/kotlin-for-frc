export class RobotMapTemplate {
  private useAtProjectConversion: boolean;
  private text: string;
  constructor() {
    this.useAtProjectConversion = true;
    this.text = `package frc.robot

/**
 * The RobotMap is a mapping from the ports sensors and actuators are wired into
 * to a variable name. This provides flexibility changing wiring, makes checking
 * the wiring easier and significantly reduces the number of magic numbers
 * floating around.
 */
object RobotMap {
  // For example to map the left and right motors, you could define the
  // following variables to use with your drivetrain subsystem.
  // val leftMotor = 1
  // val rightMotor = 2

  // If you are using multiple modules, make sure to define both the port
  // number and the module. For example you with a rangefinder:
  // val rangefinderPort = 1
  // val rangefinderModule = 1
}`;
  }
  public getText(): string {
    return this.text;
  }
  public useAtConversion(): boolean {
    return this.useAtProjectConversion;
  }
}