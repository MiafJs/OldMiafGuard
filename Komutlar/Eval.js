const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  try {
   var code = args.join(" ");
   var evaled = eval(code);

  if (typeof evaled !== "string")
  evaled = require("util").inspect(evaled);

  message.channel.send(`${clean(evaled)}`, {code:"js"});
    } catch (err) {
  message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
 function clean(text) {
   if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
     else
    return text;
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'eval'
};
