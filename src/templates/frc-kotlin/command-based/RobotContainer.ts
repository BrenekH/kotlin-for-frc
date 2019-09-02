export class CommandRobotContainerTemplate {
	private useAtProjectConversion: boolean;
	private text: string;
	constructor() {
	  this.useAtProjectConversion = true;
	  this.text = `
`;
	}
	public getText(): string {
		return this.text;
	}
	public useAtConversion(): boolean {
		return this.useAtProjectConversion;
	}
}