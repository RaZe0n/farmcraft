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

bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(' ');

  var command = messageArray[0];

  var args = messageArray.slice(1);

  var commands = bot.commands.get(command.slice(prefix.length));

  if(commands) commands.run(bot, message, args);

  //Ticket command
  if(command === '>ticket'){

    const categoryId = "680478197795520614";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    //var embedCreateTicket = new discord.MessageEmbed()
    //  .setTitle("Hello, " + message.author.username)
    //  .setFooter("Support channel is getting created.");

    //message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

      createdChan.setParent(categoryId).then((settedParent) => {

        settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), {"READ_MESSAGES": false, "SEND_MESSAGES": false, "VIEW_CHANNEL": false});

        settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true, "ATTACH_FILES": true, "CONNECT": true, "CREATE_INSTANT_INVITE": false, "VIEW_CHANNEL": true});

        var embedParent = new discord.MessageEmbed()
          .setTitle("Hello, " + message.author.username)
          .setDescription("Type your message here, to close your ticket use: >closeticket");

        settedParent.send(embedParent);

      })

    })

  }
})

bot.login(token);
