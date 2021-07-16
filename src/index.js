const Discord = require('discord.js');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { validateArgs } = require('./validation');
const { setupShell, shellInput } = require('./shell');

const args = yargs(hideBin(process.argv))
    .config()
    .alias('c', 'config').argv;
validateArgs(args);

const client = new Discord.Client();
let textChannel = {};
let shell = {};

client.on('ready', () => {
    textChannel = client.channels.cache.get(args.textChannel);
    shell = setupShell(textChannel);
    console.log(
        'Shill is ready to execute shell commands on this host remotely.'
    );
});

client.on('message', message => {
    if (
        // Shell input
        message.channel.type === 'text' &&
        message.channel.id === args.textChannel &&
        args.authenticatedUsers.includes(message.author.id)
    ) {
        shellInput(message.content, shell);
    } else if (
        // Auth with password
        message.channel.type === 'dm' &&
        message.content === `!auth ${args.password}` &&
        !args.authenticatedUsers.includes(message.author.id)
    ) {
        args.authenticatedUsers.push(message.author.id);
        message.author.send('Successfully authorized');
    }
});

client.login(args.token);
