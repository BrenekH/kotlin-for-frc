export class SampleRobotTemplate {
  private useAtProjectConversion: boolean;
  private text: string;
  constructor() {
  this.useAtProjectConversion = true;
  this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2017-2018 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package frc.robot

import edu.wpi.first.wpilibj.Joystick
import edu.wpi.first.wpilibj.SampleRobot
import edu.wpi.first.wpilibj.PWMVictorSPX
import edu.wpi.first.wpilibj.Timer
import edu.wpi.first.wpilibj.drive.DifferentialDrive
import edu.wpi.first.wpilibj.smartdashboard.SendableChooser
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard

/**
 * This is a demo program showing the use of the RobotDrive class. The
 * SampleRobot class is the base of a robot application that will automatically
 * call your Autonomous and OperatorControl methods at the right time as
 * controlled by the switches on the driver station or the field controls.
 *
 * <p>The VM is configured to automatically run this class, and to call the
 * functions corresponding to each mode, as described in the SampleRobot
 * documentation. If you change the name of this class or the package after
 * creating this project, you must also update the build.properties file in the
 * project.
 *
 * <p>WARNING: While it may look like a good choice to use for your code if
 * you're inexperienced, don't. Unless you know what you are doing, complex code
 * will be much more difficult under this system. Use IterativeRobot or
 * Command-Based instead if you're new.
 */
class Robot: SampleRobot() {
  private val kDefaultAuto : String
  private val kCustomAuto : String

  private val m_robotDrive : DifferentialDrive
  private val m_stick : Joystick
  private val m_chooser : SendableChooser<String>
  
  init {
    kDefaultAuto = "Default"
    kCustomAuto = "My Auto"
  
    m_robotDrive = DifferentialDrive(PWMVictorSPX(0), PWMVictorSPX(1))
    m_stick = Joystick(0)
    m_chooser = SendableChooser<String>()
  
    m_robotDrive.expiration = 0.1
  }
  
  override fun robotInit() {
    m_chooser.setDefaultOption("Default Auto", kDefaultAuto)
    m_chooser.addOption("My Auto", kCustomAuto)
    SmartDashboard.putData("Auto choices", m_chooser)
  }
  
  /**
   * This autonomous (along with the chooser code above) shows how to select
   * between different autonomous modes using the dashboard. The sendable
   * chooser code works with the Java SmartDashboard. If you prefer the
   * LabVIEW Dashboard, remove all of the chooser code and uncomment the
   * getString line to get the auto name from the text box below the Gyro
   *
   * <p>You can add additional auto modes by adding additional comparisons to
   * the if-else structure below with additional strings. If using the
   * SendableChooser make sure to add them to the chooser code above as well.
   *
   * <p>If you wanted to run a similar autonomous mode with an IterativeRobot
   * you would write:
   *
   * <blockquote><pre>{@code
   * Timer timer = new Timer();
   *
   * // This function is run once each time the robot enters autonomous mode
   * override fun autonomousInit() {
   *     timer.reset()
   *     timer.start()
   * }
   *
   * // This function is called periodically during autonomous
   * override fun autonomousPeriodic() {
   * // Drive for 2 seconds
   *     if (timer.get() < 2.0) {
   *         myRobot.drive(-0.5, 0.0) // drive forwards half speed
   *     } else if (timer.get() < 5.0) {
   *         myRobot.drive(-1.0, 0.0) // drive forwards full speed
   *     } else {
   *         myRobot.drive(0.0, 0.0) // stop robot
   *     }
   * }
   * }</pre></blockquote>
   */
  override fun autonomous() {
    val autoSelected : String = m_chooser.selected
    // val autoSelected : String = SmartDashboard.getString("Auto Selector", defaultAuto)
    println("Auto selected: " + autoSelected)

    // MotorSafety improves safety when motors are updated in loops
    // but is disabled here because motor updates are not looped in
    // this autonomous mode.
    m_robotDrive.setSafetyEnabled(false);

    if (autoSelected == kCustomAuto) {
      // Spin at half speed for two seconds
      m_robotDrive.arcadeDrive(0.0, 0.5)
      Timer.delay(2.0)

      // Stop robot
      m_robotDrive.arcadeDrive(0.0, 0.0)
    }
    else {
      // Drive forwards for two seconds
      m_robotDrive.arcadeDrive(-0.5, 0.0)
      Timer.delay(2.0)

      m_robotDrive.arcadeDrive(0.0, 0.0)
    }
  }
  
  /**
   * Runs the motors with arcade steering.
   *
   * <p>If you wanted to run a similar teleoperated mode with an IterativeRobot
   * you would write:
   *
   * <blockquote><pre>{@code
   * // This function is called periodically during operator control
   * override fun teleopPeriodic() = myRobot.arcadeDrive(stick)
   * }
   * }</pre></blockquote>
   */
  override fun operatorControl() {
    m_robotDrive.setSafetyEnabled(true)
    while (isOperatorControl() && isEnabled()) {
      // Drive arcade style
      m_robotDrive.arcadeDrive(-m_stick.getY(), m_stick.getX())

      // The motors will be updated every 5ms
      Timer.delay(0.005)
    }
  }
  
  /**
   * Runs during test mode.
   */
   override fun test() {}
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