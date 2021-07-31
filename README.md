<p align="center">
    <img width="500" src="https://github.com/EnKrypt/Shill/raw/master/assets/Shill.png">
</p>

<p align="center">
    <b>Shill is a remote management Discord bot for easy shell access</b>
</p>

<br>

[![License](https://img.shields.io/github/license/EnKrypt/Shill?style=flat-square)](https://raw.githubusercontent.com/EnKrypt/Doppler/master/LICENSE)

---

## Usage

0. Pre-requisite: Have a Discord bot created by you on your server.

If you haven't done that yet, [start by creating a Discord application here](https://discord.com/developers/applications), add a bot to that application, and have that bot join your server with the right permissions. You should also have your new bot's token at this point.

1. Clone this repository

2. Run `npm install` or `yarn`

3. Create a JSON config file. Here's an example:

```json
{
    "token": "nxRD1Uim9asdiu.some.random.discord.generated.token.K2Dop0Mma43IqqQ",
    "password": "user-generated-password-for-auth",
    "textChannel": "111111111111111111",
    "authenticatedUsers": ["222222222222222222", "333333333333333333"]
}
```

All fields are mandatory:
| Field | Type | Description |
| --- | --- | --- |
| `token` | `string` | The token provided by Discord to identify and control your bot. |
| `password` | `string` | The password that will authenticate a Discord user to run shell commands. This password is decided by you. |
| `textChannel` | `string` | The Discord text channel ID that this bot will use for communication. |
| `authenticatedUsers` | `Array<string>` | A list of Discord user IDs that can run shell commands without authenticating via a password. Useful for owners and admins so they don't get locked out. This list can be empty. |

4. From the root folder of the repository, run `node src --config /path/to/config.json`

5. If your personal Discord user id (not the bot's) is part of `authenticatedUsers`, then skip this step. Otherwise you need to authenticate first by sending a DM to the bot itself with `!auth <password>`. You should get a message back from the bot if that worked.

6. In the text channel that you setup via `textChannel`, any message sent by authenticated users will be remotely interpreted as commands and processed.

## Special input

Some messages are not passed to the shell directly and have a special purpose:
| Message | Requires an active shell process | Description |
| --- | --- | --- |
| `!info` | No | Indicates if there is currently an active shell process and if there is, displays information about that process. |
| `!ignore ...` | No | Any message starting with `!ignore` will not be processed, regardless of what is running or not running on the shell. |
| `!auth <password>` | No | Authenticate yourself to use the bot if you are not a part of `authenticatedUsers`. Only works as a direct message to the bot. |
| `!sigint` | Yes | Sends SIGINT to the actively running shell process. This is equivalent to Ctrl C or ^C on the terminal. |
| `!sigterm` | Yes | Sends SIGTERM to the actively running shell process. |
| `!sigkill` | Yes | Sends SIGKILL to the actively running shell process. This will forcefully kill the process. Useful when you think the active process is frozen or has hung. |

## Screenshots

<p align="center">
    <img width="475" src="https://github.com/EnKrypt/Shill/raw/master/assets/screenshot.png">
</p>

## Caveats

-   Applications that require a TTY (eg: editors and pagers) cannot be run properly. However, you can run REPL applications if they support an interactive mode, for eg: instead of `node`, you can run `node -i` which works well.
-   No clean way to run and manage multiple simultaneous processes currently.
-   Not tested against Windows and Mac, so some functionality such as termination signals may not work properly.
-   If you've set your Discord privacy such that members from mutual servers cannot DM you, you also will not be able to message the bot to authenticate.
-   No current way to hide sensitive information from stdout of running processes.
