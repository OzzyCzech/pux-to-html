function getCopyButton(value) {
    return `<button 
                type="button"
                title="Copy to clipboard"
                class="bg-gray-200 text-gray-900 hover:bg-gray-800 hover:text-white p-2 rounded-full"
                onclick=navigator.clipboard.writeText(${JSON.stringify(value)})><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
            </svg>
           </button>`
}

function getSection({title, fields}) {
    return fields && fields.length > 0 ? `
        ${title ? `<h6 class="uppercase font-semibold">${title}</h6>` : ''}
        <ul class="divide-y border rounded-xl">
            ${fields.map(getField).join("")}
        </ul>` : '';
}

function getNotes({notesPlain}) {
    return notesPlain ? `<h6 class="font-semibold">Note</h6><pre class="text-gray-100 bg-gray-900 rounded p-4 m-2">${notesPlain}</pre>` : '';
}

function getUrl(url, label) {
    try {
        const link = new URL(url)
        return `<a href="${url}" target="_blank" class="hover:underline hover:text-sky-700" rel="noopener noreferrer">${link.hostname}</a>`
    } catch (error) {
        return `<code>${url}</code>`
    }
}

function getSecret(value) {
    return `<code>${value}</code> ${getCopyButton(value)}`
}

function getOTP(url) {

    try {
        const link = new URL(url)
        const secret = link.searchParams.get('secret');
        const issuer = link.searchParams.get('issuer');

        return `<ul>
            <li>Issues: <code>${issuer}</code></li>
            <li>Secret: <code>${secret}</code></li>
            <li>URL: <code>${url}</code></li>
        </ul>`
    } catch (error) {
        return `<code>${url}</code>`
    }


}


function getField({value, name, title, url, label, designation}) {

    if (value instanceof Object) {
        if (value.hasOwnProperty('url') && value.url) {
            value = getUrl(value.url)
        } else if (value.hasOwnProperty('string') && value.string) {
            value = `<code>${value.string}</code>`
        } else if (value.hasOwnProperty('totp') && value.totp) {
            label = 'one-time password'
            value = getOTP(value.totp)
        } else if (value.hasOwnProperty('concealed') && value.concealed) {
            value = getSecret(value.concealed)
        } else if (value.hasOwnProperty('file') && value.file) {
            label = 'file'
            value = `<code>${value.file.fileName}</code>`
        } else {
            value = undefined; // unknown type
        }
    }

    // password or username fields
    if (designation === "password" || designation === "username") {
        value = getSecret(value);
    }

    // If the field is a URL, display it as a link
    if (url) {
        label = 'website';
        value = getUrl(url);
    }

    return value ? `<li class="p-3 flex flex-col flex-wrap gap-1">
            <div><span class="text-gray-500">${designation || name || title || label}:</span></div>
            <div class="flex items-center gap-3">${value}</div>
        </li>` : '';
}


export function getItemHtml({state, details, overview, createdAt, updatedAt}) {


    const loginSection = {
        fields: [
            ...details.loginFields.filter(item => item.designation === "password" || item.designation === 'username'),
            ...overview.urls || []
        ]
    }

    return state === "active" ? `
        <article class="border rounded-lg p-6 my-4 break-inside-avoid flex flex-col gap-3">
           <h2 class="text-3xl font-semibold">${overview.title}</h2>
           
           <!-- login section -->
           ${getSection(loginSection)}
           
           <!-- other sections -->
           ${details.sections.map(getSection).join("")}
           
           <!-- notes -->
           ${getNotes(details)}
        </article>
    ` : '';
}