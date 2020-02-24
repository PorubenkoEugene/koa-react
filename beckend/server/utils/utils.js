import crypto from 'crypto';
import _  from 'lodash';

export function hash(input) {
  if (_.isNil(input)) {
    throw new Error('Error creating hash value');
  }
  const hash = crypto.createHash('sha256');
  return hash.update(input).digest('hex');
}

export default {
  hash
};
