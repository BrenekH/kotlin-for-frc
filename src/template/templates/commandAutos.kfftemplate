package frc.robot.commands

import edu.wpi.first.wpilibj2.command.CommandBase
import edu.wpi.first.wpilibj2.command.Commands
import frc.robot.subsystems.ExampleSubsystem

class Autos private constructor() {
    init {
        throw UnsupportedOperationException("This is a utility class!")
    }

    companion object {
        /** Example static factory for an autonomous command.  */
        fun exampleAuto(subsystem: ExampleSubsystem): CommandBase {
            return Commands.sequence(subsystem.exampleMethodCommand(), ExampleCommand(subsystem))
        }
    }
}
