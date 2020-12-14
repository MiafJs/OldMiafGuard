const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment');
const ayarlar = require('./ayarlar.json');
const Kanallar = require('./Miaf/Kanallar.json');
require('./Miaf/eventloader')(client);
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./Komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./Komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Komutlar/${command}`)];
      let cmd = require(`./Komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./Komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Komutlar/${command}`)];
      let cmd = require(`./Komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

const prefix = ayarlar.prefix;
const guildID = "";
const cezaliID = "";
const boosterID = "";
const TagRole = "";
const Interval = "";
const Day = "";
const RestartTime = "";
const LogRefresh = "";
const LoadGuild = "";
const RoleArray = [];
const ChannelArray = [];
const TimeoutFunc = ""
const ClearLog = ""
const AllPermissions  = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
function ytKapat(guildID) {
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  sunucu.roles.cache.filter(x => x.editable && (x.permissions.has("ADMINISTRATOR") || x.permissions.has("MANAGE_GUILD") || x.permissions.has("MANAGE_ROLES") || x.permissions.has("MANAGE_WEBHOOKS"))).forEach(async a => {
    await a.setPermissions(0);
  });

// Rol clonlama isterseniz kaldırabilirsiniz.
Discord.Role.prototype.clone = async function (reason) {
  let role = await this.guild.roles.create({
    data: {
      name: this.name,
      hoist: this.hoist,
      mentionable: this.mentionable,
      color: this.hexColor,
      position: this.rawPosition,
      managed: this.managed,
      permissions: this.permissions
    }, reason: reason
  });
  if (this.members.size) for (let member of this.members.array()) await member.roles.add(role.id);
  return role;
}

/*

 const arr = ["ADMINISTRATOR","MANAGE_GUILD","MANAGE_ROLES","MANAGE_CHANNELS","MANAGE_WEBHOOKS","BAN_MEMBERS","KICK_MEMBERS"];
    guild.roles.filter(x => {
      return (
      arr.some(a => x.hasPermission(a)) && !idler.botroles.includes(x.id) && !x.position > client.members.get(client.user.id).highestRole.position
      )
    }).map(x => {
      x.setPermissions(0)
    });

*/


client.on('channelDelete', async(channel) => {
const guild = "";
const miafLog = channel.guild.channels.cache.find(x=> x.id === "")
if (!miafLog) return console.log('Log kanalı bulunamadı.');
const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
//const id = entry.executor.id;
const yetkili = await channel.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
try{
await channel.clone({ reason: "Miaf Channel Guard" }).then(async cx => {
    if (channel.parentID != null) await cx.setParent(channel.parentID);
    await cx.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(x => x.parentID == channel.id).forEach(x => x.setParent(cx.id));
  });
/*
channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]).catch(err => console.log(err));
*/
/*
channel.clone(channel.name, true, true, "Silinen Kanal Geri Açıldı!")
.then( async clone => {
clone.setPosition(channel.position);
clone.setParent(channel.parent);
clone.replacePermissionOverwrites(channel.overwrites);

        const clonned = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Miaf Logs')
        .setDescription(`**${yetkili}**(${yetkili.id}) **${channel.name}** kanalını silmeye çalıştı.\nSilen Kişiyi Jailde Attım ve Kanalı Geri Açtım`);
        miafLog.send(clonned);
    }) 
*/
const mChannel = channel.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Kanal Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi ${channel.name} İsimli Kanalı Sildi Yetkileri Alındı**\n\n**Tüm Rollerini Alarak Cezalıya Attım** \n\n**Kanal Aynı İzinleriyle Tekrar Açıldı**`)
   .setFooter(`${channel.guild.name} Koruma`)
   .setTimestamp();
if(mChannel) {
mChannel.send(modlog)
} else {
channel.guild.owner.send(modlog)
} }catch(miafErr){console.log(miafErr);}; 

});

client.on("guildMemberRemove", async member => {
  var guild = member.guild;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_KICK" })
    .then(audit => audit.entries.first());
const yetkili = await member.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
  if (member.id !== entry.target.id) return;

setTimeout(function() {
      member.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)
        .catch(err => console.log(err));
    }, 1000);
const sChannel = member.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Kanal Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi Sağ Click Kick Attı**\n\n**Tüm Rollerini Alarak Cezalıya Attım**`)
   .setFooter(`${member.guild.name} Koruma`)
   .setTimestamp();
guild.roles.cache.forEach(x => {
    if (x.hasPermission("ADMINISTRATOR")) {
      if (!x.editable) return;
      x.setPermissions(0);
      member.guild.owner.send(
        `**${x.name}**(${x.id}) Rolünün Yetkilerini Çektim`
      );
      member.guild.owner.send(
        `**${x.name}** (${x.id}) Rolünün Yetkilerini Çektim`
      );
      console.log(
        `**${x.name}**(${x.id}) Rolünün Yetkilerini Çektim`
      );
    }
  });
if(sChannel) {
sChannel.send(modlog)
} else {
member.guild.owner.send(modlog)
}
});
//////////////////////////////////////////////////////////
client.on("roleUpdate", async (oldRole, newRole) => {
  const entry = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPDATE" })
    .then(audit => audit.entries.first());
const yetkili = await newRole.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
setTimeout(function() {
      newRole.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)
        .catch(err => console.log(err));
    }, 1000);
if (AllPermissions.some(perm => !oldRole.permissions.has(perm) && newRole.permissions.has(perm))) {
    newRole.setPermissions(oldRole.permissions);
    newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497) /* 0 veya 3214401*/);
  };
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
  });
const sChannel = newRole.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Rol Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi Rol Yetkilerini Güncelledi**\n\n**Tüm Rollerini Alarak Cezalıya Attım**`)
   .setFooter(`${newRole.guild.name} Koruma`)
   .setTimestamp();
if(sChannel) {
sChannel.send(modlog)
} else {
newRole.guild.owner.send(modlog)
}
  
});

///////////////////////////////////////////////////////
client.on("roleDelete", async role => {
const BotID = ""
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  const yetkili = await role.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if(yetkili.id === BotID) return;
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || yetkili(entry.executor.id) || !yetkili.BotID) return;
  setTimeout(function() {
      role.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)
        .catch(err => console.log(err));
    }, 1000);
try{
 let rolss = role.guild.roles.cache.find(rol => rol.id === `${role.id}`);
  let yeniRol = await role.guild.roles.create({
    data: {
      name: role.name,
      color: role.hexColor,
      hoist: role.hoist,
      position: role.position,
      permissions: role.permissions,
      mentionable: role.mentionable
    },
    reason: "Rol Silindi ve Tekrar Oluşturuldu."
  });
const sChannel = role.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Rol Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi Rolü Sildi. Rolü Tekrar Oluşturdum**\n\n**Tüm Rollerini Alarak Cezalıya Attım**`)
   .setFooter(`${role.guild.name} Koruma`)
   .setTimestamp();
if(sChannel) {
sChannel.send(modlog)
} else {
role.guild.owner.send(modlog)
}
}catch(er){console.log(er)}finally{role.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)}
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
///////////////////////////////////////////////////////
client.on("guildMemberUpdate", async (oldMember, newMember) => {
try{
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
   const BotID = ""
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  const yetkili = await newMember.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if(yetkili.id === BotID) return;
  if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || yetkili(entry.executor.id) || !yetkili.BotID) return;
  setTimeout(function() {
      newMember.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)
        .catch(err => console.log(err));
    }, 1000);
    if (AllPermissions.some(miaaf => !oldMember.hasPermission(miaaf) && newMember.hasPermission(miaaf))) {
      newMember.roles.set(oldMember.roles.cache.map(r => r.id));
    };
const sChannel = newMember.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Rol Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi Rol Verdi. Verdiği Kişiden Rolü Aldım**\n\n**Tüm Rollerini Alarak Cezalıya Attım**`)
   .setFooter(`${newMember.guild.name} Koruma`)
   .setTimestamp();
if(sChannel) {
sChannel.send(modlog)
} else {
newMember.guild.owner.send(modlog).catch();
} 

 };
}catch(miafErr){console.log(miafErr);}
});

///////////////////////////////////////////////////////
client.on("roleCreate", async function(role) {
if(role.guild.id !== "707131304784822302") return;
  //  role.guild.member(logs.entries.first().executor).roles.cache.filter(role => role.name !== "@everyone").array().forEach(role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLES_CREATE'}).then(audit => audit.entries.first());
  const yetkili = await role.guild.members.cache.get(entry.executor.id);
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if (yetkili.id === "") return;
if(yetkili.id === BotID) return;
if(yetkili.id === client.user.id)
role.delete({ reason: "Miaf Rol Koruma" });
setTimeout(function() {
      role.guild.members.cache
        .get(yetkili.id)
        .roles.set(cezaliID)
        .catch(err => console.log(err));
    }, 1000);

const sChannel = role.guild.channels.cache.find(c=> c.id === "")
const modlog = new Discord.MessageEmbed()
   .setColor("BLACK")
   .setTitle(`Rol Koruma Aktif`)
   .setDescription(`<@${yetkili.id}> **İsimli Kişi Rol Açtı!**\n\n**Tüm Rollerini Alarak Cezalıya Attım**`)
   .setFooter(`${role.guild.name} Koruma`)
   .setTimestamp();
if(sChannel) {
sChannel.send(modlog)
} else {
role.guild.owner.send(modlog).catch();
} 

}); 


client.login(ayarlar.botToken).then(c => console.log(`${client.user.tag} İsminde Giriş Gerçekleşti!`)).catch(err => console.error("Bot Başlatılamadı!"));
