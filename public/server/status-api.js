const util = require('minecraft-server-util');

async function getServerStatus(host, port) {
    try {
        const result = await util.status(host, port);
        return {
            online: true,
            players: result.players.online
        };
    } catch (error) {
        return {
            online: false,
            players: 0
        };
    }
}

// Example API endpoint implementation
app.get('/api/server-status', async (req, res) => {
    const servers = {
        survival: await getServerStatus('in-1.firenodes.in', 25571),
        lifesteal: await getServerStatus('lifesteal.anagra.net', 25566),
        bedwars: await getServerStatus('bedwars.anagra.net', 25567),
        cultivation: await getServerStatus('cultivation.anagra.net', 25568)
    };

    const totalPlayers = Object.values(servers)
        .reduce((total, server) => total + server.players, 0);

    res.json({
        totalPlayers,
        ...servers
    });
});