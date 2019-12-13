export class CommandSubsystemTemplate {
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

import edu.wpi.first.wpilibj2.command.SubsystemBase

class #{NAME} : SubsystemBase() {
	/**
	 * Creates a new #{NAME}.
	 */
	init {
	}

	/**
	 * Will be called periodically whenever the CommandScheduler runs.
	 */
	override fun periodic() {
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