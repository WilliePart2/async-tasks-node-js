const logger = require('../logger');
const { logLevels, config } = require('./config');

global.Promise = class PatchedPromise extends Promise {
  constructor(...args) {
    super(...args);

    this._logger = logger.getPromisesQueueLogger();
    this._logger.log('register');
  }

  then(resolve, reject) {
    this._logger.log('then');

    const result = super.then(
      () => {
        this._logger.log('resolve');
        return resolve && resolve();
      },
      () => {
        this._logger.log('reject');
        return resolve && reject();
      }
    );

    if (config.promiseLogLevel === logLevels.FULL) {
      this._logger.log(`result: ${result}`);
    }

    return result;
  }
};
