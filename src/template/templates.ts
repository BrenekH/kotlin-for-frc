/*
 * This file was generated using gen_templates.ts.py from the templates directory.
 * Please do not change manually. Instead, modify the template files and then re-generate this file.
*/

export class TemplateStrings {
	PIDCommand = `package #{PACKAGE}

import edu.wpi.first.wpilibj.controller.PIDController
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

import edu.wpi.first.wpilibj.controller.PIDController
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
    id 'org.jetbrains.kotlin.jvm' version '1.4.21'
}

sourceCompatibility = JavaVersion.VERSION_11
targetCompatibility = JavaVersion.VERSION_11

def ROBOT_MAIN_CLASS = "frc.robot.Main"

// Define my targets (RoboRIO) and artifacts (deployable files)
// This is added by GradleRIO's backing project EmbeddedTools.
deploy {
    targets {
        roboRIO("roborio") {
            // Team number is loaded either from the .wpilib/wpilib_preferences.json
            // or from command line. If not found an exception will be thrown.
            // You can use getTeamOrDefault(team) instead of getTeamNumber if you
            // want to store a team number in this file.
            team = frc.getTeamNumber()
        }
    }
    artifacts {
        frcJavaArtifact('frcJava') {
            targets << "roborio"
            // Debug can be overridden by command line, for use with VSCode
            debug = frc.getDebugOrDefault(false)
        }
        // Built in artifact to deploy arbitrary files to the roboRIO.
        fileTreeArtifact('frcStaticFileDeploy') {
            // The directory below is the local directory to deploy
            files = fileTree(dir: 'src/main/deploy')
            // Deploy to RoboRIO target, into /home/lvuser/deploy
            targets << "roborio"
            directory = '/home/lvuser/deploy'
        }
    }
}

// Set this to true to enable desktop support.
def includeDesktopSupport = false

// Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
// Also defines JUnit 4.
dependencies {
    implementation wpi.deps.wpilib()
    nativeZip wpi.deps.wpilibJni(wpi.platforms.roborio)
    nativeDesktopZip wpi.deps.wpilibJni(wpi.platforms.desktop)


    implementation wpi.deps.vendor.java()
    nativeZip wpi.deps.vendor.jni(wpi.platforms.roborio)
    nativeDesktopZip wpi.deps.vendor.jni(wpi.platforms.desktop)

    testImplementation 'junit:junit:4.12'

    // Enable simulation gui support. Must check the box in vscode to enable support
    // upon debugging
    simulation wpi.deps.sim.gui(wpi.platforms.desktop, false)
    simulation wpi.deps.sim.driverstation(wpi.platforms.desktop, false)
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"

    // Websocket extensions require additional configuration.
    // simulation wpi.deps.sim.ws_server(wpi.platforms.desktop, false)
    // simulation wpi.deps.sim.ws_client(wpi.platforms.desktop, false)
}

// Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
// in order to make them all available at runtime. Also adding the manifest so WPILib
// knows where to look for our Robot Class.
jar {
    from { configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) } }
    manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
}
repositories {
    mavenCentral()
}
compileKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
compileTestKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
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
    private var autonomousCommand: Command?= null
    private var robotContainer: RobotContainer?= null

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
	oldCommand = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.Command
import frc.robot.Robot

class #{NAME} : Command() {
    init {
        // Use requires() here to declare subsystem dependencies
        requires(Robot.exampleSubsystem)
    }

    // Called just before this Command runs the first time
    override fun initialize() {}

    // Called repeatedly when this Command is scheduled to run
    override fun execute() {}

    // Make this return true when this Command no longer needs to run execute()
    override fun isFinished(): Boolean {
        return false
    }

    // Called once after isFinished returns true
    override fun end() {}

    // Called when another command which requires one or more of the same
    // subsystems is scheduled to run
    override fun interrupted() {}
}
`
	oldCommandGroup = `package frc.robot.commands

import edu.wpi.first.wpilibj.command.CommandGroup

class MyCommandGroup : CommandGroup() {
    init {
        // Add Commands here:
        // e.g. addSequential(Command1())
        // addSequential(Command2())
        // these will run in order.

        // To run multiple commands at the same time,
        // use addParallel()
        // e.g. addParallel(Command1())
        // addSequential(Command2())
        // Command1 and Command2 will run in parallel.

        // A command group will require all of the subsystems that each member
        // would require.
        // e.g. if Command1 requires chassis, and Command2 requires arm,
        // a CommandGroup containing them would require both the chassis and the
        // arm.
    }
}
`
	oldCommandRobot = `package frc.robot

import edu.wpi.first.wpilibj.TimedRobot
import edu.wpi.first.wpilibj.command.Command
import edu.wpi.first.wpilibj.command.Scheduler
import edu.wpi.first.wpilibj.smartdashboard.SendableChooser
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard
import frc.robot.commands.ExampleCommand
import frc.robot.subsystems.ExampleSubsystem

/**
 * The VM is configured to automatically run this class, and to call the
 * functions corresponding to each mode, as described in the TimedRobot
 * documentation. If you change the name of this class or the package after
 * creating this project, you must also update the build.gradle file in the
 * project.
 */
class Robot : TimedRobot() {
    var autonomousCommand: Command? = null
    var autonomousChooser = SendableChooser<Command>()

    companion object {
        @JvmField
        var exampleSubsystem = ExampleSubsystem()
        var oi: OI? = null
    }

    /**
     * This function is run when the robot is first started up and should be
     * used for any initialization code.
     */
    override fun robotInit() {
        oi = OI()
        autonomousChooser.setDefaultOption("Default Auto", ExampleCommand())
        // chooser.addOption("My Auto", MyAutoCommand())
        SmartDashboard.putData("Auto mode", autonomousChooser)
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
     * This function is called once each time the robot enters Disabled mode.
     * You can use it to reset any subsystem information you want to clear when
     * the robot is disabled.
     */
    override fun disabledInit() {}

    /**
     * This function is called periodically when disabled.
     */
    override fun disabledPeriodic() {
        Scheduler.getInstance().run()
    }

    /**
     * This autonomous (along with the chooser code above) shows how to select
     * between different autonomous modes using the dashboard. The sendable
     * chooser code works with the Java SmartDashboard. If you prefer the
     * LabVIEW Dashboard, remove all of the chooser code and uncomment the
     * getString code to get the auto name from the text box below the Gyro
     *
     *
     * You can add additional auto modes by adding additional commands to the
     * chooser code above (like the commented example) or additional comparisons
     * to the switch structure below with additional strings & commands.
     */
    override fun autonomousInit() {
        autonomousCommand = autonomousChooser.selected

        val autoSelected = SmartDashboard.getString("Auto Selector", "Default Auto");
        autonomousCommand = when(autoSelected) {
            /*
            "My Auto" -> MyAutoCommand()
            */
            "Default Auto" -> ExampleCommand()
            else -> ExampleCommand()
        }

        // Schedule the autonomous command (example)
        // Note the Kotlin safe-call(?.), this ensures autonomousCommand is not null before starting it
        autonomousCommand?.start()
    }

    /**
     * This function is called periodically during autonomous.
     */
    override fun autonomousPeriodic() {
        Scheduler.getInstance().run()
    }

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
    override fun teleopPeriodic() {
        Scheduler.getInstance().run()
    }

    /**
     * This function is called periodically during test mode.
     */
    override fun testPeriodic() {}
}
`
	oldInstantCommand = `package #{PACKAGE}
export class OldCommandInstantCommandTemplate {

import edu.wpi.first.wpilibj.command.InstantCommand

/**
 * Add your docs here.
 */
class #{NAME} : InstantCommand() {
    // Called once when the command executes
    override fun initialize() {}
}
`
	oldOI = `package frc.robot

/**
 * This class is the glue that binds the controls on the physical operator
 * interface to the commands and command groups that allow control of the robot.
 */
class OI {
    init {
        //// CREATING BUTTONS
        // One type of button is a joystick button which is any button on a
        //// joystick.
        // You create one by telling it which joystick it's on and which button
        // number it is.
        // stick: Joystick = Joystick(port)
        // button: Button = JoystickButton(stick, buttonNumber)

        // There are a few additional built in buttons you can use. Additionally,
        // by subclassing Button you can create custom triggers and bind those to
        // commands the same as any other Button.

        //// TRIGGERING COMMANDS WITH BUTTONS
        // Once you have a button, it's trivial to bind it to a button in one of
        // three ways:

        // Start the command when the button is pressed and let it run the command
        // until it is finished as determined by it's isFinished method.
        // button.whenPressed(ExampleCommand())

        // Run the command while the button is being held down and interrupt it once
        // the button is released.
        // button.whileHeld(ExampleCommand())

        // Start the command when the button is released and let it run the command
        // until it is finished as determined by it's isFinished method.
        // button.whenReleased(ExampleCommand())
    }
}
`
	oldPIDSubsystem = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.PIDSubsystem

/**
 * Add your docs here.
 */
class #{NAME} : PIDSubsystem("#{NAME}", 1.0, 2.0, 3.0) {
    public override fun initDefaultCommand() {
        // Set the default command for a subsystem here.
        // setDefaultCommand(MySpecialCommand())
    }

    override fun returnPIDInput(): Double {
        // Return your input value for the PID loop
        // e.g. a sensor, like a potentiometer:
        // yourPot.getAverageVoltage() / kYourMaxVoltage
        return 0.0
    }

    override fun usePIDOutput(output: Double) {
        // Use output to drive your system, like a motor
        // e.g. yourMotor.set(output)
    }
}
`
	oldRobotMap = `package frc.robot

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
`
	oldSubsystem = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.Subsystem

class #{NAME} : Subsystem() {
    // Put methods for controlling this subsystem
    // here. Call these from Commands.
    override fun initDefaultCommand() {
        // Set the default command for a subsystem here.
        // setDefaultCommand(MySpecialCommand())
    }
}
`
	oldTimedCommand = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.TimedCommand

/**
 * Add your docs here.
 *
 * @param timeout
 */
class #{NAME}(timeout: Double) : TimedCommand(timeout) {
    // Called just before this Command runs the first time
    override fun initialize() {}

    // Called repeatedly when this Command is scheduled to run
    override fun execute() {}

    // Called once after timeout
    override fun end() {}

    // Called when another command which requires one or more of the same
    // subsystems is scheduled to run
    override fun interrupted() {}
}
`
	oldTrigger = `package #{PACKAGE}

import edu.wpi.first.wpilibj.buttons.Trigger

/**
 * Add your docs here.
 */
class #{NAME} : Trigger() {
    override fun get(): Boolean {
        return false
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

import edu.wpi.first.wpilibj.controller.ProfiledPIDController
import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
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

import edu.wpi.first.wpilibj.controller.ProfiledPIDController
import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
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
    id 'org.jetbrains.kotlin.jvm' version '1.4.21'
}

sourceCompatibility = JavaVersion.VERSION_11
targetCompatibility = JavaVersion.VERSION_11

def ROBOT_MAIN_CLASS = "frc.robot.Main"

// Set this to true to enable desktop support.
def includeDesktopSupport = true

// Defining my dependencies. In this case, WPILib (+ friends), and vendor libraries.
// Also defines JUnit 4.
dependencies {
    implementation wpi.deps.wpilib()
    nativeDesktopZip wpi.deps.wpilibJni(wpi.platforms.desktop)


    implementation wpi.deps.vendor.java()
    nativeDesktopZip wpi.deps.vendor.jni(wpi.platforms.desktop)

    testImplementation 'junit:junit:4.12'

    // Enable simulation gui support. Must check the box in vscode to enable support
    // upon debugging
    simulation wpi.deps.sim.gui(wpi.platforms.desktop, false)
    simulation wpi.deps.sim.driverstation(wpi.platforms.desktop, false)

    // Websocket extensions require additional configuration.
    // simulation wpi.deps.sim.ws_server(wpi.platforms.desktop, false)
    simulation wpi.deps.sim.ws_client(wpi.platforms.desktop, false)
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8"
}

// Set the websocket remote host (the Romi IP address).
sim {
    envVar "HALSIMWS_HOST", "10.0.0.2"
}

// Setting up my Jar File. In this case, adding all libraries into the main jar ('fat jar')
// in order to make them all available at runtime. Also adding the manifest so WPILib
// knows where to look for our Robot Class.
jar {
    from { configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) } }
    manifest edu.wpi.first.gradlerio.GradleRIOPlugin.javaManifest(ROBOT_MAIN_CLASS)
}
repositories {
    mavenCentral()
}
compileKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
compileTestKotlin {
    kotlinOptions {
        jvmTarget = "1.8"
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
import edu.wpi.first.wpilibj.Spark
import edu.wpi.first.wpilibj.drive.DifferentialDrive
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
	romiTimedDrivetrain = `package frc.robot

import edu.wpi.first.wpilibj.Encoder
import edu.wpi.first.wpilibj.Spark
import edu.wpi.first.wpilibj.drive.DifferentialDrive

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
        // DifferentialDrive defaults to having the right side flipped
        // We don't need to do this because the Romi has accounted for this
        // in firmware/hardware
        diffDrive.isRightSideInverted = false
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

import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
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

import edu.wpi.first.wpilibj.trajectory.TrapezoidProfile
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
