const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

const commandPrefix = "??";

function getAmongUsChannel(guild) {
    return guild.channels.cache
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

    return amongUsMuted;
}



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("??help");
});

client.on('message', msg => {
    if (!msg.content.startsWith(commandPrefix) || msg.author.bot) return;

    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "help": {
            const embed = new MessageEmbed()
                .setTitle(`${client.user.username} Commands`)
                .setColor(0xb19cd9) //Light pastel purple
                .addField("ping", "Replies with a pong!")
                .addField("mute", "Mutes all of the users in the 'Among Us' voice channel.")
                .addField("unmute", "Un-mutes all of the users in the 'Among Us' voice channel.")
                .addField("toggle", "Toggles between muted states for all users in the 'Among Us' voice channel.")

            msg.author.send(embed);
        } break;

        case "ping": {
            msg.reply("pong");
        } break;

        case "mute": {
            msg.channel.send("Muting imposters");
            amongUsMuted = true;
            muteAllInChannel(getAmongUsChannel(msg.guild), true, "Among Us");
        } break;

        case "unmute": {
            msg.channel.send("Un-muting Crewmates");
            amongUsMuted = false;
            muteAllInChannel(getAmongUsChannel(msg.guild), false, "Among Us");
        } break;

        case "toggle": {
            msg.channel.send(`Toggling muted state to ${toggleAmongUsMute(msg.guild)}`);
        } break;
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);