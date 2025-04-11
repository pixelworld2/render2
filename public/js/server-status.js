async function updateServerStatus() {
  try {
      // Replace with your server's API endpoint
      const response = await fetch('https://api.anagra.net/server-status');
      const data = await response.json();

      // Update total players
      document.querySelector('.total-players .player-count').textContent = data.totalPlayers;

      // Update individual server counts
      const servers = ['survival', 'lifesteal', 'bedwars', 'cultivation'];
      servers.forEach(server => {
          if (data[server]) {
              const serverCard = document.querySelector(`.${server} .player-count`);
              const statusDot = document.querySelector(`.${server} .status-dot`);

              serverCard.textContent = `${data[server].players} Players`;
              statusDot.classList.toggle('online', data[server].online);
          }
      });
  } catch (error) {
      console.error('Failed to fetch server status:', error);
  }
}

// Update every 30 seconds
setInterval(updateServerStatus, 30000);
// Initial update
updateServerStatus();