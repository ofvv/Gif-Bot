const discord = require('discord.js');
const config = require('./config.json');
const client = new discord.Client();

client.on('ready', async () => {
  const logs = [
    `${client.user.username}`,
    `Gif Channel => #${client.channels.cache.get(config.channels.gif).name || 'No Channel'} in ${client.channels.cache.get(config.channels.gif).guild.name || 'No Server'}`,
    `Icon Channel => #${client.channels.cache.get(config.channels.icon).name || 'No Channel'} in ${client.channels.cache.get(config.channels.icon).guild.name || 'No Server'}`,
    `${client.users.cache.size} Users`,
    `${client.guilds.cache.size} Guilds`
  ]
  console.log(logs.join('\n'))
})

client.on('userUpdate', async (oldu, newu) => {
  if (newu.bot) return;
  if (oldu.displayAvatarURL() != newu.displayAvatarURL()) {
    let embed = new discord.MessageEmbed()
      .setImage(newu.displayAvatarURL({
        dynamic: true,
        size: 4096
      }))
      .setFooter(newu.id)
      .setColor('#000001')
    if (newu.displayAvatarURL({
        dynamic: true
      }).includes('.gif')) {
      client.channels.cache.get(config.channels.gif).send(embed).catch(() => {})
    } else {
      client.channels.cache.get(config.channels.icon).send(embed).catch(() => {})
    }
  }
})


client.login(config.bot.token)
