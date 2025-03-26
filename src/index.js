const Discord = require('discord.js');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const { validateArgs } = require('./validation');
const { shellInput } = require('./shell');

const args = yargs(hideBin(process.argv)).config().alias('c', 'config').argv;
validateArgs(args);

const client = new Discord.Client();
const state = {
  shell: {},
  active: false,
  since: Date.now(),
  textChannel: {}
};

client.on('ready', () => {
  state.textChannel = client.channels.cache.get(args.textChannel);
  console.log('Dish is ready to execute shell commands on this host remotely.');

  if (args.uptimeUrl) {
    setInterval(async () => {
      try {
        await axios.get(args.uptimeUrl);
      } catch (error) {
        console.log(
          `Error while making a call to 'uptimeUrl': ${error.message}`
        );
      }
    }, 1000 * 60);
  }
});

client.on('message', (message) => {
  if (
    // Shell input
    message.channel.type === 'text' &&
    message.channel.id === args.textChannel &&
    args.authenticatedUsers.includes(message.author.id)
  ) {
    shellInput(message.content, state);
  } else if (
    // Auth with password
    message.channel.type === 'dm' &&
    message.content === `!auth ${args.password}` &&
    !args.authenticatedUsers.includes(message.author.id)
  ) {
    args.authenticatedUsers.push(message.author.id);
    message.author.send(
      new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Successfully authorized')
    );
  }
});

client.login(args.token);
