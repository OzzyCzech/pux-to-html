import { join } from "node:path";
import slugify from "@sindresorhus/slugify";
import AdmZip from "adm-zip";
import { getVaultHtml } from "./get-vault-html.js";
import { writeFile } from "./write-file.js";

// Import templates

export async function puxToHtml(input, output) {
	const pux = new AdmZip(input, {});

	const _attributes = JSON.parse(pux.readAsText("export.attributes", "utf8"));
	const data = JSON.parse(pux.readAsText("export.data", "utf8"));

	for (const account of data.accounts) {
		// Get directory name
		const dir = slugify(account.attrs.name);

		// Iterate over vaults
		for (const vault of account.vaults) {
			const fileName = `${slugify(vault.attrs.name)}.html`;
			const html = getVaultHtml(vault);

			// Write HTML files
			await writeFile(join(output, dir, fileName), html);
		}
	}
}
