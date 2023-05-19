# Convert 1PUX format to HTML

`pux2html` is a console script that converts 1PUX file to HTML files:

```shell
$ pux2html <input file> <output directory>
```

The script creates one HTML file from each vault in the 1PUX file in selected directory.

## Example

```shell
$ pux2html 1PasswordExport-123456789-123456-123456.1pux ~/Downloads
```

## What's 1PUX?

[1Password Unencrypted Export](https://support.1password.com/1pux-format/) (1PUX) format 
allows you to export 1PUX files, so you can access your data 
outside of [1Password](https://1password.com/)