const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

  if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

  var closeEmbed = new discord.MessageEmbed()
    //.setTitle(`Welkom op de server` )
    .setTitle(`${message.guild.name} Tickets`, message.guild.iconURL)
    .setColor("#f16411")
    .setDescription("Deze ticket zal over 10 seconden sluiten!")
    .setTimestamp()
    .setFooter("Gesloten:");

  return message.channel.send(closeEmbed);

}

module.exports.help = {
  name: "closeembed"
}
