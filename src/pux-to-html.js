import slugify from '@sindresorhus/slugify';
import {getVaultHtml} from './get-vault-html.js';
import {writeFile} from './write-file.js';
import {join} from 'node:path';
import AdmZip from 'adm-zip';

// Import templates

export async function puxToHtml(input, output) {
	const pux = new AdmZip(input);

	const attributes = JSON.parse(pux.readAsText('export.attributes'));
	const data = JSON.parse(pux.readAsText('export.data'));

	for (const account of data.accounts) {
		// Get directory name
		const dir = slugify(account.attrs.name);

		// Iterate over vaults
		for (const vault of account.vaults) {
			const fileName = slugify(vault.attrs.name) + '.html';
			const html = getVaultHtml(vault);

			// Write HTML files
			await writeFile(join(output, dir, fileName), html);
		}
	}
}
