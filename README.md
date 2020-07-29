# up-cli

> A small project for experimenting with the [Up API](https://github.com/up-banking)

[![demonstration image of the CLI application](https://pbs.twimg.com/media/Ed-8UVQUcAAAd-_?format=png&name=medium)](https://twitter.com/ovyerus/status/1287955654729019393)

Currently only has support for showing account balance, but may expand as the API gets more features, and if interest is shown in this project.

## Usage

Create a `cfg.json` file in this repository, with the following contents (maybe be a env var soon)

```json
{
  "token": "up:yeah:YOUR_PERSONAL_UP_TOKEN"
}
```

Then either run the script directly with `node index.js`, or add it globally with something like Yarn with `yarn global add file:/path/to/up-cli`, and then simply run it with `up`

#### Example Output

```
$ up
up 0.1.0
Usage:
  up [command] [options]

Commands:
  help          Show this help dialog
  balance       Show your current Up balance
```

## License

This project and the code within is licensed under the [MIT License](./LICENSE)
