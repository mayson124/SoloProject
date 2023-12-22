const fetch = require('node-fetch');
const { Client } = require('pg');

const connectionString = 'postgres://pyvnvobl:brGdEGX-GguwjQVnezrGY_-liN-KLFIx@bubble.db.elephantsql.com/pyvnvobl';
const client = new Client({ connectionString });

async function insertDataIntoTable(data) {
  try {
    await client.connect();

    for (const item of data.results) {
      if (!item || !item.player_name) {
        console.error('Skipping invalid data:', item);
        continue; 
      }

      const query = `
        INSERT INTO nba_stats (player_name, points, assists, rebounds, steals, blocks)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        `${item.player_name}`,
        item.PTS || 0,
        item.AST || 0,
        item.TRB || 0,
        item.STL || 0,
        item.BLK || 0,
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
    const response = await fetch('https://nba-stats-db.herokuapp.com/api/playerdata/season/2023');
    const data = await response.json();

    if (!data || !Array.isArray(data.results)) {
      console.error('Invalid API response format:', data);
      return;
    }

    await insertDataIntoTable(data.results);

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
}

module.exports = {
  fetchDataFromAPI,
  insertDataIntoTable
};