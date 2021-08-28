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
		// TODO: Create provider object which will always returns null so that each provider is called.
		// TODO: Add provider as the integrated, user, and workspace providers
	})

	test("getTemplate returns early when a provider gives a non-null value", async function () { })
})

class TestTemplateProvider implements ITemplateProvider {
	getTemplateCalled = false

	async getTemplate(t: TemplateType, workspaceFolder: Uri): Promise<string | null> {
		this.getTemplateCalled = true
		return null
	}
}
