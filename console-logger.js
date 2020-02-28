/**
 * @description Logger allowed types.
 * @type {{warn: string, trace: string, debug: string, log: string, assert: string, clear: string, error: string}}
 */
export const loggerTypes = {
    assert: 'assert',
    clear: 'clear',
    debug: 'debug',
    dir: 'dir',
    error: 'error',
    info: 'info',
    log: 'log',
    trace: 'trace',
    warn: 'warn'
};

/**
 * @description Default object config for fetch.
 * @type {{mode: string, redirect: string, headers: {'Content-Type': string}, cache: string, method: string}}
 */
const fetchHeadersConfig = {
    cache: 'no-cache',
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    mode: 'cors',
    redirect: 'follow'
};

/**
 * @description Convert log information to string.
 * @param {any} logInformation - Log information to convert.
 * @returns {string} - Stringified information.
 */
const getLogInformationString = logInformation => {
    let stringifiedLogInformation;

    if(typeof logInformation === 'object') {
        stringifiedLogInformation = JSON.stringify(logInformation);
    } else {
        stringifiedLogInformation = String(logInformation);
    }

    return stringifiedLogInformation;
};

/**
 * @description Get formatted body content to send.
 * @param {object} params - Params.
 * @param {string} params.callbackParamName - Name of the param to post.
 * @param {Error} params.errorStackTrace - The stackTrace to log.
 * @param {string<loggerTypes>} params.loggerType - Log type to send.
 * @param {any} params.logInformation - Information to send.
 * @returns {string} - Formatted body.
 */
const getFetchBodyContent = ({
    callbackParamName,
    errorStackTrace,
    loggerType,
    logInformation
}) => JSON.stringify({[callbackParamName]: `${loggerType}:\n${getLogInformationString(logInformation)}\n${errorStackTrace.stack}`});

/**
 * @description Send the log request to server.
 * @param {object} params - Params.
 * @param {object} params.callbackHeaderConfig - Headers object.
 * @param {string} params.callbackParamName - Name of the param to post.
 * @param {string} params.callbackUrl - Url to call.
 * @param {string<loggerTypes>} params.loggerType - Log type to send.
 * @param {any} params.logInformation - Information to send.
 * @returns {Promise<void>} - The fetch request.
 */
const callbackBackend = async (
    {
        callbackHeaderConfig,
        callbackParamName,
        callbackUrl,
        loggerType,
        logInformation
    }) => {
    const errorStackTrace = new Error();
    try {
        await fetch(callbackUrl, {
            ...fetchHeadersConfig,
            ...callbackHeaderConfig,
            body: getFetchBodyContent({callbackParamName, errorStackTrace, loggerType, logInformation})
        });
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * @description Output in the console the given message.
 * @param {object} params - Init params.
 * @param {object} [params.callbackHeaderConfig={}] - Headers to send with callback.
 * @param {string<loggerTypes>[]} [params.callbackLogLevels=[]] - Logger types to log to callback.
 * @param {string} [params.callbackUrl] - Callback url to send logs to.
 * @param {string} [params.callbackParamName] - Callback parameter name to send log to.
 * @param {boolean} [params.clearConsoleOnInit=true] - Clean console on logger init.
 * @param {boolean} [params.willDoCallback=false] - True to callback logger information to.
 * @param {boolean} [params.willDisplayConsole=true] - True to use browser console logging.
 * @returns {Function} - Currying function.
 */
export const loggerOutput = ({
    callbackHeaderConfig = {},
    callbackLogLevels = [],
    callbackParamName = '',
    callbackUrl = '',
    clearConsoleOnInit = true,
    willDoCallback = false,
    willDisplayConsole = true
}) => {
    // Clean console on logger init
    clearConsoleOnInit && window.console[loggerTypes.clear]();

    /**
     * @description Apply a console method, and do a callback if necessary.
     * @param {string<loggerTypes>} loggerType - Type of log to execute.
     * @param {any} logInformation - Log information to send / display.
     */
    const loggerApply = (loggerType, logInformation) => {
        // Display console output
        willDisplayConsole && window.console[loggerType](logInformation);

        // Callback to log server
        willDoCallback && callbackLogLevels.includes(loggerType) && callbackBackend({
            callbackHeaderConfig,
            callbackParamName,
            callbackUrl,
            loggerType,
            logInformation
        });
    };
    return loggerApply;
};

// // Usage:
// loggerOutput({
//     callbackLogLevels: [loggerTypes.error, loggerTypes.trace],
//     callbackParamName: 'message',
//     callbackUrl: 'http://test.fr',
//     willDoCallback: false
// })(loggerTypes.log, 'My message');
