const Discord = require('discord.js');
require('events').EventEmitter.defaultMaxListeners = 300;
const moment = require("moment")
require("dotenv").config
const client = new Discord.Client();
const prefix = "";


const fs = require('fs');
const { registerFont } = require('canvas');
const { Canvas, resolveImage } = require('canvas-constructor');
registerFont('./Impact.ttf', { family: 'shark' });




let leave = JSON.parse(fs.readFileSync("./leave.json", 'utf8'));


client.on('message', message => {
  if(message.content.startsWith(prefix + "set-leave")){
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

   var args = message.content.split(" ").slice(" ").join(" ");
    if(!args) return message.channel.send("Mention The Room");
 
var chleave = message.mentions.channels.first() ;
 
    if(!chleave) return message.channel.send("I Can't Find This Room ");

    message.channel.send(`**Done ,  ${chleave} As The Leave Channel**`)

    leave[message.guild.id] = {
channel: chleave.name,
servername: message.guild.name,
  serverid: message.guild.id

}

fs.writeFile("./leave.json", JSON.stringify(leave), (err) => {
if(err)
console.error(err);

})
  }
  })
  const leaves= "https://media.discordapp.net/attachments/805367065204490240/822450212010197002/image0.jpg?width=1089&height=612";

client.on('guildMemberRemove', async member => { 
  userimg = member.user.displayAvatarURL({format : 'png'}),
   AVATAR = await resolveImage(userimg)

  var chnls =  member.guild.channels.cache.find(c => c.name === `${leave[member.guild.id].channel}`)
   if(!chnls) return;
  const image = await resolveImage(leaves);
  async function shark() {
            const ctx = new Canvas(1089, 612)

				.printImage(image, 0, 0, 1089, 612)
        .printCircularImage(AVATAR, 250 , 300, 170)

	.setTextSize(50)
	.setTextFont("shark")
.setColor("#fff")
.printText(member.user.username ,530, 350 ) 
.printText(`Good Bye` , 530 , 250) 




.toBuffer();

            return ctx;


        }

        chnls.send({
            files: [{ attachment: await shark(), name: 'canvas.png' }] 
        });

 
      chnls.send(`** 
      \`-\`Good Bye
      \`-\`${member}
      \`-\`Member Counts : ${member.guild.memberCount} **`)
   
  
});


//


let welc = JSON.parse(fs.readFileSync("./welc.json", 'utf8'));


client.on('message', message => {
  if(message.content.startsWith(prefix + "set-welcome")){
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

   var args = message.content.split(" ").slice(" ").join(" ");
    if(!args) return message.channel.send("Mention The Room");
 
var channelwelc = message.mentions.channels.first() ;
 
    if(!channelwelc) return message.channel.send("I Can't Find This Room ");

    message.channel.send(`**Done ,  ${channelwelc} As The Welcome Channel**`)

    welc[message.guild.id] = {
channel: channelwelc.name,
servername: message.guild.name,
  serverid: message.guild.id

}

fs.writeFile("./welc.json", JSON.stringify(welc), (err) => {
if(err)
console.error(err);

})
  }
  })



const wlcm =     'https://media.discordapp.net/attachments/813709350744621098/819536237873463326/image0.jpg?width=1089&height=612';


 client.on('guildMemberAdd', async member => {
  const image = await resolveImage(wlcm);
  userimg = member.user.displayAvatarURL({format : 'png'}),
AVATAR = await resolveImage(userimg)

  var chnl =  member.guild.channels.cache.find(c => c.name === `${welc[member.guild.id].channel}`)
  if(!chnl) return 

  async function shark() {
			const ctx = new Canvas(1089, 612)

				.printImage(image, 0, 0, 1089, 612)
        .printCircularImage(AVATAR, 250 , 300, 170)

	.setTextSize(50)
	.setTextFont("shark")
.setColor("#fff")
.printText(member.user.username ,530, 350 ) 
.printText(`Welcome`, 530 , 250)
.printText(`To ${member.guild.name}`, 530  , 480)




.toBuffer();

			return ctx;


		}

		chnl.send({
			files: [{ attachment: await shark(), name: 'canvas.png' }] 
		}); 
      chnl.send(`**\`-\` Welcome To ${member.guild.name} 
      \`-\`User : ${member}
      \`-\`Member Counts : ${member.guild.memberCount} **`)
 
});


client.login(process.env.token)