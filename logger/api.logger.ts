const pine = require('pine');

const logger = pine();

export class APILogger {

    info(message, data) {
        logger.info(`${message}   ${data != undefined ? JSON.stringify(data) : ''}`);
    }

    error(message) {
        logger.error(message);
    }
}