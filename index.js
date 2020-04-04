const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const token = process.env.token;

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if(jsFiles.length <= 0) {
    console.log("No files found");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./commands/${f}`);
    console.log(`The file ${f} is loaded`);

    bot.commands.set(fileGet.help.name, fileGet);

  });


});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`)
  console.log("<=========LOGS========>")

  bot.user.setActivity("Getting developed", {type: "WATCHING"});
})

bot.on("guildMemberAdd", member =>{

    var welcomeEmbed = new discord.MessageEmbed()
      .setTitle(`Welkom op de server ${member.user.username}!` )
      .setColor("#f16411")
      .setDescription("Veel plezier op de server!")
      .setThumbnail("https://i.imgur.com/mFfEmkE.png")
      .setTimestamp()
      .setFooter("Gejoined:");

    const welcomeChannel = member.guild.channels.cache.find(c => c.name === "welkom");
    if(!welcomeChannel) return;

    welcomeChannel.send(welcomeEmbed);

});


    //const { Client } = require("discord.js");
    //const bota = new Client();

bot.on("message", message => {
  if(message.channel.id === "695765656921964555") message.react("👍"), message.react("👎");

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(' ');

  var command = messageArray[0];

  var args = messageArray.slice(1);  var commands = bot.commands.get(command.slice(prefix.length));

  if(commands) commands.run(bot, message, args);

  if(message.content.toLowerCase() === '!createticket' && message.channel.id === '695985618785927199'){
    let guild = message.guild;
    guild.channels.create(`${message.author.username}-ticket`, {
      type: 'text',
      permissionOverwrites: [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id
        },
        {
          deny: 'VIEW_CHANNEL',
          id: guild.id
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '695715629189169322'
        }
      ]
    }).then(channel => {
    let category = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");

    let supportChannel = message.guild.channels.cache.find(c => c.name == `${message.author.username.toLowerCase()}-ticket`);

    var support = message.guild.roles.cache.get(`695715629189169322`);

    var testEmbed = new discord.MessageEmbed()
      .setTitle(`${message.guild.name} | Tickets`, message.guild.iconURL)
      .setColor("#f16411")
      .setDescription("Een stafflid zal zo op je vraag antwoorden!")
      .setThumbnail("https://i.imgur.com/mFfEmkE.png")
      .setTimestamp()
      .setFooter("Aangemaakt:");

    bot.channels.cache.find(c => c.name == `${message.author.username}-ticket`)
      supportChannel.send(`${support}`);
      supportChannel.send(testEmbed);
      //supportChannel.send(`${message.author.tag}`);

    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
  }).catch(console.error);
  }
  if(message.content.toLowerCase() === '!close') {
    var endMS = "10000"
    const categoryId = '680478197795520614'
    if(message.channel.parentID == categoryId){
      var closeEmbed = new discord.MessageEmbed()
        .setTitle(`${message.guild.name} Tickets`, message.guild.iconURL)
        .setColor("#f16411")
        .setDescription("Deze ticket zal over 10 seconden sluiten!")
        .setTimestamp()
        .setFooter("Gesloten:");

      message.channel.send(closeEmbed).then(msg => {
        setTimeout(function(){
          message.channel.delete();
        }, endMS);
      })
    }else{
      message.channel.send("Kan alleen in een ticket gebruikt worden!").catch(console.error);
    }
  }

  //Developer debug close.
  if(message.content.toLowerCase() === '!devclose') {
    const categoryId = '680478197795520614'

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return;

    if(message.channel.parentID == categoryId){
          message.channel.delete();
    }else{
      message.channel.send("Kan alleen in een ticket gebruikt worden!").catch(console.error);
    }
  }

});


bot.login(token);
