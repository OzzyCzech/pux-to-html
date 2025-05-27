export function getHtml({ content, title }) {
	return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
		<script type="module">
      import {TOTP} from 'https://cdn.jsdelivr.net/npm/totp-generator/+esm';

      function updateOtps() {
        const codes = document.querySelectorAll('code[data-secret]');
        for (const code of codes) {
            const secret = code.dataset.secret;
            const {otp} = TOTP.generate(secret);
            code.textContent = otp;
        }
      }
	
      updateOtps();
      setInterval(updateOtps, 5000);
		</script>
</head>

<body class="container mx-auto">
<div class="m-4">${content}</div>
</body>`;
}
