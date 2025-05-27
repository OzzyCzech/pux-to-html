#!/usr/bin/env node

import meow from 'meow';
import { puxToHtml } from "./src/pux-to-html.js";

const cli = meow(`
    Usage:
        $ pux2html <input> <output>

    Examples:
        $ pux2html ~/backup/export.1pux ~/Downloads
    `, {
	importMeta: import.meta,
});

if (cli.input.length < 2) {
	cli.showHelp(1);
} else {
	const [input, output] = cli.input;
	await puxToHtml(input, output);
	console.log(`Successfully exported to ${output}`);
}