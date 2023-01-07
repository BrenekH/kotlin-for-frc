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
    private var selectedAutonomous: String? = null
    private val autonomousChooser = SendableChooser<String>()

    companion object {
        private const val DEFAULT_AUTO = "Default"
        private const val CUSTOM_AUTO = "My Auto"
    }

    /**
     * This function is run when the robot is first started up and should be
     * used for any initialization code.
     */
    override fun robotInit() {
        autonomousChooser.setDefaultOption("Default Auto", DEFAULT_AUTO)
        autonomousChooser.addOption("My Auto", CUSTOM_AUTO)
        SmartDashboard.putData("Auto choices", autonomousChooser)
    }

    /**
     * This function is called every 20 ms, no matter the mode. Use this for
     * items like diagnostics that you want ran during disabled, autonomous,
     * teleoperated and test.
     *
     *
     * This runs after the mode specific periodic functions, but before
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
     *
     * You can add additional auto modes by adding additional comparisons to
     * the switch structure below with additional strings. If using the
     * SendableChooser make sure to add them to the chooser code above as well.
     */
    override fun autonomousInit() {
        selectedAutonomous = autonomousChooser.selected
        // autoSelected = SmartDashboard.getString("Auto Selector", kDefaultAuto)
        println("Auto selected: $selectedAutonomous")
    }

    /**
     * This function is called periodically during autonomous.
     */
    override fun autonomousPeriodic() {
        when (selectedAutonomous) {
            CUSTOM_AUTO -> {
            }
            DEFAULT_AUTO -> {
            }
            else -> {
            }
        }
    }

    /**
     * This function is called once when teleop is enabled.
     */
    override fun teleopInit() {}

    /**
     * This function is called periodically during operator control.
     */
    override fun teleopPeriodic() {}

    /**
     * This function is called once when the robot is disabled.
     */
    override fun disabledInit() {}

    /**
     * This function is called periodically when disabled.
     */
    override fun disabledPeriodic() {}

    /**
     * This function is called once when test mode is enabled.
     */
    override fun testInit() {}

    /**
     * This function is called periodically during test mode.
     */
    override fun testPeriodic() {}

    /** This function is called once when the robot is first started up. */
    override fun simulationInit() {}

    /** This function is called periodically whilst in simulation. */
    override fun simulationPeriodic() {}
}
