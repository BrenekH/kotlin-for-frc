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
    buildGradle = `plugins {
    id "java"
    id "edu.wpi.first.GradleRIO" version "#{GRADLE_RIO_VERSION}"
    id "org.jetbrains.kotlin.jvm" version '1.8.0'
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
// Also defines JUnit 5.
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

    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.4.2'
    testImplementation 'org.junit.jupiter:junit-jupiter-params:5.4.2'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.4.2'
    implementation "org.jetbrains.kotlin:kotlin-stdlib"
}

test {
    useJUnitPlatform()
    systemProperty 'junit.jupiter.extensions.autodetection.enabled', 'true'
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

// Configure string concat to always inline compile
tasks.withType(JavaCompile) {
    options.compilerArgs.add '-XDstringConcat=inline'
}
repositories {
    mavenCentral()
}

compileKotlin {
    kotlinOptions {
        jvmTarget = targetCompatibility
    }
}

compileTestKotlin {
    kotlinOptions {
        jvmTarget = targetCompatibility
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
 * constants. This class should not be used for any other purpose. All constants should be declared
 * globally (i.e. inside the companion object). Do not put anything functional in this class.
 *
 *
 * It is advised to statically import this class (or one of its inner classes) wherever the
 * constants are needed, to reduce verbosity.
 */
class Constants {
    object OperatorConstants {
        const val kDriverControllerPort = 0
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
     * This function is called every 20 ms, no matter the mode. Use this for items like diagnostics
     * that you want ran during disabled, autonomous, teleoperated and test.
     *
     *
     * This runs after the mode specific periodic functions, but before LiveWindow and
     * SmartDashboard integrated updating.
     */
    override fun robotPeriodic() {
        // Runs the Scheduler.  This is responsible for polling buttons, adding newly-scheduled
        // commands, running already-scheduled commands, removing finished or interrupted commands,
        // and running subsystem periodic() methods.  This must be called from the robot's periodic
        // block in order for anything in the Command-based framework to work.
        CommandScheduler.getInstance().run()
    }

    /** This function is called once each time the robot enters Disabled mode.  */
    override fun disabledInit() {}

    /** This function is called periodically when disabled.  */
    override fun disabledPeriodic() {}

    /** This autonomous runs the autonomous command selected by your [RobotContainer] class.  */
    override fun autonomousInit() {
        autonomousCommand = robotContainer?.autonomousCommand

        // Schedule the autonomous command (example)
        // Note the Kotlin safe-call(?.), this ensures autonomousCommand is not null before scheduling it
        autonomousCommand?.schedule()
    }

    /** This function is called periodically during autonomous.  */
    override fun autonomousPeriodic() {}

    /** This function is called once when teleop is enabled.  */
    override fun teleopInit() {
        // This makes sure that the autonomous stops running when
        // teleop starts running. If you want the autonomous to
        // continue until interrupted by another command, remove
        // this line or comment it out.
        // Note the Kotlin safe-call(?.), this ensures autonomousCommand is not null before cancelling it
        autonomousCommand?.cancel()
    }

    /** This function is called periodically during operator control.  */
    override fun teleopPeriodic() {}

    /** This function is called once when test mode is enabled.  */
    override fun testInit() {
        // Cancels all running commands at the start of test mode.
        CommandScheduler.getInstance().cancelAll()
    }

    /** This function is called periodically during test mode.  */
    override fun testPeriodic() {}

    /** This function is called once when the robot is first started up.  */
    override fun simulationInit() {}

    /** This function is called periodically whilst in simulation.  */
    override fun simulationPeriodic() {}
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

import edu.wpi.first.hal.DriverStationJNI
import edu.wpi.first.util.WPIUtilJNI
import edu.wpi.first.wpilibj.DriverStation
import edu.wpi.first.wpilibj.RobotBase
import edu.wpi.first.wpilibj.internal.DriverStationModeThread

/**
 * The VM is configured to automatically run this class. If you change the name of this class or the
 * package after creating this project, you must also update the build.gradle file in the project.
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

        val modeThread = DriverStationModeThread()
        val event = WPIUtilJNI.createEvent(false, false)
        DriverStation.provideRefreshedDataEventHandle(event)

        // Tell the DS that the robot is ready to be enabled
        DriverStationJNI.observeUserProgramStarting()

        while (!Thread.currentThread().isInterrupted && !exit) {
            when (true) {
                isDisabled -> {
                    modeThread.inDisabled(true)
                    disabled()
                    modeThread.inDisabled(false)
                    while (isDisabled) {
                        try {
                            WPIUtilJNI.waitForObject(event)
                        } catch (e: InterruptedException) {
                            Thread.currentThread().interrupt()
                        }
                    }
                }
                isAutonomous -> {
                    modeThread.inAutonomous(true)
                    autonomous()
                    modeThread.inAutonomous(false)
                    while (isAutonomousEnabled) {
                        try {
                            WPIUtilJNI.waitForObject(event)
                        } catch (e: InterruptedException) {
                            Thread.currentThread().interrupt()
                        }
                    }
                }
                isTest -> {
                    modeThread.inTest(true)
                    test()
                    modeThread.inTest(false)
                    while (isTest && isEnabled) {
                        try {
                            WPIUtilJNI.waitForObject(event)
                        } catch (e: InterruptedException) {
                            Thread.currentThread().interrupt()
                        }
                    }
                }
                else -> {
                    modeThread.inTeleop(true)
                    teleop()
                    modeThread.inTeleop(false)
                    while (isTeleopEnabled) {
                        try {
                            WPIUtilJNI.waitForObject(event)
                        } catch (e: InterruptedException) {
                            Thread.currentThread().interrupt()
                        }
                    }
                }
            }
        }

        DriverStation.removeRefreshedDataEventHandle(event)
        modeThread.close()
    }

    override fun endCompetition() {
        exit = true
    }
}
`
    robotContainer = `package frc.robot

import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.button.CommandXboxController
import edu.wpi.first.wpilibj2.command.button.Trigger
import frc.robot.commands.Autos
import frc.robot.commands.ExampleCommand
import frc.robot.subsystems.ExampleSubsystem

/**
 * This class is where the bulk of the robot should be declared. Since Command-based is a
 * "declarative" paradigm, very little robot logic should actually be handled in the [Robot]
 * periodic methods (other than the scheduler calls). Instead, the structure of the robot (including
 * subsystems, commands, and trigger mappings) should be declared here.
 */
class RobotContainer {
    // The robot's subsystems and commands are defined here...
    private val exampleSubsystem = ExampleSubsystem()

    // Replace with CommandPS4Controller or CommandJoystick if needed
    private val driverController = CommandXboxController(Constants.OperatorConstants.kDriverControllerPort)

    /** The container for the robot. Contains subsystems, OI devices, and commands.  */
    init {
        // Configure the trigger bindings
        configureBindings()
    }

    /**
     * Use this method to define your trigger->command mappings. Triggers can be created via the
     * [Trigger#Trigger(java.util.function.BooleanSupplier)] constructor with an arbitrary
     * predicate, or via the named factories in [edu.wpi.first.wpilibj2.command.button.CommandGenericHID]'s subclasses for
     * [CommandXboxController]/[edu.wpi.first.wpilibj2.command.button.CommandPS4Controller] controllers
     * or [edu.wpi.first.wpilibj2.command.button.CommandJoystick].
     */
    private fun configureBindings() {
        // Schedule ExampleCommand when exampleCondition changes to true
        Trigger { exampleSubsystem.exampleCondition() }.onTrue(ExampleCommand(exampleSubsystem))

        // Schedule exampleMethodCommand when the Xbox controller's B button is pressed,
        // cancelling on release.
        driverController.b().whileTrue(exampleSubsystem.exampleMethodCommand())
    }

    /**
     * Use this to pass the autonomous command to the main [Robot] class.
     *
     * @return the command to run in autonomous
     */
    val autonomousCommand: Command
        get() {
            // An example command will be run in autonomous
            return Autos.exampleAuto(exampleSubsystem)
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
    main = `package frc.robot

import edu.wpi.first.hal.FRCNetComm
import edu.wpi.first.hal.HAL
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
        RobotBase.startRobot {
            HAL.report(FRCNetComm.tResourceType.kResourceType_Language, FRCNetComm.tInstances.kLanguage_Kotlin)
            Robot()
        }
    }
}
`
    commandAutos = `package frc.robot.commands

import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.Commands
import frc.robot.subsystems.ExampleSubsystem

class Autos private constructor() {
    init {
        throw UnsupportedOperationException("This is a utility class!")
    }

    companion object {
        /** Example static factory for an autonomous command.  */
        fun exampleAuto(subsystem: ExampleSubsystem): Command {
            return Commands.sequence(subsystem.exampleMethodCommand(), ExampleCommand(subsystem))
        }
    }
}
`
    commandExampleCommand = `package frc.robot.commands

import edu.wpi.first.wpilibj2.command.Command
import frc.robot.subsystems.ExampleSubsystem

/** An example command that uses an example subsystem.  */
class ExampleCommand(subsystem: ExampleSubsystem) : Command() {
    init {
        // Use addRequirements() here to declare subsystem dependencies.
        addRequirements(subsystem)
    }

    /** Called when the command is initially scheduled.  */
    override fun initialize() {}

    /** Called every time the scheduler runs while the command is scheduled.  */
    override fun execute() {}

    /** Called once the command ends or is interrupted.  */
    override fun end(interrupted: Boolean) {}

    /** Returns true when the command should end.  */
    override fun isFinished(): Boolean {
        return false
    }
}
`
    commandSkeletonRobotContainer = `package frc.robot

import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.Commands

class RobotContainer {
    init {
        configureBindings()
    }

    private fun configureBindings() {}

    val autonomousCommand: Command
        get() = Commands.print("No autonomous command configured")
}
`
    exampleSubsystem = `package frc.robot.subsystems

import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.SubsystemBase

/** Creates a new ExampleSubsystem.  */
class ExampleSubsystem : SubsystemBase() {
    /**
     * Example command factory method.
     *
     * @return a command
     */
    fun exampleMethodCommand(): Command {
        // Inline construction of command goes here.
        // runOnce implicitly requires this subsystem.
        return runOnce {}
    }

    /**
     * An example method querying a boolean state of the subsystem (for example, a digital sensor).
     *
     * @return value of some boolean subsystem state, such as a digital sensor.
     */
    fun exampleCondition(): Boolean {
        // Query some boolean state, such as a digital sensor.
        return false
    }

    /** This method will be called once per scheduler run  */
    override fun periodic() {
    }

    /** This method will be called once per scheduler run during simulation  */
    override fun simulationPeriodic() {
    }
}
`
    romiCommandExampleCommand = `package frc.robot.commands

import edu.wpi.first.wpilibj2.command.Command
import frc.robot.subsystems.RomiDrivetrain

/**
 * An example command that uses an example subsystem.
 *
 * @property subsystem
 */
class ExampleCommand(private val subsystem: RomiDrivetrain) : Command() {
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
    commandSkeletonRobot = `package frc.robot

import edu.wpi.first.wpilibj2.command.Command
import edu.wpi.first.wpilibj2.command.CommandScheduler
import edu.wpi.first.wpilibj.TimedRobot

class Robot : TimedRobot() {
    private var autonomousCommand: Command? = null
    private var robotContainer: RobotContainer? = null

    override fun robotInit() {
        robotContainer = RobotContainer()
    }

    override fun robotPeriodic() {
        CommandScheduler.getInstance().run()
    }

    override fun disabledInit() {}

    override fun disabledPeriodic() {}

    override fun disabledExit() {}

    override fun autonomousInit() {
        autonomousCommand = robotContainer?.autonomousCommand

        autonomousCommand?.schedule()
    }

    override fun autonomousPeriodic() {}

    override fun autonomousExit() {}

    override fun teleopInit() {
        autonomousCommand?.cancel()
    }

    override fun teleopPeriodic() {}

    override fun teleopExit() {}

    override fun testInit() {
        CommandScheduler.getInstance().cancelAll()
    }

    override fun testPeriodic() {}

    override fun testExit() {}
}
`
}
