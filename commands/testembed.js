const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

  var testEmbed = new discord.MessageEmbed()
    //.setTitle(`Welkom op de server` )
    .setTitle(`${message.guild.name} Tickets`, message.guild.iconURL)
    .setColor("#f16411")
    .setDescription("Een stafflid zal zo op je vraag antwoorden!")
    .setThumbnail("https://i.imgur.com/mFfEmkE.png")
    .setTimestamp()
    .setFooter("Aangemaakt:");

  return message.channel.send(testEmbed), message.channel.send("@support");

}

module.exports.help = {
  name: "testembed"
}
