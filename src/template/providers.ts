import * as vscode from "vscode"
import { TemplateStrings } from "./templates"
import { ITemplateProvider, TemplateType } from "./models"

/**
 * TemplateProviderAggregator wraps the various template providers (integrated, user-level, and workspace-level) into
 * a single template provider that can be used by the templating system.
 *
 * This class prioritizes templates in the following order: workspace, user, integrated.
 */
export class TemplateProviderAggregator implements ITemplateProvider {
    integratedProvider: ITemplateProvider
    userProvider: ITemplateProvider
    workspaceProviders: Map<string, ITemplateProvider>

    constructor(integratedProvider: ITemplateProvider, userProvider: ITemplateProvider) {
        this.workspaceProviders = new Map()

        this.integratedProvider = integratedProvider
        this.userProvider = userProvider
    }

    /**
     * setWorkspaceProvider saves a template provider for a specific workspace URI
     *
     * @param uri The URI to save the template provider for
     * @param provider The provider to save
     */
    setWorkspaceProvider(uri: vscode.Uri, provider: ITemplateProvider) {
        this.workspaceProviders.set(uri.toString(), provider)
    }

    /**
     * getWorkspaceProvider looks up the template provider associated with a given workspace URI.
     *
     * @param uri The URI to lookup
     * @returns The template provider for the provided URI
     */
    getWorkspaceProvider(uri: vscode.Uri): ITemplateProvider | undefined {
        return this.workspaceProviders.get(uri.toString())
    }

    /**
     * deleteWorkspaceProvider removes the template provider that matches the provided URI from
     * the aggregator's internal map.
     *
     * @param uri The URI to clear the template provider from
     */
    deleteWorkspaceProvider(uri: vscode.Uri) {
        this.workspaceProviders.delete(uri.toString())
    }

    async getTemplate(t: TemplateType, workspaceFolder: vscode.Uri): Promise<string | null> {
        const workspaceProvider = this.getWorkspaceProvider(workspaceFolder)
        if (workspaceProvider === undefined) {
            const userResult = await this.userProvider.getTemplate(t, workspaceFolder)
            if (userResult !== null) {
                return userResult
            }
            return await this.integratedProvider.getTemplate(t, workspaceFolder)
        }

        const workspaceResult = await workspaceProvider.getTemplate(t, workspaceFolder)
        if (workspaceResult !== null) {
            return workspaceResult
        }

        const userResult = await this.userProvider.getTemplate(t, workspaceFolder)
        if (userResult !== null) {
            return userResult
        }

        return await this.integratedProvider.getTemplate(t, workspaceFolder)
    }
}

/**
 * FileSystemTemplateProvider is a general template provider that reads .kfftemplate files
 * directly from the file system.
 */
export class FileSystemTemplateProvider implements ITemplateProvider {
    topLevelUri: vscode.Uri

    constructor(topLevelUri: vscode.Uri) {
        this.topLevelUri = topLevelUri
    }

    async getTemplate(t: TemplateType, _: vscode.Uri): Promise<string | null> {
        let readData: Uint8Array
        try {
            readData = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(this.topLevelUri, `${templateTypeToString(t)}.kfftemplate`))
        } catch (_) {
            return null
        }

        const templateString = Buffer.from(readData).toString("utf8")

        return templateString
    }
}

/**
 * IntegratedTemplateProvider is the template provider that provides the default templates for
 * use in the templating system. The template strings are stored in the TemplateStrings class
 * which is auto-generated before compiling and bundling the Typescript.
 */
export class IntegratedTemplateProvider implements ITemplateProvider {
    templates: TemplateStrings

    constructor() {
        this.templates = new TemplateStrings()
    }

    async getTemplate(t: TemplateType, _: vscode.Uri): Promise<string | null> {
        const tStr = this.templates[templateTypeToString(t) as keyof TemplateStrings] // Cast result from templateTypeToString to a key of TemplateStrings. StackOverflow: https://stackoverflow.com/a/62438434

        return tStr
    }
}

/**
 * templateTypeToString turns the TemplateType enum into a string which can used to acquire
 * templates from their storage locations.
 *
 * @param t The template type to lookup
 * @returns A string representing the provided template type
 */
function templateTypeToString(t: TemplateType): string {
    switch (t) {
        // Command based
        // General
        case TemplateType.commandRobot:
            return "commandRobot"
        case TemplateType.robotContainer:
            return "robotContainer"
        case TemplateType.commandConstants:
            return "commandConstants"
        // Commands
        case TemplateType.command:
            return "command"
        case TemplateType.instantCommand:
            return "instantCommand"
        case TemplateType.parallelCommandGroup:
            return "parallelCommandGroup"
        case TemplateType.parallelDeadlineGroup:
            return "parallelDeadlineGroup"
        case TemplateType.parallelRaceGroup:
            return "parallelRaceGroup"
        case TemplateType.PIDCommand:
            return "PIDCommand"
        case TemplateType.profiledPIDCommand:
            return "profiledPIDCommand"
        case TemplateType.sequentialCommandGroup:
            return "sequentialCommandGroup"
        case TemplateType.trapezoidProfileCommand:
            return "trapezoidProfileCommand"
        case TemplateType.commandExampleCommand:
            return "commandExampleCommand"
        case TemplateType.commandAutos:
            return "commandAutos"
        // Subsystems
        case TemplateType.subsystem:
            return "subsystem"
        case TemplateType.exampleSubsystem:
            return "exampleSubsystem"
        case TemplateType.PIDSubsystem:
            return "PIDSubsystem"
        case TemplateType.profiledPIDSubsystem:
            return "profiledPIDSubsystem"
        case TemplateType.trapezoidProfileSubsystem:
            return "trapezoidProfileSubsystem"

        // Romi
        case TemplateType.romiBuildGradle:
            return "romiBuildGradle"
        case TemplateType.romiTimedRobot:
            return "romiTimedRobot"
        case TemplateType.romiTimedDrivetrain:
            return "romiTimedDrivetrain"
        case TemplateType.romiCommandRobotContainer:
            return "romiCommandRobotContainer"
        case TemplateType.romiCommandConstants:
            return "romiCommandConstants"
        case TemplateType.romiCommandExampleCommand:
            return "romiCommandExampleCommand"
        case TemplateType.romiCommandDrivetrainSubsystem:
            return "romiCommandDrivetrainSubsystem"

        // Robot.kt files
        case TemplateType.robotBaseRobot:
            return "robotBaseRobot"
        case TemplateType.timedRobot:
            return "timedRobot"
        case TemplateType.timedSkeleton:
            return "timedSkeletonRobot"

        // Misc
        case TemplateType.main:
            return "main"
        case TemplateType.buildGradle:
            return "buildGradle"
        case TemplateType.emptyClass:
            return "emptyClass"

        default:
            throw new Error("Invalid TemplateType passed to templateTypeToString")
    }
}
