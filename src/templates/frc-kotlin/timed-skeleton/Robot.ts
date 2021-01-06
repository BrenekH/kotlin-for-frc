export class TimedRobotSkeletonTemplate {
    text: string = `package frc.robot

import edu.wpi.first.wpilibj.TimedRobot

/**
 * The VM is configured to automatically run this class, and to call the
 * functions corresponding to each mode, as described in the TimedRobot
 * documentation. If you change the name of this class or the package after
 * creating this project, you must also update the build.gradle file in the
 * project.
 */
class Robot : TimedRobot() {
    /**
     * This function is run when the robot is first started up and should be used
     * for any initialization code.
     */
    override fun robotInit() {}

    override fun robotPeriodic() {}

    override fun autonomousInit() {}

    override fun autonomousPeriodic() {}

    override fun teleopInit() {}

    override fun teleopPeriodic() {}

    override fun disabledInit() {}

    override fun disabledPeriodic() {}

    override fun testInit() {}

    override fun testPeriodic() {}
}
`;
}
