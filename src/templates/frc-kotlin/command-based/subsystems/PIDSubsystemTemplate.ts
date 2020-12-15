export class PIDSubsystemTemplate {
    text: string = `package #{PACKAGE}

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
`;
}
