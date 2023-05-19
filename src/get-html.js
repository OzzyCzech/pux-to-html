export function getHtml({content, title}) {
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    <script src="https://cdn.jsdelivr.net/npm/totp-generator@0.0.14/index.min.js"></script>
</head>

<body class="container mx-auto">
<div class="m-4">${content}</div>
</body>`
}
