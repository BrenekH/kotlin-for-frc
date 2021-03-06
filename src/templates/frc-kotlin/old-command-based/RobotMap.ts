export class OldCommandRobotMapTemplate {
    text: string = `package frc.robot

/**
 * The RobotMap is a mapping from the ports sensors and actuators are wired into
 * to a variable name. This provides flexibility changing wiring, makes checking
 * the wiring easier and significantly reduces the number of magic numbers
 * floating around.
 */
class RobotMap {
    companion object {
        // For example to map the left and right motors, you could define the
        // following variables to use with your drivetrain subsystem.
        // const val leftMotor = 1;
        // const val rightMotor = 2;

        // If you are using multiple modules, make sure to define both the port
        // number and the module. For example you with a rangefinder:
        // public static int rangefinderPort = 1;
        // public static int rangefinderModule = 1;
    }
}
`;
}
