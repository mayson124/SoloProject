const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const apiRouter = require('./apiRouter');
const { fetchDataFromAPI } = require('./apiController');

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../src')));

app.use('/api', apiRouter);

app.get('/fetchAndInsertData', async (req, res) => {
  try {
    await fetchDataFromAPI();
    res.status(200).send('Data fetched and inserted successfully.');
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).send('Internal Server Error');
  }
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('You just got crossed over'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;