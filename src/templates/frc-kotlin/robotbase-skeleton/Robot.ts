export class RobotBaseSkeleton {
	private useAtProjectConversion: boolean;
	private text: string;
	constructor() {
	this.useAtProjectConversion = true;
	this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018-2019 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package frc.robot
  
import edu.wpi.first.hal.HAL
import edu.wpi.first.wpilibj.RobotBase
import edu.wpi.first.wpilibj.livewindow.LiveWindow
import edu.wpi.first.wpilibj.shuffleboard.Shuffleboard

/**
 * The VM is configured to automatically run this class. If you change the name
 * of this class or the package after creating this project, you must also
 * update the build.gradle file in the project.
 */
class Robot : RobotBase() {
  @Volatile private var m_exit: Boolean = false;

  fun robotInit() {
  }
  
  fun disabled() {
  }

  fun autonomous() {
  }

  fun teleop() {
  }

  fun test() {
  }

  override fun startCompetition() {
	robotInit()
	
	// Tell the DS that the robot is ready to be enabled
	HAL.observeUserProgramStarting()

	while (!Thread.currentThread().isInterrupted() && !m_exit) {
	  if (isDisabled()) {
	    m_ds.InDisabled(true)
	    disabled()
	    m_ds.InDisabled(false)
	    while (isDisabled()) {
	  	  m_ds.waitForData()
	    }
	  } else if (isAutonomous()) {
	    m_ds.InAutonomous(true)
	    autonomous()
	    m_ds.InAutonomous(false)
	    while (isAutonomous() && !isDisabled()) {
	  	  m_ds.waitForData()
	    }
	  } else if (isTest()) {
	    LiveWindow.setEnabled(true)
	    Shuffleboard.enableActuatorWidgets()
	    m_ds.InTest(true)
	    test()
	    m_ds.InTest(false)
	    while (isTest() && isEnabled()) {
	  	  m_ds.waitForData()
	    }
	    LiveWindow.setEnabled(false)
	    Shuffleboard.disableActuatorWidgets()
	  } else {
	    m_ds.InOperatorControl(true)
	    teleop()
	    m_ds.InOperatorControl(false)
	    while (isOperatorControl() && !isDisabled()) {
	  	  m_ds.waitForData()
	    }
	  }
	}
  }

  override fun endCompetition() {
    m_exit = true
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
