const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const Discord = require('discord.js');
const BeklemeSüre = new Set();
module.exports = async (message) => {
  if (BeklemeSüre.has(message.author.id)) {
  return;
  }
  BeklemeSüre.add(message.author.id);
  setTimeout(() => {
  BeklemeSüre.delete(message.author.id);
  }, 5000);
  const client = message.client;
  const prefix = ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
    } else {
    }
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
