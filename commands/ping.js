const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Responds with Pong!"),
    execute: async (interaction)=>{
        interaction.reply({
            content: "Pong!",
            ephemeral: true
        })
    }
}