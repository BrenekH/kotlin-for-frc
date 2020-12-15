export class RomiCommandDrivetrainSubsystemTemplate {
    text: string = `package frc.robot.subsystems

import edu.wpi.first.wpilibj.Encoder
import edu.wpi.first.wpilibj.Spark
import edu.wpi.first.wpilibj.drive.DifferentialDrive
import edu.wpi.first.wpilibj2.command.SubsystemBase
import frc.robot.Constants

class RomiDrivetrain : SubsystemBase() {
    // The Romi has the left and right motors set to
    // PWM channels 0 and 1 respectively
    private val leftMotor = Spark(Constants.Drivetrain.LEFT_MOTOR_CHANNEL)
    private val rightMotor = Spark(Constants.Drivetrain.RIGHT_MOTOR_CHANNEL)

    // The Romi has onboard encoders that are hardcoded
    // to use DIO pins 4/5 and 6/7 for the left and right
    private val leftEncoder = Encoder(Constants.Drivetrain.LEFT_ENCODER_A, Constants.Drivetrain.LEFT_ENCODER_B)
    private val rightEncoder = Encoder(Constants.Drivetrain.RIGHT_ENCODER_A, Constants.Drivetrain.RIGHT_ENCODER_B)

    // Set up the differential drive controller
    private val diffDrive = DifferentialDrive(leftMotor, rightMotor)

    companion object {
        private const val kCountsPerRevolution = 1440.0
        private const val kWheelDiameterInch = 2.75
    }

    /**
     * Creates a new RomiDrivetrain.
     */
    init {
        // DifferentialDrive defaults to having the right side flipped
        // We don't need to do this because the Romi has accounted for this
        // in firmware/hardware
        diffDrive.isRightSideInverted = false
        resetEncoders()
    }

    fun arcadeDrive(xAxisSpeed: Double, zAxisRotate: Double) = diffDrive.arcadeDrive(xAxisSpeed, zAxisRotate)

    fun resetEncoders() {
        leftEncoder.reset()
        rightEncoder.reset()
    }


    // The Kotlin getter pattern is used here so that the value updates every time the property is accessed
    val leftEncoderCount: Int
        get() = leftEncoder.get()
    val rightEncoderCount: Int
        get() = rightEncoder.get()
    val leftDistanceInch: Double
        get() = Math.PI * kWheelDiameterInch * (leftEncoderCount / kCountsPerRevolution)
    val rightDistanceInch: Double
        get() = Math.PI * kWheelDiameterInch * (rightEncoderCount / kCountsPerRevolution)

    override fun periodic() {
        // This method will be called once per scheduler run
    }

    override fun simulationPeriodic() {
        // This method will be called once per scheduler run during simulation
    }
}
`;
}
