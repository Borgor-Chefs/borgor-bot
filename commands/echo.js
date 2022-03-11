const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("echo")
            .setDescription("Echos your message!")
            .addStringOption((option) =>{
                option.setName("message")
                      .setDescription("Message to echo")
                      .setRequired(true)
                return option
            }),
    execute: async (interaction)=>{
        await interaction.reply(interaction.options.getString("message"))
    }
}