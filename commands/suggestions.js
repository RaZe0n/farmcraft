const discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js")

module.exports.run = async(bot, message, args) =>{

  return message.channel.send('IP: play.farmcraft.com');

}

module.exports.help = {
  name: "idee"
}