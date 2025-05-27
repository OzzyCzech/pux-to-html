function getCopyButton(value) {
	return `<button 
                type="button"
                title="Copy to clipboard"
                class="bg-gray-200 text-gray-900 hover:bg-gray-800 hover:text-white p-2 rounded-full print:hidden cursor-pointer"
                onclick=navigator.clipboard.writeText(${JSON.stringify(value)})>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 lucide lucide-clipboard-copy-icon lucide-clipboard-copy">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
	                <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                  <path d="M16 4h2a2 2 0 0 1 2 2v4"/>
                  <path d="M21 14H11"/>
                  <path d="m15 10-4 4 4 4"/>
                </svg>
           </button>`;
}

function getSection({title, fields}) {
	return fields && fields.length > 0
		? `
        ${title ? `<h6 class="uppercase font-semibold">${title}</h6>` : ""}
        <ul class="divide-y divide-gray-300 border border-gray-300 rounded-xl">
            ${fields.map(getField).join("")}
        </ul>`
		: "";
}

function getNotes({notesPlain}) {
	return notesPlain
		? `<h6 class="font-semibold">Note</h6><pre class="text-gray-900 bg-gray-200 rounded p-4 m-2">${notesPlain}</pre>`
		: "";
}

function getUrl(url, label) {
	try {
		const link = new URL(url);
		return `<a href="${url}" target="_blank" class="hover:underline hover:text-sky-700" rel="noopener noreferrer">${link.hostname}</a>`;
	} catch {
		return `<code>${url}</code>`;
	}
}

function getSecret(value) {
	return `<code>${value}</code> ${getCopyButton(value)}`;
}

function getOTP(url) {
	const link = new URL(url);
	const secret = link.searchParams.get("secret");
	const issuer = link.searchParams.get("issuer");

	return `<table class="min-w-full border border-gray-300 rounded-lg overflow-hidden mb-2">
        <tbody>
          <tr class="bg-gray-50">
            <th class="whitespace-nowrap p-2 text-left font-semibold text-gray-700 text-right w-64">Issuer:</th>
            <td class="p-2"><code>${issuer || "-"}</code></td>
          </tr>
          <tr>
            <th class="whitespace-nowrap p-2 font-semibold text-gray-700 text-right">Secret:</th>
            <td class="p-2"><code class="bg-gray-100 text-gray-900 rounded px-1">${secret || "-"}</code></td>
          </tr>
          <tr class="bg-gray-50">
            <th class="whitespace-nowrap p-2 font-semibold text-gray-700 text-right truncate">URL:</th>
            <td class="p-2 text-wrap">${getCopyButton(url)}</td>
          </tr>
          <tr>
            <th class="whitespace-nowrap p-2 font-semibold text-gray-700 text-right">OTP code:</th>
            <td class="p-2">
              <code data-secret="${secret}" class="text-lg font-mono bg-gray-900 text-green-400 px-2 py-1 rounded"></code>
            </td>
          </tr>
        </tbody>
      </table>`;
}

function getField({value, name, title, url, label, designation}) {
	if (value instanceof Object) {
		const {url, string, totp, concealed, file} = value;
		if (url) {
			value = getUrl(value.url);
		} else if (string) {
			value = `<code>${value.string}</code>`;
		} else if (totp) {
			label = "one-time password";
			value = getOTP(value.totp);
		} else if (concealed) {
			value = getSecret(value.concealed);
		} else if (file) {
			label = "file";
			value = `<code>${value.file.fileName}</code>`;
		} else {
			value = undefined; // Unknown type
		}
	}

	// Password or username fields
	if (designation === "password" || designation === "username") {
		value = getSecret(value);
	}

	// If the field is a URL, display it as a link
	if (url) {
		label = "website";
		value = getUrl(url);
	}

	return value
		? `<li class="p-3 flex flex-col flex-wrap gap-1">
            <div><span class="text-gray-500">${designation || name || title || label}:</span></div>
            <div class="flex items-center gap-3">${value}</div>
        </li>`
		: "";
}

export function getItemHtml({
	                            state,
	                            details,
	                            overview,
	                            createdAt,
	                            updatedAt,
                            }) {
	const loginSection = {
		fields: [
			...details.loginFields.filter(
				(item) =>
					item.designation === "password" || item.designation === "username",
			),
			...(overview.urls || []),
		],
	};

	return state === "active"
		? `
        <article class="border border-gray-300 rounded-lg p-6 print:p-4 my-4 break-inside-avoid flex flex-col gap-3">
           <h2 class="text-3xl print:text-lg font-semibold">${overview.title}</h2>
           
           <!-- login section -->
           ${getSection(loginSection)}
           
           <!-- other sections -->
           ${details.sections.map(getSection).join("")}
           
           <!-- notes -->
           ${getNotes(details)}
        </article>
    `
		: "";
}
