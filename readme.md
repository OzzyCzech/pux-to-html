# Convert 1PUX format to HTML

[![NPM Downloads](https://img.shields.io/npm/dm/pux-to-html?style=for-the-badge)](https://www.npmjs.com/package/pux-to-html)
[![NPM Version](https://img.shields.io/npm/v/pux-to-html?style=for-the-badge)](https://www.npmjs.com/package/pux-to-html)
[![NPM License](https://img.shields.io/npm/l/pux-to-html?style=for-the-badge)](https://github.com/OzzyCzech/pux-to-html/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/pux-to-html?style=for-the-badge)](https://github.com/OzzyCzech/pux-to-html/commits/main)
[![CI](https://img.shields.io/github/actions/workflow/status/OzzyCzech/pux-to-html/main.yml?style=for-the-badge&label=CI)](https://github.com/OzzyCzech/pux-to-html/actions)

`pux2html` is a CLI tool that converts a [1PUX](https://support.1password.com/1pux-format/) export file from 1Password into HTML files — one per vault.

```shell
pux2html <input file> <output directory>
```

## Installation

```shell
npm install -g pux-to-html
```

```shell
yarn global add pux-to-html
```

## Usage

```shell
pux2html 1PasswordExport-123456789-123456-123456.1pux ~/Downloads
```

This creates one HTML file per vault inside the output directory.

## What is 1PUX?

[1Password Unencrypted Export](https://support.1password.com/1pux-format/) (1PUX) is an export format from 1Password that lets you access your data outside of the app.

To export from 1Password: **File → Export → All Accounts** → choose **1PUX** format.
