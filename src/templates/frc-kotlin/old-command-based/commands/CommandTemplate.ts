export class OldCommandTemplate {
    text: string = `package #{PACKAGE}

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
`;
}
