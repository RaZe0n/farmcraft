const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

  return message.channel.send('IP: play.farmcraft.nl');

}

module.exports.help = {
  name: "ip"
}
