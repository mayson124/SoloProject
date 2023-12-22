const express = require('express');
const router = express.Router();
const { fetchDataFromAPI } = require('./apiController');

router.get('/fetchAndInsertData', async (req, res) => {
  try {
    await fetchDataFromAPI();
    res.status(200).send('Data fetched and inserted successfully.');
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;