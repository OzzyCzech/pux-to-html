function getUrl({url, urls}) {
    try {
        const link = new URL(url)
        return `<li class="p-2"><span class="text-gray-500">web</span>: <a href="${url}" target="_blank" class="block" rel="noopener noreferrer">${link.hostname}</a></li>`
    } catch (error) {
        return `<li class="p-2"><span class="text-gray-500">web</span>: <code class="block">${url}</code></li>`
    }
}


function getLoginFields({value, name, title, designation}) {
    const label = designation || title || name;
    if (value instanceof Object) {
        return `<li class="p-2"><span class="text-gray-500">${label}</span>:<code class="block">${Object.values(value)[0]}</code></li>`;
    } else {
        return `<li class="p-2"><span class="text-gray-500">${label}</span>:<code class="block">${value}</code></li>`;
    }
}

function getSection({title, fields}) {
    return `
        <h6 class="uppercase font-semibold">${title}</h6>
        <ul class="list-none divide-y">
            ${fields.map(getLoginFields).join("")}
        </ul>
    `
}

export function getItemHtml({state, details, overview, createdAt, updatedAt}) {

    const loginFields = details.loginFields.filter(item => item.designation === "password" || item.designation === 'username')

    return state === "active" ? `
        <article class="border rounded-lg p-6 my-4 break-inside-avoid">
            <h2 class="text-3xl font-semibold mb-3">${overview.title}</h2>
            <ul class="divide-y border rounded-xl my-2">
            <!-- Login URLs -->
            ${overview.urls ? overview.urls.map(getUrl).join("") : ""}
            
            <!-- Login/password fields -->
            ${loginFields.map(getLoginFields).join("")}
            </ul>
            
            <!-- Sections  -->
            ${details.sections ? details.sections.map(getSection).join("") : ""}
            
            ${details.notesPlain ? `<h6 class="font-bold">Note</h6><pre class="text-gray-100 bg-gray-900 rounded p-4 m-2">${details.notesPlain}</pre>` : ""}
        </article>
    ` : '';
}