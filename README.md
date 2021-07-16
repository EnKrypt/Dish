<p align="center">
    <img width="500" src="https://github.com/EnKrypt/Shill/raw/master/assets/Shill.png">
</p>

<p align="center">
    <b>Shill is a remote management discord bot for easy shell access</b>
</p>

<br>

[![License](https://img.shields.io/github/license/EnKrypt/Shill?style=flat-square)](https://raw.githubusercontent.com/EnKrypt/Doppler/master/LICENSE)

---

## Usage

1. Clone this repository

2. Run `npm install` or `yarn`

3. Create a JSON config file. Here's an example:

```json
{
    "token": "<redacted>",
    "password": "<redacted>",
    "textChannel": "<redacted>",
    "authenticatedUsers": ["<redacted>", "<redacted>"]
}
```

All fields are mandatory:
| Field | Type | Description |
| --- | --- | --- |
| `token` | `string` | The token provided by discord to identify and control your bot. |
| `password` | `string` | The password that will authenticate a Discord user to run shell commands. |
| `textChannel` | `string` | The Discord text channel ID that this bot will use for communication. |
| `authenticatedUsers` | `Array<string>` | A list of Discord user IDs that can run shell commands without authenticating via a password. Useful for owners and admins so they don't get locked out. The list can be empty. |

4. From the root folder of the repository, run `node src --config /path/to/config.json`

5. If your personal discord user id (not the bot's) is part of `authenticatedUsers`, then skip this step. Otherwise you need to authenticate first by sending a DM to the bot itself with `!auth <password>`. You should get a message back from the bot if that worked.

6. In the text channel that you setup via `textChannel`, any message sent by authenticated users will be remotely interpreted as commands and processed.

## Special input

Some messages are not passed to the shell directly and have a special purpose:
| Message | Requires an active shell process | Description |
| --- | --- | --- |
| `!ignore ...` | No | Any message starting with `!ignore` will not be processed, regardless of what is running or not running on the shell. |
| `!auth <password>` | No | Authenticate yourself to use the bot if you are not a part of `authenticatedUsers`. Only works as a direct message to the bot. |
| `!sigint` | Yes | Sends SIGINT to the actively running shell process. This is equivalent to Ctrl C or ^C on the terminal. |
| `!sigterm` | Yes | Sends SIGTERM to the actively running shell process. |
| `!sigkill` | Yes | Sends SIGKILL to the actively running shell process. This will forcefully kill the process. Useful when you think the active process has frozen or hung. |

## Caveats

-   Not tested against Windows and Mac, so some functionality such as termination signals may not work properly.
-   If you've set your discord privacy such that members from mutual servers cannot DM you, you also will not be able to message the bot to authenticate.
-   No current way to hide sensitive information from stdout of running processes.
