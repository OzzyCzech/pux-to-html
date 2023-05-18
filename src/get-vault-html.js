import {getHtml} from "./get-html.js";
import {getItemHtml} from "./get-item-html.js";

export function getVaultHtml({attrs, items}) {

    items.sort((a, b) => b.updatedAt - a.updatedAt);

    return getHtml(
        {
            title: `Vault export ${attrs.name}`,
            content: `
                <h1 class="text-2xl">Export of <em>${attrs.name}</em> vault</h1>
                ${items.map(getItemHtml).join("\n")}
            `
        }
    )
}
