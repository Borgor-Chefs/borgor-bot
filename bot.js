//Borgor-Bot at its finest!
require("dotenv").config()
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const { CommandInteraction } = require("discord.js")
const { Client, Intents, Collection } = require("discord.js")
const fs = require("fs")

//Setting up Bot Permissions
const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
})


//Registering command files
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
const commands = [];
client.commands = new Collection()

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
    console.log(`Loaded command ${file} to bot!`)
}

//When the bot is online and running!
client.on('ready', (bot)=>{
    console.log(bot.user.username + " is alive!")

    const CLIENT_ID = client.user.id

    const rest = new REST({
        version: "10"
    }).setToken(process.env.BOTTOKEN);

    (async ()=>{
        try{
            if(process.env.ENV === "production"){
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                })
                console.log("Commands registered globally!")
            } else{
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD), {
                    body: commands
                })
                console.log("Commands registered onto local server!")
            }
        } catch(err){
            if (err) console.error(err)
        }
    })()
})

//On interaction
client.on('interactionCreate', async (interaction) =>{
    if(interaction.isCommand()){
        const command = client.commands.get(interaction.commandName)

        if(!command) return

        try{
            await command.execute(interaction, client)
        } catch(err){
            if (err) console.error(err)

            await interaction.reply({
                content: "An error occured while executing that command.",
                ephemeral: true
            })
        }
    }
})


//Logging into Discord API
client.login(process.env.BOTTOKEN)