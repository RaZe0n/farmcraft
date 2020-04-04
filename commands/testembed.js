const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

  var testEmbed = new discord.MessageEmbed()
    .setTitle(`Welkom op de server ${member.user.username}!` )
    .setAuthor(`${message.guild.name} Tickets`, message.guild.iconURL)
    .setColor("#f16411")
    .setDescription("Veel plezier op de server!")
    .setThumbnail("https://i.imgur.com/mFfEmkE.png")
    .setTimestamp()
    .setFooter("Gejoined:");

  return message.channel.send(testEmbed);

}

module.exports.help = {
  name: "testembed"
}
