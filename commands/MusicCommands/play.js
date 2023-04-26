const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music in a voice call!")
    .addStringOption((option) =>
        option
            .setName("search")
            .setDescription("Can be a Link or Search Terms")
            .setRequired(true)
    )
    ,
    async execute(interaction) {
        // interaction.reply({content: "Playing stuff", ephemeral: true})

        if(!interaction.member.voice.channel){
            interaction.reply({content: "You must be in a Voice Channel to use this command!", ephemeral: true})
            return
        }

        let embed = new EmbedBuilder()

        const query = interaction.options.getString("search")

        try{
            await interaction.client.player.play(interaction.member.voice.channel, query)
        } catch(error){
            console.log(error)
        }

        
        interaction.reply({content: "Playing stuff", ephemeral: true})
    }
}