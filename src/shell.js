const { spawn } = require('child_process');

module.exports.setupShell = (textChannel) => {
    const shell = spawn('/bin/sh');

    shell.stdin.setEncoding('utf-8');

    shell.stdout.on('data', (data) => {
        const outputLine = data.toString('utf8');
        if (outputLine) textChannel.send(outputLine);
    });

    shell.stderr.on('data', (data) => {
        const outputLine = data.toString('utf8');
        if (outputLine) textChannel.send(outputLine);
    });

    shell.on('error', (err) => {
        console.log(err);
        textChannel.send(`shell process errored out`);
    });

    shell.on('close', (code) => {
        textChannel.send(`shell process exited with code ${code}`);
    });

    return shell;
};
