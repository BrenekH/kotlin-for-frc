export class TimedRobotTemplate {
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

import edu.wpi.first.wpilibj.TimedRobot
import edu.wpi.first.wpilibj.smartdashboard.SendableChooser
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard

/**
 * The VM is configured to automatically run this class, and to call the
 * functions corresponding to each mode, as described in the TimedRobot
 * documentation. If you change the name of this class or the package after
 * creating this project, you must also update the build.gradle file in the
 * project.
 */
class Robot : TimedRobot() {
    private val kDefaultAuto : String
    private val kCustomAuto : String
    private var m_autoSelected : String
    private val m_chooser : SendableChooser<String>

    init {
        kDefaultAuto = "Default"
        kCustomAuto = "My Auto"
        m_autoSelected = ""
        m_chooser = SendableChooser<String>()
    }

    /**
     * This function is run when the robot is first started up and should be
     * used for any initialization code.
     */
    override fun robotInit() {
        m_chooser.setDefaultOption("Default Auto", kDefaultAuto)
        m_chooser.addOption("My Auto", kCustomAuto)
        SmartDashboard.putData("Auto choices", m_chooser)
    }

    /**
     * This function is called every robot packet, no matter the mode. Use
     * this for items like diagnostics that you want ran during disabled,
     * autonomous, teleoperated and test.
     *
     * <p>This runs after the mode specific periodic functions, but before
     * LiveWindow and SmartDashboard integrated updating.
     */
    override fun robotPeriodic() {}

    /**
     * This autonomous (along with the chooser code above) shows how to select
     * between different autonomous modes using the dashboard. The sendable
     * chooser code works with the Java SmartDashboard. If you prefer the
     * LabVIEW Dashboard, remove all of the chooser code and uncomment the
     * getString line to get the auto name from the text box below the Gyro
     *
     * <p>You can add additional auto modes by adding additional comparisons to
     * the switch structure below with additional strings. If using the
     * SendableChooser make sure to add them to the chooser code above as well.
     */
    override fun autonomousInit() {
        m_autoSelected = m_chooser.selected
        // m_autoSelected = SmartDashboard.getString("Auto Selector" kDefaultAuto)
        println("Auto selected: " + m_autoSelected)
    }

    /**
     * This function is called periodically during autonomous.
     */
    override fun autonomousPeriodic() {
        if (m_autoSelected == kCustomAuto) {
            // Put custom auto code here
        }
        else {
            // Put default auto code here
        }
    }

    /**
     * This function is called periodically during operator control.
     */
    override fun teleopPeriodic() {}

    /**
     * This function is called periodically during test mode.
     */
    override fun testPeriodic() {}
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