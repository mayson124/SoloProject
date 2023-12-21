const fetch = require('node-fetch');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `swapiController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: 'swapiController.getMoreCharacterData: ERROR: Check server logs for details' }
  };
};

const nbaapiController = {};

// MIDDLEWARE TO GET MORE CHARACTER DATA



nbaapiController.getMorePlayerData = async (req, res, next) => {
  (err, chars) => {
    if (err) return next(createErr({
      method: 'getMorePlayerData',
      type: 'reading file',
      err,
    }));
  };  
  const id = req.params.id; 
  const fetchData = await fetch('https://www.balldontlie.io/api/v1/players' + id);
    
  const playerData = await fetchData.json();
  res.locals.playerData = playerData;
  return next();
};
// ADD MIDDLEWARE TO GET MORE CHARACTERS HERE


// EXPORT THE CONTROLLER HERE
module.exports = nbaapiController;