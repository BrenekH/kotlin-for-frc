export class InstantCommandTemplate {
    text: string = `package #{PACKAGE}

import edu.wpi.first.wpilibj2.command.InstantCommand

// NOTE:  Consider using this command inline, rather than writing a subclass.  For more
// information, see:
// https://docs.wpilib.org/en/stable/docs/software/commandbased/convenience-features.html
class #{NAME} : InstantCommand() {
    // Called when the command is initially scheduled.
    override fun initialize() {
    }
}
`;
}
