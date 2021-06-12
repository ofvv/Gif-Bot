const discord = require('discord.js');
const config = require('./config.json');
const client = new discord.Client();

client.on('ready', async () => {
  console.log(client.user.username)
})

client.on('userUpdate', async (oldu, newu) => {
  if (oldu.displayAvatarURL({dynamic: true}) != newu.displayAvatarURL({dynamic: true})) {
    let embed = new discord.MessageEmbed()
    .setImage(newu.displayAvatarURL({dynamic: true}))
    .setFooter(newu.id)
    .setColor('#000001')
    client.channels.cache.get(config.channel).send(embed)
  }
})


client.login(config.bot.token)
