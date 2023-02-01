const crypto = require('crypto');

const generateEventUuid = (start, end) => {
    const hash = crypto.createHash('md5');
    return hash.update(`${start}${end}`).digest('hex');
}

module.exports = generateEventUuid;