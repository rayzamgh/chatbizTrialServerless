const defaultMessage = 'Help: To use me, input `json`, or `meme` command';

function getResp(input) {
  // eslint-disable-next-line global-require
  const responseJson = require('./responselist.json');

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(responseJson)) {
    if (input === key) {
      return (value);
    }
  }

  return (defaultMessage);
}

module.exports = {
  getResp,
};
