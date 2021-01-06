export class ParallelDeadlineGroupTemplate {
    text: string = `package #{PACKAGE}

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
`;
}
