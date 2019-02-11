
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

//Scripteo del bot.
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log('Cliente iniciado correctamente.');
 client.user.setPresence({
       status: "online",
       game: {
           name: "Por tu camara Sin Miedo socio |tb!help",
           url: "https://www.twitch.tv/fanatics1227",
           type: "WATCHING"
       }
   });
});

let prefix = config.prefix;

client.on('message', async message => {
if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === 'ping'){
   let ping = Math.floor(message.client.ping);
   message.channel.send(':ping_pong: `'+ping+' ms.` desde glitch.'); 
}
  
if(command === "hola"){
   message.channel.send("Hola " + message.author + ", ¿cómo estas? :wink:")
}

if(command === "avatar"){
let miembro = message.mentions.users.first()
if (!miembro) {
    const embed = new Discord.RichEmbed()
        .setAuthor("🖼 Avatar de " + message.author.tag + ":")
        .setImage(`${message.author.avatarURL}`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
    message.channel.send({ embed });
} else {
    const embed = new Discord.RichEmbed()
        .setAuthor("🖼 Avatar de " + miembro.tag + ":")
        .setImage(`${miembro.avatarURL}`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
    message.channel.send({ embed });
};
}

if(command === "say"){
  let decir = args.join(" ");
  if(!decir) return message.channel.send(":x: Pon que quieres que diga.")
  message.delete(1000);//no borren eso
  message.channel.send(decir);
}

  if(command === "ban"){
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: No tienes el permiso `BAN_MEMBERS`.")
    let ban = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.send(":x: Debes mencionar a alguien.")
    let Razon = args.join(" ").slice(1);
    if(!Razon) return message.channel.send(":x: Debes poner una razón.");
    if (!message.guild.member(ban).bannable) return message.channel.send(':x: No puedo banear al usuario mencionado.');
    message.guild.member(ban).ban(Razon)
  	message.channel.send(":ok: " + ban + "ha sido banneado del servidor.\nRazón: `" + Razon + "`");
  }

if(command === "mute") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No tienes el permiso `MANAGE_MESSAGES`.")
    let user = message.mentions.members.first() || message.author;
    if (message.mentions.users.size < 1) return message.channel.send(":x: Menciona a un usuario.");
    let razon = args.join(" ").slice(1);
    if(!razon) return message.reply(":x: Pon una razón.");
    let role = message.guild.roles.find(r => r.name === "muted");
    if (!role) return message.reply(":x: El rol `Muted` no existe.");
    user.addRole(role);
    message.channel.send(":ok: " + user + ", has sido muteado por " + razon + ". :wink:")
  }
  
if(command === "unmute"){
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: No tienes el permiso `MANAGE_MESSAGES`.")
   let user = message.mentions.members.first() || message.author;
   let role = message.guild.roles.find(r => r.name === "muted");
   if (message.mentions.users.size < 1) return message.channel.send(":x: Debes mencionar a alguien para desmutearlo (si es que lo esta).")
   user.removeRole(role);
   message.channel.send(user + ", has sido desmuteado! :smile:");
   }

if(command === "clean"){
  //var perms = message.member.hasPermission("BAN_MEMBERS");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: No tienes el permiso `MANAGE_MESSAGES`.")
      if(!args[0]) return message.channel.send(":x: Pon el número deseado entre 1-100.")
      let number = args[0]
     if(isNaN(number)) return message.channel.send(":x: Necesitas escribir un número, no letras ni símbolos.")
      number = parseInt(number)
      if(number >= 100 || number <= 0) return message.channel.send(":x: El valor es inválido.")
      message.channel.bulkDelete(number + 1 ).then( () => {
        message.channel.send(`:x: He borrado ${number} mensajes.`).then(m => m.delete(5000))
      }).catch(error => {
        message.channel.send(`:x: ¡UPS! Ha ocurrido un error: ${error.message}`)
      })
  
    }

  if(command === "kick"){
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No tienes el permiso `KICK_MEMBERS`.")
  let user = message.mentions.users.first();
  let Razon = args.join(" ").slice(22);
   if(!user) return message.channel.send(":x: Debes mencionar a alguien.")
   if(!Razon)return message.channel.send(":x: Debes poner una razón.")
   message.guild.member(user).kick(Razon);
  message.channel.send(":ok: " + user + " ha sido pateado del servidor.\nRazón: " + Razon);
  }

  if(command === "addrol") {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: No tienes el permiso `MANAGE_ROLES`.")
    let user = message.mentions.members.first()
    if(message.mentions.users.size < 1) return message.channel.send(":x: Debes mencionar a alguien.")
    let rolid = args.join(" ").slice(1);
    if(!rolid) return message.channel.send(":x: Debes poner el ID del rol sin <@& y sin >")
    let mirol = message.guild.roles.get(rolid);
    user.addRole(mirol);
    message.channel.send(":ok: " + user + " ahora tiene el rol <@&" + rolid + ">");
  }
  if(command === "help") {
  message.channel.send("**Ayuda**:")
  message.channel.send("Comandos: tb!comandos")
  message.channel.send("Suscribete a mi Dueño : https://www.youtube.com/channel/UCZEw8SO0CfMDFLW7FpEDRTw")
  }
  if(command === "comandos") {
    	let embed = new Discord.RichEmbed()
.setTitle("Comandos de Bot & Safe:")
.setColor(3447003)
.addField("tb!ping", "pong!", true)
.addField("tb!hola", "Te mando un saludo.", true)
.addField("tb!avatar", "Ve un avatar.", true)
.addField("tb!say [Lo que quieres que diga]", "Digo lo que quieras.", true)
.addField("tb!ban [usuario]", "Da ban a un usuario.", true)
.addField("tb!mute [usuario]", "Pon mute a un usuario.", true)
.addField("tb!unmute [usuario]", "Quita el mute a un usuario.", true)
.addField("tb!clean [1 - 100]", "Borra mensajes.", true)
.addField("tb!kick [usuario]", "Patea a alguien del servidor.", true)
.addField("tb!addrol [usuario] [rol id]", "Da un rol a un usuario.", true)
.addBlankField(true)
message.channel.send(embed);
  }
  
});

  client.on("guildMemberAdd", (member) => {
   console.log(`Nuevo usuario:  ${member.user.username} se ha unido a ${member.guild.name}.`);
   var canal = client.channels.get('540016921039601677');
   canal.send(`${member.user}, bienvenido al servidor, pasala bien. :wink:`);
  });

client.on("guildMemberRemove", (member) => {
    console.log(`${member.user.username} ha dejado el servidor ${member.guild.name}.`);
    let canal = client.channels.get('540017076186644500'); 
    canal.send(`${member.user}, ha dejado el servidor.`);
});
client.login(process.env.TOKEN);
