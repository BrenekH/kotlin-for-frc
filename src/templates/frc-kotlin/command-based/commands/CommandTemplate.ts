export class CommandTemplate {
    text: string = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.CommandBase
import frc.robot.subsystems.ExampleSubsystem

/**
 * @property subsystem
 */
class #{NAME}(private val subsystem: ExampleSubsystem) : CommandBase() {
    /**
     * Creates a new #{NAME}.
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
`;
}
