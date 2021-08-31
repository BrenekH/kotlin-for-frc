import * as assert from "assert"
import { Uri } from "vscode"
import { ITemplateProvider, TemplateType } from "../../../template/models"
import { TemplateProviderAggregator } from "../../../template/providers"

suite("TemplateProviderAggregator", function () {
	test("getTemplate calls all sub-providers", async function () {
		const integrated = new TestTemplateProvider()
		const user = new TestTemplateProvider()
		const workspace = new TestTemplateProvider()

		const aggregator = new TemplateProviderAggregator(integrated, user)
		aggregator.setWorkspaceProvider(Uri.file("/test/file"), workspace)

		await aggregator.getTemplate(TemplateType.emptyClass, Uri.file("/test/file"))

		assert.strictEqual(integrated.getTemplateCalled, true, "Integrated template provider not called.")
		assert.strictEqual(user.getTemplateCalled, true, "User template provider not called.")
		assert.strictEqual(workspace.getTemplateCalled, true, "Workspace template provider not called.")
	})

	test("getTemplate passes arguments to each sub-provider", async function () {
		const integrated = new TestTemplateProvider()
		const user = new TestTemplateProvider()
		const workspace = new TestTemplateProvider()

		const aggregator = new TemplateProviderAggregator(integrated, user)
		aggregator.setWorkspaceProvider(Uri.file("/test/file"), workspace)

		const wrkspceFolder = Uri.file("/test/file")
		await aggregator.getTemplate(TemplateType.emptyClass, wrkspceFolder)

		assert.strictEqual(integrated.templateTypeArg, TemplateType.emptyClass, "Integrated template provider called with incorrect templateTypeArg.")
		assert.strictEqual(integrated.workspaceFolderArg, wrkspceFolder, "Integrated template provider called with incorrect workspaceFolderArg.")

		assert.strictEqual(user.templateTypeArg, TemplateType.emptyClass, "User template provider called with incorrect templateTypeArg.")
		assert.strictEqual(user.workspaceFolderArg, wrkspceFolder, "User template provider called with incorrect workspaceFolderArg.")

		assert.strictEqual(workspace.templateTypeArg, TemplateType.emptyClass, "Workspace template provider called with incorrect templateTypeArg.")
		assert.strictEqual(workspace.workspaceFolderArg, wrkspceFolder, "Workspace template provider called with incorrect workspaceFolderArg.")
	})

	test("getTemplate returns early when a provider gives a non-null value", async function () {
		const integrated = new TestTemplateProvider()
		const user = new TestTemplateProvider()
		const workspace = new TestTemplateProvider("")

		const aggregator = new TemplateProviderAggregator(integrated, user)
		aggregator.setWorkspaceProvider(Uri.file("/test/file"), workspace)

		await aggregator.getTemplate(TemplateType.emptyClass, Uri.file("/test/file"))

		assert.strictEqual(workspace.getTemplateCalled, true)
		assert.strictEqual(user.getTemplateCalled, false)
		assert.strictEqual(integrated.getTemplateCalled, false)

		workspace.returnValue = null
		user.returnValue = ""
		await aggregator.getTemplate(TemplateType.emptyClass, Uri.file("/test/file"))

		assert.strictEqual(workspace.getTemplateCalled, true)
		assert.strictEqual(user.getTemplateCalled, true)
		assert.strictEqual(integrated.getTemplateCalled, false)
	})
})

class TestTemplateProvider implements ITemplateProvider {
	getTemplateCalled = false
	templateTypeArg: TemplateType | undefined = undefined
	workspaceFolderArg: Uri | undefined = undefined
	returnValue: string | null

	constructor(returnValue?: string | null) {
		this.returnValue = returnValue !== undefined ? returnValue : null
	}

	async getTemplate(t: TemplateType, workspaceFolder: Uri): Promise<string | null> {
		this.getTemplateCalled = true
		this.templateTypeArg = t
		this.workspaceFolderArg = workspaceFolder
		return this.returnValue
	}
}
