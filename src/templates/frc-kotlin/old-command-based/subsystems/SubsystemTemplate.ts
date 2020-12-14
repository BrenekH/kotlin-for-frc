export class OldCommandSubsystemTemplate {
    text: string = `package #{PACKAGE}

import edu.wpi.first.wpilibj.command.Subsystem

class #{NAME} : Subsystem() {
    // Put methods for controlling this subsystem
    // here. Call these from Commands.
    override fun initDefaultCommand() {
        // Set the default command for a subsystem here.
        // setDefaultCommand(new MySpecialCommand());
    }
}
`;
}
