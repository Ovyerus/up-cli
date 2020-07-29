#!/usr/bin/env node
const got = require("got");
const { token } = require("./cfg.json");
const { version } = require("./package.json");

// Strip the first two items from argv to give us only additional arguments.
const [, , ...argv] = process.argv;

async function balance() {
  const {
    body: { data: accounts },
  } = await got("https://api.up.com.au/api/v1/accounts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  });

  const total =
    accounts
      .map((acc) => acc.attributes.balance.valueInBaseUnits)
      .reduce((prev, curr) => prev + curr) / 100;
  const transactionals = accounts.filter(
    (acc) => acc.attributes.accountType === "TRANSACTIONAL"
  );
  const savers = accounts.filter(
    (acc) => acc.attributes.accountType === "SAVER"
  );

  console.log(
    `You have ${transactionals.length + savers.length} accounts (${
      transactionals.length
    } spending; ${savers.length} savers), with a total of $${total}`
  );
  console.log("---");

  for (const acc of accounts) {
    const { displayName: name, accountType: type, balance } = acc.attributes;

    console.log(
      name,
      "-",
      `$${balance.valueInBaseUnits / 100}${type === "SAVER" ? " saved" : ""}`
    );
  }
}

async function help() {
  console.log(`\x1b[90mup ${version}\x1b[0m`);
  console.log("Usage:");
  console.log("  up [command] [options]\n");

  console.log("Commands:");
  console.log("  help   \tShow this help dialog");
  console.log("  balance\tShow your current Up balance");
}

async function main() {
  // TODO: if we need to grow, used smth like getopts or yargs
  switch (argv[0]) {
    case "balance":
      await balance();
      break;
    case "help":
    default:
      await help();
      break;
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
