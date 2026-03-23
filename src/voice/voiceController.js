module.exports = {
  async sync(channel, allowed) {
    for (const [id, member] of channel.members) {
      const mute = !allowed.includes(id);
      await member.voice.setMute(mute).catch(() => {});
    }
  }
};