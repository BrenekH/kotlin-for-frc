/**
 * This file was generated using gen_templates.ts.py from the templates directory.
 * Please do not change manually. Instead, modify the template files and then re-generate this file.
 */

/**
 * TemplateStrings is an auto-generated class containing the raw values of the master
 * .kfftemplate files for use by the IntegratedTemplateProvider.
 */
export class TemplateStrings {
    PIDCommand = `package #{PACKAGE}

import edu.wpi.first.math.controller.PIDController
import edu.wpi.first.wpilibj2.command.PIDCommand
import java.util.function.DoubleConsumer
import java.util.function.DoubleSupplier

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : PIDCommand(
        // The controller that the command will use
        PIDController(0.0, 0.0, 0.0),
        // This should return the measurement
        DoubleSupplier { 0.0 },
        // This should return the setpoint (can also be a constant)
        DoubleSupplier { 0.0 },
        // This uses the output
        DoubleConsumer { output: Double -> {

        }}
    ) {

    // Returns true when the command should end.
    override fun isFinished(): Boolean {
        return false
    }
}
`
    PIDSubsystem = `package #{PACKAGE}

import edu.wpi.first.math.controller.PIDController
import edu.wpi.first.wpilibj2.command.PIDSubsystem

class #{NAME} : PIDSubsystem(
        // The PIDController used by the subsystem
        PIDController(0.0, 0.0, 0.0)
    ) {

    public override fun useOutput(output: Double, setpoint: Double) {
        // Use the output here
    }

    public override fun getMeasurement(): Double {
        // Return the process variable measurement here
        return 0.0
    }
}
`
    buildGradle = `import edu.wpi.first.gradlerio.deploy.roborio.RoboRIO

plugins {
    id "java"
    id "edu.wpi.first.GradleRIO" version "#{GRADLE_RIO_VERSION}"
    id "org.jetbrains.kotlin.jvm" version "1.6.10"
}

sourceCompatibility = JavaVersion.VERSION_11
targetCompatibility = JavaVersion.VERSION_11

def ROBOT_MAIN_CLASS = "frc.robot.Main"

// Define my targets (RoboRIO) and artifacts (deployable files)
// This is added by GradleRIO's backing project DeployUtils.
deploy {
    targets {
        roborio(getTargetTypeClass('RoboRIO')) {
            // Team number is loaded either from the .wpilib/wpilib_preferences.json
            // or from command line. If not found an exception will be thrown.
            // You can use getTeamOrDefault(team) instead of getTeamNumber if you
            // want to store a team number in this file.
            team = project.frc.getTeamNumber()
            debug = project.frc.getDebugOrDefault(false)

            artifacts {
                // First part is artifact name, 2nd is artifact type
                // getTargetTypeClass is a shortcut to get the class type using a string

                frcJava(getArtifactTypeClass('FRCJavaArtifact')) {
                }

                // Static files artifact
                frcStaticFileDeploy(getArtifactTypeClass('FileTreeArtifact')) {
                    files = project.fileTree('src/main/deploy')
                    directory = '/home/lvuser/deploy'
                }
            }
        }
    }
}

def deployArtifact = deploy.targets.roborio.artifacts.frcJava

// Set to true to use debug for JNI.
wpi.java.debugJni = false

// Set this to true to enable desktop support.
def includeDesktopSupport = false

// Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
// Also defines JUnit 4.
dependencies {
    implementation wpi.java.deps.wpilib()
    implementation wpi.java.vendor.java()

    roborioDebug wpi.java.deps.wpilibJniDebug(wpi.platforms.roborio)
    roborioDebug wpi.java.vendor.jniDebug(wpi.platforms.roborio)

    roborioRelease wpi.java.deps.wpilibJniRelease(wpi.platforms.roborio)
    roborioRelease wpi.java.vendor.jniRelease(wpi.platforms.roborio)

    nativeDebug wpi.java.deps.wpilibJniDebug(wpi.platforms.desktop)
    nativeDebug wpi.java.vendor.jniDebug(wpi.platforms.desktop)
    simulationDebug wpi.sim.enableDebug()

    nativeRelease wpi.java.deps.wpilibJniRelease(wpi.platforms.desktop)
    nativeRelease wpi.java.vendor.jniRelease(wpi.platforms.desktop)
    simulationRelease wpi.sim.enableRelease()

    testImplementation 'junit:junit:4.12'
    implementation "org.jetbrains.kotlin:kotlin-stdlib"
}

// Simulation configuration (e.g. environment variables).
wpi.sim.addGui().defaultEnabled = true
wpi.sim.addDriverstation()

// Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
// in order to make them all available at runtime. Also adding the manifest so WPILib
// knows where to look for our Robot Class.
jar {
    from { configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) } }
    manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
}

// Configure jar and deploy tasks
deployArtifact.jarTask = jar
wpi.java.configureExecutableTasks(jar)
wpi.java.configureTestTasks(test)

repositories {
    mavenCentral()
}

compileKotlin {
    kotlinOptions {
        jvmTarget = "11"
    }
}

compileTestKotlin {
    kotlinOptions {
        jvmTarget = "11"
    }
}
`
    command = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.CommandBase

class #{NAME} (): CommandBase() {
    /**
     * Creates a new #{NAME}.
     */
    init {
        // Use addRequirements() here to declare subsystem dependencies.
    }

    // Called when the command is initially scheduled.
    override fun initialize() { }

    // Called every time the scheduler runs while the command is scheduled.
    override fun execute() { }

    // Called once the command ends or is interrupted.
    override fun end(interrupted: Boolean) { }

    // Returns true when the command should end.
    override fun isFinished(): Boolean {
        return false
    }
}
`
    commandConstants = `package frc.robot

/**
 * The Constants class provides a convenient place for teams to hold robot-wide numerical or boolean
 * constants.  This class should not be used for any other purpose.  All constants should be
 * declared globally (i.e. inside the companion object).  Do not put anything functional in this class.
 *
 *
 * It is advised to statically import this class (or one of its inner classes) wherever the
 * constants are needed, to reduce verbosity.
 */
class Constants {
    companion object {
        // Put constant values inside the companion object to make them globally accessible.
        // ex. val motorPort: Int = 0
    }
}
`
    commandExampleCommand = `package frc.robot.commands

import edu.wpi.first.wpilibj2.command.CommandBase
import frc.robot.subsystems.ExampleSubsystem

/**
 * @property subsystem
 */
class ExampleCommand(private val subsystem: ExampleSubsystem) : CommandBase() {
    /**
     * Creates a new ExampleCommand.
     */
    init {
        // Use addRequirements() here to declare subsystem dependencies.
        addRequirements(subsystem)
    }

    // Called when the command is initially scheduled.
    override fun initialize() {}

    // Called every time the scheduler runs while the command is scheduled.
    override fun execute() {}

    // Called once the command ends or is interrupted.
    override fun end(interrupted: Boolean) {}

    // Returns true when the command should end.
    override fun isFinished(): Boolean {
        return false
    }
}
`
    commandRobot = `package frc.robot

import edu.wpi.first.wpilibj.TimedRobot
import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.CommandScheduler

/**
 * The VM is configured to automatically run this class, and to call the functions corresponding to
 * each mode, as described in the TimedRobot documentation. If you change the name of this class or
 * the package after creating this project, you must also update the build.gradle file in the
 * project.
 */
class Robot : TimedRobot() {
    private var autonomousCommand: Command? = null
    private var robotContainer: RobotContainer? = null

    /**
     * This function is run when the robot is first started up and should be used for any
     * initialization code.
     */
    override fun robotInit() {
        // Instantiate our RobotContainer.  This will perform all our button bindings, and put our
        // autonomous chooser on the dashboard.
        robotContainer = RobotContainer()
    }

    /**
     * This function is called every robot packet, no matter the mode. Use this for items like
     * diagnostics that you want ran during disabled, autonomous, teleoperated and test.
     *
     *
     * This runs after the mode specific periodic functions, but before
     * LiveWindow and SmartDashboard integrated updating.
     */
    override fun robotPeriodic() {
        // Runs the Scheduler.  This is responsible for polling buttons, adding newly-scheduled
        // commands, running already-scheduled commands, removing finished or interrupted commands,
        // and running subsystem periodic() methods.  This must be called from the robot's periodic
        // block in order for anything in the Command-based framework to work.
        CommandScheduler.getInstance().run()
    }

    /**
     * This function is called once each time the robot enters Disabled mode.
     */
    override fun disabledInit() { }

    /**
     * This function is called periodically when disabled.
     */
    override fun disabledPeriodic() { }

    /**
     * This autonomous runs the autonomous command selected by your [RobotContainer] class.
     */
    override fun autonomousInit() {
        autonomousCommand = robotContainer?.autonomousCommand

        // Schedule the autonomous command (example)
        // Note the Kotlin safe-call(?.), this ensures autonomousCommand is not null before scheduling it
        autonomousCommand?.schedule()
    }

    /**
     * This function is called periodically during autonomous.
     */
    override fun autonomousPeriodic() { }

    /**
     * This function is called once when teleop is enabled.
     */
    override fun teleopInit() {
        // This makes sure that the autonomous stops running when
        // teleop starts running. If you want the autonomous to
        // continue until interrupted by another command, remove
        // this line or comment it out.
        // Note the Kotlin safe-call(?.), this ensures autonomousCommand is not null before cancelling it
        autonomousCommand?.cancel()
    }

    /**
     * This function is called periodically during operator control.
     */
    override fun teleopPeriodic() { }

    /**
     * This function is called once when test mode is enabled.
     */
    override fun testInit() {
        // Cancels all running commands at the start of test mode.
        CommandScheduler.getInstance().cancelAll()
    }

    /**
     * This function is called periodically during test mode.
     */
    override fun testPeriodic() { }
}
`
    emptyClass = `package #{PACKAGE}

/**
 * Add your docs here.
 */
class #{NAME} {
}
`
    instantCommand = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.InstantCommand

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : InstantCommand() {
    // Called when the command is initially scheduled.
    override fun initialize() {
    }
}
`
    main = `package frc.robot

import edu.wpi.first.wpilibj.RobotBase

/**
 * Do NOT add any static variables to this class, or any initialization at all.
 * Unless you know what you are doing, do not modify this file except to
 * change the parameter class to the startRobot call.
 */
object Main {
    /**
     * Main initialization function. Do not perform any initialization here.
     *
     *
     * If you change your main robot class, change the parameter type.
     */
    @JvmStatic
    fun main(args: Array<String>) {
        RobotBase.startRobot { Robot() }
    }
}
`
    parallelCommandGroup = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.ParallelCommandGroup

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : ParallelCommandGroup() {
    /**
     * Creates a new #{NAME}.
     */
    init {
        // Add your commands in the addCommands() call, e.g.
        // addCommands(FooCommand(), BarCommand())
        addCommands()
    }
}
`
    parallelDeadlineGroup = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.InstantCommand
import edu.wpi.first.wpilibj2.command.ParallelDeadlineGroup

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : ParallelDeadlineGroup(InstantCommand()) {
    // Add the deadline to the Parent constructor. example: ParallelDeadlineGroup(MyDeadlineCommand())

    init {
        // Add other commands using addCommands
        // addCommands(FooCommand(), BarCommand())
    }
}
`
    parallelRaceGroup = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.ParallelRaceGroup

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : ParallelRaceGroup() {
    /**
     * Creates a new #{NAME}.
     */
    init {
        // Add your commands in the addCommands() call, e.g.
        // addCommands(FooCommand(), BarCommand())
        addCommands()
    }
}
`
    profiledPIDCommand = `package #{PACKAGE}

import edu.wpi.first.math.controller.ProfiledPIDController
import edu.wpi.first.math.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.ProfiledPIDCommand
import java.util.function.BiConsumer
import java.util.function.DoubleSupplier
import java.util.function.Supplier

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : ProfiledPIDCommand(
        // The ProfiledPIDController used by the command
        ProfiledPIDController(
                // The PID gains
                0.0, 0.0, 0.0,
                // The motion profile constraints
                TrapezoidProfile.Constraints(0.0, 0.0)),
        // This should return the measurement
        DoubleSupplier { 0.0 },
        // This should return the goal (can also be a constant)
        Supplier { TrapezoidProfile.State() },
        // This uses the output
        BiConsumer { output: Double?, setpoint: TrapezoidProfile.State? -> {

        }}
    ) {

    // Returns true when the command should end.
    override fun isFinished(): Boolean {
        return false
    }
}
`
    profiledPIDSubsystem = `package #{PACKAGE}

import edu.wpi.first.math.controller.ProfiledPIDController
import edu.wpi.first.math.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.ProfiledPIDSubsystem

class #{NAME} : ProfiledPIDSubsystem(
        // The ProfiledPIDController used by the subsystem
        ProfiledPIDController(0.0, 0.0, 0.0,

        // The motion profile constraints
        TrapezoidProfile.Constraints(0.0, 0.0))
    ) {

    public override fun useOutput(output: Double, setpoint: TrapezoidProfile.State) {
        // Use the output (and optionally the setpoint) here
    }

    public override fun getMeasurement(): Double {
        // Return the process variable measurement here
        return 0.0
    }
}
`
    robotBaseRobot = `package frc.robot

import edu.wpi.first.hal.HAL
import edu.wpi.first.wpilibj.RobotBase
import edu.wpi.first.wpilibj.livewindow.LiveWindow
import edu.wpi.first.wpilibj.shuffleboard.Shuffleboard
import edu.wpi.first.wpilibj.DriverStation

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
                    DriverStation.inDisabled(true)
                    disabled()
                    DriverStation.inDisabled(false)
                    while (isDisabled) {
                        DriverStation.waitForData()
                    }
                }
                isAutonomous -> {
                    DriverStation.inAutonomous(true)
                    autonomous()
                    DriverStation.inAutonomous(false)
                    while (isAutonomousEnabled) {
                        DriverStation.waitForData()
                    }
                }
                isTest -> {
                    LiveWindow.setEnabled(true)
                    Shuffleboard.enableActuatorWidgets()
                    DriverStation.inTest(true)
                    test()
                    DriverStation.inTest(false)
                    while (isTest && isEnabled) {
                        DriverStation.waitForData()
                    }
                    LiveWindow.setEnabled(false)
                    Shuffleboard.disableActuatorWidgets()
                }
                else -> {
                    DriverStation.inTeleop(true)
                    teleop()
                    DriverStation.inTeleop(false)
                    while (isTeleopEnabled()) {
                        DriverStation.waitForData()
                    }
                }
            }
        }
    }

    override fun endCompetition() {
        exit = true
    }
}
`
    robotContainer = `package frc.robot

import edu.wpi.first.wpilibj2.command.Command
import frc.robot.commands.ExampleCommand
import frc.robot.subsystems.ExampleSubsystem

/**
 * This class is where the bulk of the robot should be declared.  Since Command-based is a
 * "declarative" paradigm, very little robot logic should actually be handled in the [Robot]
 * periodic methods (other than the scheduler calls).  Instead, the structure of the robot
 * (including subsystems, commands, and button mappings) should be declared here.
 */
class RobotContainer {
    // The robot's subsystems and commands are defined here...
    private val exampleSubsystem = ExampleSubsystem()
    private val autoCommand = ExampleCommand(exampleSubsystem)

    /**
     * The container for the robot.  Contains subsystems, OI devices, and commands.
     */
    init {
        // Configure the button bindings
        configureButtonBindings()
    }

    /**
     * Use this method to define your button->command mappings.  Buttons can be created by
     * instantiating a [GenericHID] or one of its subclasses ([ ] or [XboxController]), and then passing it to a
     * [edu.wpi.first.wpilibj2.command.button.JoystickButton].
     */
    private fun configureButtonBindings() {}

    /**
     * Use this to pass the autonomous command to the main [Robot] class.
     *
     * @return the command to run in autonomous
     */
    val autonomousCommand: Command
        get() {
            // An ExampleCommand will run in autonomous
            return autoCommand
        }
}
`
    romiBuildGradle = `plugins {
    id "java"
    id "edu.wpi.first.GradleRIO" version "#{GRADLE_RIO_VERSION}"
    id "org.jetbrains.kotlin.jvm" version "1.6.10"
}

sourceCompatibility = JavaVersion.VERSION_11
targetCompatibility = JavaVersion.VERSION_11

def ROBOT_MAIN_CLASS = "frc.robot.Main"

// Set this to true to enable desktop support.
def includeDesktopSupport = true

// Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
// Also defines JUnit 4.
dependencies {
    implementation wpi.java.deps.wpilib()
    implementation wpi.java.vendor.java()

    nativeDebug wpi.java.deps.wpilibJniDebug(wpi.platforms.desktop)
    nativeDebug wpi.java.vendor.jniDebug(wpi.platforms.desktop)
    simulationDebug wpi.sim.enableDebug()

    nativeRelease wpi.java.deps.wpilibJniRelease(wpi.platforms.desktop)
    nativeRelease wpi.java.vendor.jniRelease(wpi.platforms.desktop)
    simulationRelease wpi.sim.enableRelease()

    testImplementation 'junit:junit:4.12'
    implementation "org.jetbrains.kotlin:kotlin-stdlib"
}

// Simulation configuration (e.g. environment variables).
wpi.sim.addGui().defaultEnabled = true
wpi.sim.addDriverstation()

//Sets the websocket client remote host.
wpi.sim.envVar("HALSIMWS_HOST", "10.0.0.2")
wpi.sim.addWebsocketsServer().defaultEnabled = true
wpi.sim.addWebsocketsClient().defaultEnabled = true

// Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
// in order to make them all available at runtime. Also adding the manifest so WPILib
// knows where to look for our Robot Class.
jar {
    from { configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) } }
    manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
}

wpi.java.configureExecutableTasks(jar)
wpi.java.configureTestTasks(test)

repositories {
    mavenCentral()
}

compileKotlin {
    kotlinOptions {
        jvmTarget = "11"
    }
}

compileTestKotlin {
    kotlinOptions {
        jvmTarget = "11"
    }
}
`
    romiCommandConstants = `package frc.robot

/**
 * The Constants class provides a convenient place for teams to hold robot-wide numerical or boolean
 * constants.  This class should not be used for any other purpose.  All constants should be
 * declared globally (i.e. inside the companion object).  Do not put anything functional in this class.
 *
 *
 * It is advised to statically import this class (or one of its inner classes) wherever the
 * constants are needed, to reduce verbosity.
 */
class Constants {
    companion object {
        // Put constant values inside the companion object to make them globally accessible.
        // ex. val motorPort: Int = 0
    }

    class Drivetrain {
        companion object {
            // The Romi has the left and right motors set to
            // PWM channels 0 and 1 respectively
            const val LEFT_MOTOR_CHANNEL = 0
            const val RIGHT_MOTOR_CHANNEL = 1

            // The Romi has onboard encoders that are hardcoded
            // to use DIO pins 4/5 and 6/7 for the left and right
            const val LEFT_ENCODER_A = 4
            const val LEFT_ENCODER_B = 5
            const val RIGHT_ENCODER_A = 6
            const val RIGHT_ENCODER_B = 7
        }
    }
}
`
    romiCommandDrivetrainSubsystem = `package frc.robot.subsystems

import edu.wpi.first.wpilibj.Encoder
import edu.wpi.first.wpilibj.drive.DifferentialDrive
import edu.wpi.first.wpilibj.motorcontrol.Spark
import edu.wpi.first.wpilibj2.command.SubsystemBase
import frc.robot.Constants

class RomiDrivetrain : SubsystemBase() {
    private val leftMotor = Spark(Constants.Drivetrain.LEFT_MOTOR_CHANNEL)
    private val rightMotor = Spark(Constants.Drivetrain.RIGHT_MOTOR_CHANNEL)

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
        leftEncoder.distancePerPulse = (Math.PI * kWheelDiameterInch) / kCountsPerRevolution
        rightEncoder.distancePerPulse = (Math.PI * kWheelDiameterInch) / kCountsPerRevolution
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
`
    romiCommandExampleCommand = `package frc.robot.commands

import edu.wpi.first.wpilibj2.command.CommandBase
import frc.robot.subsystems.RomiDrivetrain

/**
 * An example command that uses an example subsystem.
 *
 * @property subsystem
 */
class ExampleCommand(private val subsystem: RomiDrivetrain) : CommandBase() {
    init {
        // Use addRequirements() here to declare subsystem dependencies.
        addRequirements(subsystem)
    }

    // Called when the command is initially scheduled.
    override fun initialize() {}

    // Called every time the scheduler runs while the command is scheduled.
    override fun execute() {}

    // Called once the command ends or is interrupted.
    override fun end(interrupted: Boolean) {}

    // Returns true when the command should end.
    override fun isFinished(): Boolean {
        return false
    }
}
`
    romiCommandRobotContainer = `package frc.robot

import edu.wpi.first.wpilibj2.command.Command
import frc.robot.commands.ExampleCommand
import frc.robot.subsystems.RomiDrivetrain

/**
 * This class is where the bulk of the robot should be declared.  Since Command-based is a
 * "declarative" paradigm, very little robot logic should actually be handled in the [Robot]
 * periodic methods (other than the scheduler calls).  Instead, the structure of the robot
 * (including subsystems, commands, and button mappings) should be declared here.
 */
class RobotContainer {
    // The robot's subsystems and commands are defined here...
    private val romiDrivetrain = RomiDrivetrain()
    private val autoCommand = ExampleCommand(romiDrivetrain)

    /**
     * The container for the robot.  Contains subsystems, OI devices, and commands.
     */
    init {
        // Configure the button bindings
        configureButtonBindings()
    }

    /**
     * Use this method to define your button->command mappings.  Buttons can be created by
     * instantiating a [edu.wpi.first.wpilibj.GenericHID] or one of its subclasses ([edu.wpi.first.wpilibj.Joystick] or [XboxController]), and then passing it to a
     * [edu.wpi.first.wpilibj2.command.button.JoystickButton].
     */
    private fun configureButtonBindings() {}

    /**
     * Use this to pass the autonomous command to the main [Robot] class.
     *
     * @return the command to run in autonomous
     */
    val autonomousCommand: Command
        get() {
            // An ExampleCommand will run in autonomous
            return autoCommand
        }
}
`
    romiTimedDrivetrain = `package frc.robot

import edu.wpi.first.wpilibj.Encoder
import edu.wpi.first.wpilibj.drive.DifferentialDrive
import edu.wpi.first.wpilibj.motorcontrol.Spark

class RomiDrivetrain {
    // The Romi has the left and right motors set to
    // PWM channels 0 and 1 respectively
    private val leftMotor = Spark(0)
    private val rightMotor = Spark(1)

    // The Romi has onboard encoders that are hardcoded
    // to use DIO pins 4/5 and 6/7 for the left and right
    private val leftEncoder = Encoder(4, 5)
    private val rightEncoder = Encoder(6, 7)

    // Set up the differential drive controller
    private val diffDrive = DifferentialDrive(leftMotor, rightMotor)

    companion object {
        private const val COUNTS_PER_REVOLUTION = 1440.0
        private const val WHEEL_DIAMETER_INCH = 2.75
    }

    /**
     * Creates a new RomiDrivetrain.
     */
    init {
        leftEncoder.distancePerPulse = (Math.PI * WHEEL_DIAMETER_INCH) / COUNTS_PER_REVOLUTION
        rightEncoder.distancePerPulse = (Math.PI * WHEEL_DIAMETER_INCH) / COUNTS_PER_REVOLUTION
        resetEncoders()
    }

    fun arcadeDrive(xaxisSpeed: Double, zaxisRotate: Double) {
        diffDrive.arcadeDrive(xaxisSpeed, zaxisRotate)
    }

    fun resetEncoders() {
        leftEncoder.reset()
        rightEncoder.reset()
    }

    // The Kotlin getter pattern is used here so that the value updates everytime the property is accessed
    val leftEncoderCount: Int
        get() = leftEncoder.get()
    val rightEncoderCount: Int
        get() = rightEncoder.get()
    val leftDistanceInch: Double
        get() = Math.PI * WHEEL_DIAMETER_INCH * (leftEncoderCount / COUNTS_PER_REVOLUTION)
    val rightDistanceInch: Double
        get() = Math.PI * WHEEL_DIAMETER_INCH * (rightEncoderCount / COUNTS_PER_REVOLUTION)
}
`
    romiTimedRobot = `package frc.robot

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
    private val drivetrain = RomiDrivetrain()

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
     * This function is called every robot packet, no matter the mode. Use
     * this for items like diagnostics that you want ran during disabled,
     * autonomous, teleoperated and test.
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
        // m_autoSelected = SmartDashboard.getString("Auto Selector", kDefaultAuto);
        println("Auto selected: $selectedAutonomous")
        drivetrain.resetEncoders()
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
}
`
    sequentialCommandGroup = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.SequentialCommandGroup

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : SequentialCommandGroup() {
    /**
     * Creates a new #{NAME}.
     */
    init {
        // Add your commands in the addCommands() call, e.g.
        // addCommands(FooCommand(), BarCommand())
        addCommands()
    }
}
`
    subsystem = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.SubsystemBase

class #{NAME} : SubsystemBase() {
    override fun periodic() {
        // This method will be called once per scheduler run
    }

    override fun simulationPeriodic() {
        // This method will be called once per scheduler run during simulation
    }
}
`
    timedRobot = `package frc.robot

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
     * This function is called every robot packet, no matter the mode. Use
     * this for items like diagnostics that you want ran during disabled,
     * autonomous, teleoperated and test.
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
}
`
    timedSkeletonRobot = `package frc.robot

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
`
    trapezoidProfileCommand = `package #{PACKAGE}

import edu.wpi.first.math.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.TrapezoidProfileCommand
import java.util.function.Consumer

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : TrapezoidProfileCommand(
        // The motion profile to be executed
        TrapezoidProfile(
                // The motion profile constraints
                TrapezoidProfile.Constraints(0.0, 0.0),
                // Goal state
                TrapezoidProfile.State(),
                // Initial state
                TrapezoidProfile.State()),
        Consumer { state: TrapezoidProfile.State? -> {

        }}
    )
`
    trapezoidProfileSubsystem = `package #{PACKAGE}

import edu.wpi.first.math.trajectory.TrapezoidProfile
import edu.wpi.first.wpilibj2.command.TrapezoidProfileSubsystem

class #{NAME} : TrapezoidProfileSubsystem(
        // The constraints for the generated profiles
        TrapezoidProfile.Constraints(0.0, 0.0),
        // Initial position
        0.0
    ) {

    override fun useState(state: TrapezoidProfile.State) {
        // Use the computed profile state here.
    }
}
`
}
