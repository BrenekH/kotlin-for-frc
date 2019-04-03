export class EmptyClassTemplate {
    private useAtProjectConversion: boolean;
    private text: string;
    constructor() {
    this.useAtProjectConversion = false;
    this.text = `/*----------------------------------------------------------------------------*/
/* Copyright (c) 2018 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package #{PACKAGE}

/**
 * Add your docs here.
 */
class #{NAME} {
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
