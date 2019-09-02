export class CommandTemplate {
	private useAtProjectConversion: boolean;
	private text: string;
	constructor() {
	  this.useAtProjectConversion = true;
	  this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018-2019 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

import frc.robot.subsystems.ExampleSubsystem
import edu.wpi.first.wpilibj2.command.CommandBase

/**
 * An example command that uses an example subsystem.
 */
class #{NAME}(subsystem: ExampleSubsystem) : CommandBase() {
	val m_subsystem: ExampleSubsystem = subsystem

	/**
	 * Creates a new #{NAME}.
	 *
	 * @param subsystem The subsystem used by this command.
	 */
	init {
		addRequirements(subsystem)
	}
}

`;
	}
	public getText(): string {
		return this.text;
	}
	public useAtConversion(): boolean {
		return this.useAtProjectConversion;
	}
}