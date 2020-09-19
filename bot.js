const Discord = require('discord.js');
const client = new Discord.Client();

const command_prefix = "??";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(command_prefix) || msg.author.bot) return;

    const args = msg.content.slice(command_prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        msg.reply('pong');
    }
    else if (command === "mute") {
        msg.reply("Muting all imposters");
        msg.guild.channels.cache
            .filter(channel => channel.type === "voice" && channel.name === "Among Us")
            .first()
            .members
            .forEach(member => {
                if (!member.voice.mute) {
                    member.voice.setMute(true, "Among Us");
                }
            })
    }
    else if (command === "unmute") {
        msg.reply("Unmuting crewmembers");
        msg.guild.channels.cache
            .filter(channel => channel.type === "voice" && channel.name === "Among Us")
            .first()
            .members
            .forEach(member => {
                if (member.voice.mute) {
                    member.voice.setMute(false, "Among Us");
                }
            })
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);