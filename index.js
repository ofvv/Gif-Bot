const discord = require('discord.js');
const config = require('./config.json');
const client = new discord.Client();

client.on('ready', async () => {
  const logs = [
    `${client.user.username}`,
    `Gif Channel => #${client.channels.cache.get(config.channels.gif).name} in ${client.channels.cache.get(config.channels.gif).guild.name}`,
    `Icon Channel => #${client.channels.cache.get(config.channels.icon).name} in ${client.channels.cache.get(config.channels.icon).guild.name}`
  ]
  console.log(logs.join('\n'))
})

client.on('userUpdate', async (oldu, newu) => {
  const oldav = oldu.displayAvatarURL({
    dynamic: true
  });
  const newav = newu.displayAvatarURL({
    dynamic: true
  });
  if (oldav != newav) {
    let embed = new discord.MessageEmbed()
      .setImage(newav)
      .setFooter(newu.id)
      .setColor('#000001')
    if (newav.includes('.gif')) {
      client.channels.cache.get(config.channels.gif).send(embed)
    } else {
      client.channels.cache.get(config.channels.icon).send(embed)
    }
  }
})


client.login(config.bot.token)
