const Discord = require('discord.js');
const client = new Discord.Client();

const commandPrefix = "??";

function getAmongUsChannel(guild) {
    guild.channels.cache
        .filter(channel => channel.type === "voice" && channel.name === "Among Us")
        .first()

}

function muteAllInChannel(channel, mute, reason) {
    channel.members
        .forEach(member => {
            if (member.voice.mute !== mute) {
                member.voice.setMute(mute, reason);
            }
        })
}

let amongUsMuted = false;
function toggleAmongUsMute(guild) {
    const channel = getAmongUsChannel(guild);

    amongUsMuted = !amongUsMuted;
    muteAllInChannel(channel, amongUsMuted, "Among Us");
}



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(commandPrefix) || msg.author.bot) return;

    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping": {
            msg.reply("pong");
        } break;

        case "mute": {
            msg.reply("Muting all imposters");
            muteAllInChannel(getAmongUsChannel(msg.guild), true, "Among Us");
        } break;

        case "unmute": {
            msg.reply("Unmuting crewmembers");
            muteAllInChannel(getAmongUsChannel(msg.guild), false, "Among Us");
        } break;

        case "toggle": {
            msg.reply("Toggling Among Us channel muted state")
            toggleAmongUsMute(msg.guild);
        } break;
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);