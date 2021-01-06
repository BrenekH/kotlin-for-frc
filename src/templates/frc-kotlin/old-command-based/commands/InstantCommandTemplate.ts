export class OldCommandInstantCommandTemplate {
    text: string = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.InstantCommand

/**
 * Add your docs here.
 */
class #{NAME} : InstantCommand() {
    // Called once when the command executes
    override fun initialize() {}
}
`;
}
