const crypto = require('crypto');
const _ = require('lodash');

function hash(input) {
  if (_.isNil(input)) {
    throw new Error('Error creating hash value');
  }

  const hash = crypto.createHash('sha256');
  const hashedData = hash.update(input).digest('hex');

  return hashedData;
}

module.exports = {
  hash
};
