import * as core from "@actions/core"
import * as github from "@actions/github"

async function run(): Promise<void> {
	try {

		const context = github.context;
		const octokit = github.getOctokit(core.getInput("github-token"));

		if (context.eventName !== "pull_request") {
			throw "Not a pull request"
		}

		if (context.payload.action !== "opened") {
			throw "Action can only run on Pull Request open events."
		}

		const pull_request = (context.payload.pull_request as {
			[key: string]: any;
			number: number;
			html_url?: string;
			body?: string;
		})

		// Check if merging branch is master
		if (pull_request["base"].ref !== "master") {
			console.log("Base ref is not master")
			return
		}

		// Check if current branch is of the form (release-(semver))
		// Uses a regex from semver.org to match the semver portion of the release branch name
		if (!/^release-(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(pull_request["head"].ref)) {
			console.log("Head ref does not match the release regex")
			return
		}

		// Comment on the PR
		octokit.rest.issues.createComment({
			issue_number: context.issue.number,
			owner: context.repo.owner,
			repo: context.repo.repo,
			body: "It looks like you've opened a release PR!\nHere's a handy checklist of things that need to be done before a release.\n\n- [ ] Update RELEASE_NOTES.md\n- [ ] Update CHANGELOG.md\n- [ ] Update Changelog Webview HTML\n- [ ] Update version"
		})

	} catch (error: any) {
		core.setFailed(error)
	}
}

run()
