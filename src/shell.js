const { spawn } = require('child_process');
const Discord = require('discord.js');

const setupShell = (input, state) => {
    state.shell = spawn(input, [], { shell: true });
    state.active = true;
    state.since = Date.now();
    state.shell.stdin.setEncoding('utf-8');

    state.shell.stdout.on('data', data => {
        const outputLine = data.toString('utf8');
        if (outputLine) state.textChannel.send(outputLine);
    });

    state.shell.stderr.on('data', data => {
        const outputLine = data.toString('utf8');
        if (outputLine) state.textChannel.send(outputLine);
    });

    state.shell.on('error', err => {
        console.log(err);
        state.textChannel.send(
            new Discord.MessageEmbed()
                .setColor('#ff4444')
                .setTitle('Process encountered an error')
        );
    });

    state.shell.on('close', code => {
        state.active = false;
        state.textChannel.send(
            new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Process exited')
                .addFields(
                    { name: 'Exit Code', value: code, inline: true },
                    {
                        name: 'Duration',
                        value: `${Date.now() - state.since}ms`,
                        inline: true
                    }
                )
        );
    });
};

const shellInput = (input, state) => {
    if (['!sigint', '!sigterm', '!sigkill'].includes(input)) {
        if (state.active) {
            process.kill(state.shell.pid, input.slice(1).toUpperCase());
        } else {
            state.textChannel.send(
                new Discord.MessageEmbed()
                    .setColor('#ff4444')
                    .setTitle('There is no active process to kill or terminate')
            );
        }
    } else if (!input.startsWith('!ignore')) {
        if (state.active) {
            state.shell.stdin.write(`${input}\n`);
        } else {
            setupShell(input, state);
        }
    }
};

module.exports = { setupShell, shellInput };
