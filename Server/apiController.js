const fetch = require('node-fetch');
const { Client } = require('pg');

const connectionString = 'postgres://pyvnvobl:brGdEGX-GguwjQVnezrGY_-liN-KLFIx@bubble.db.elephantsql.com/pyvnvobl';
const client = new Client({ connectionString });

async function insertDataIntoTable(data) {
  try {
    await client.connect();

    for (const item of data) {
      if (!item || !item.player || !item.player.first_name || !item.player.last_name) {
        console.error('Skipping invalid data:', item);
        continue; // Skip invalid data
      }

      const query = `
        INSERT INTO nba_stats (player_name, points, assists, rebounds, steals, blocks)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        `${item.player.first_name} ${item.player.last_name}`,
        item.pts || 0,
        item.ast || 0,
        item.reb || 0,
        item.stl || 0,
        item.blk || 0,
      ];

      await client.query(query, values);
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://www.balldontlie.io/api/v1/stats');
    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      console.error('Invalid API response format:', data);
      return;
    }

    await insertDataIntoTable(data.data);

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
}

module.exports = {
  fetchDataFromAPI,
  insertDataIntoTable, 
};