# Convert 1PUX format to HTML

[![NPM Downloads](https://img.shields.io/npm/dm/pux-to-html?style=for-the-badge)](https://www.npmjs.com/package/pux-to-html)
[![NPM Version](https://img.shields.io/npm/v/pux-to-html?style=for-the-badge)](https://www.npmjs.com/package/pux-to-html)
[![NPM License](https://img.shields.io/npm/l/pux-to-html?style=for-the-badge)](https://github.com/OzzyCzech/pux-to-html/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/pux-to-html?style=for-the-badge)](https://github.com/OzzyCzech/pux-to-html/commits/main)

`pux2html` is a console script that converts 1PUX file to HTML files:

```shell
$ pux2html <input file> <output directory>
```

The script creates one HTML file from each vault in the 1PUX file in selected directory.
## Installation

```shell
$ yarn global add pux-to-html

# or 
$ npm install -g pux-to-html

# or 
$ git clone git@github.com:OzzyCzech/pux-to-html.git
$ yarn link pux-to-html
```

## Example

```shell
$ pux2html 1PasswordExport-123456789-123456-123456.1pux ~/Downloads
```

## What's 1PUX?

[1Password Unencrypted Export](https://support.1password.com/1pux-format/) (1PUX) format 
allows you to export 1PUX files, so you can access your data 
outside [1Password](https://1password.com/)