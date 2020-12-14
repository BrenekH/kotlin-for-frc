export class RobotBaseSkeleton {
    text: string = `package frc.robot

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
    fun robotInit() {}

    fun disabled() {}

    fun autonomous() {}

    fun teleop() {}

    fun test() {}

    @Volatile
    private var exit = false
    override fun startCompetition() {
        robotInit()

        // Tell the DS that the robot is ready to be enabled
        HAL.observeUserProgramStarting()
        while (!Thread.currentThread().isInterrupted && !exit) {
            when (true) {
                isDisabled -> {
                    m_ds.InDisabled(true)
                    disabled()
                    m_ds.InDisabled(false)
                    while (isDisabled) {
                        m_ds.waitForData()
                    }
                }
                isAutonomous -> {
                    m_ds.InAutonomous(true)
                    autonomous()
                    m_ds.InAutonomous(false)
                    while (isAutonomousEnabled) {
                        m_ds.waitForData()
                    }
                }
                isTest -> {
                    LiveWindow.setEnabled(true)
                    Shuffleboard.enableActuatorWidgets()
                    m_ds.InTest(true)
                    test()
                    m_ds.InTest(false)
                    while (isTest && isEnabled) {
                        m_ds.waitForData()
                    }
                    LiveWindow.setEnabled(false)
                    Shuffleboard.disableActuatorWidgets()
                }
                else -> {
                    m_ds.InOperatorControl(true)
                    teleop()
                    m_ds.InOperatorControl(false)
                    while (isOperatorControlEnabled) {
                        m_ds.waitForData()
                    }
                }
            }
        }
    }

    override fun endCompetition() {
        exit = true
    }
}
`;
}
