module.exports.validateArgs = (args) => {
    if (!args.token) {
        return exitWithUsageHint(
            'token',
            'The token provided by discord to identify and control your bot'
        );
    }
    if (!args.password) {
        return exitWithUsageHint(
            'password',
            'The password that will authenticate a Discord user to run shell commands'
        );
    }
    if (!args.textChannel) {
        return exitWithUsageHint(
            'textChannel',
            'The Discord text channel ID that this bot will use for communication'
        );
    }
    if (!args.authenticatedUsers || !Array.isArray(args.authenticatedUsers)) {
        return exitWithUsageHint(
            'authenticatedUsers',
            'A list of Discord user IDs that can run shell commands without authenticating via a password'
        );
    }
};

const exitWithUsageHint = (arg, argHint) => {
    console.log('Usage:\nnode src/index.js --config /path/to/config.json');
    console.log(
        `'${arg}' field is missing or has a bad value in the JSON config file`
    );
    console.log(`${arg}: ${argHint}`);
    process.exit(1);
};
