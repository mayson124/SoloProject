const fetch = require('node-fetch');
const { Client } = require('pg');

const connectionString = 'postgres://pyvnvobl:brGdEGX-GguwjQVnezrGY_-liN-KLFIx@bubble.db.elephantsql.com/pyvnvobl';
const client = new Client({ connectionString });

async function createTable() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS nba_stats (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255),
        points INT,
        assists INT,
        blocks INT,
        defensive_rebounds INT,
        three_point_pct DECIMAL(5, 2),
        three_point_attempts INT,
        three_point_made INT,
        field_goal_pct DECIMAL(5, 3),
        field_goal_attempts INT,
        field_goal_made INT,
        free_throw_pct DECIMAL(5, 2),
        free_throw_attempts INT,
        free_throw_made INT,
        game_date TIMESTAMP,
        minutes_played INTERVAL,
        offensive_rebounds INT,
        personal_fouls INT,
        steals INT,
        team_abbreviation VARCHAR(10),
        turnovers INT,
        created_at TIMESTAMP DEFAULT current_timestamp
      );
    `;
    await client.query(createTableQuery);

    console.log('Table created or already exists.');

  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Disconnect from the database
    await client.end();
  }
}

async function fetchDataFromAPI() {
  try {
    // Fetch data from the API
    const response = await fetch('https://www.balldontlie.io/api/v1/stats');
    const data = await response.json();

    // Connect to the PostgreSQL database
    await client.connect();

    // Create the table
    await createTable();

    // Insert data into the database
    for (const item of data.data) {
      const game = item.game;
      const player = item.player;
      const team = item.team;

      const query = `
        INSERT INTO nba_stats(
          player_name, points, assists, blocks, defensive_rebounds,
          three_point_pct, three_point_attempts, three_point_made,
          field_goal_pct, field_goal_attempts, field_goal_made,
          free_throw_pct, free_throw_attempts, free_throw_made,
          game_date, minutes_played, offensive_rebounds,
          personal_fouls, steals, team_abbreviation,
          turnovers
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        ON CONFLICT (player_name, game_date) DO NOTHING;  -- Avoid inserting duplicate entries
      `;
      
      const values = [
        `${player.first_name} ${player.last_name}`,
        item.pts,
        item.ast,
        item.blk,
        item.dreb,
        item.fg3_pct,
        item.fg3a,
        item.fg3m,
        item.fg_pct,
        item.fga,
        item.fgm,
        item.ft_pct,
        item.fta,
        item.ftm,
        game.date,
        item.min,
        item.oreb,
        item.pf,
        item.stl,
        team.abbreviation,
        item.turnover
      ];

      await client.query(query, values);
    }

    console.log('Data inserted successfully.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Disconnect from the database
    await client.end();
  }
}

// Call the function to fetch and insert data
fetchDataFromAPI();