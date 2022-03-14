const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("botmessage")
            .setDescription("Send a message from the bot to your discord channel!")
            .addStringOption((option) =>{
                option.setName("message")
                      .setDescription("Message to send")
                      .setRequired(true)
                return option
            }),
    execute: async (interaction, client)=>{
        await interaction.reply({
            content: "Sending your message!",
            ephemeral: true
        })
        const channel = client.channels.cache.find(channel => channel.id == interaction.channelId)
        await channel.send(interaction.options.getString("message"))
    },
    hasPermission: true,
    PermissionSettings: {
        "ROLE": {
            "951694488605184050": true
        },
        "USER": {}
    },

}