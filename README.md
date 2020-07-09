# javascript-console-logger

## Package description
This package is just a simple logger that group browser `console.*` functionalities, and add the possibility to disable output for specifics environments, and send log throught a server.

## Logger usage
### Simple logger usage
In dev mode, you will probably display all console outputs:
````javascript
loggerOutput ({})(loggerTypes.log, 'My message');
````

In production mode, you will probably disable console output to avoid errors to be displayed:
````javascript
loggerOutput ({
    isConsoleClearedOnInit: false,
    willDisplayConsole: false
})(loggerTypes.log, 'My message');
````

### Advanced usage
Example to use the logger with a server call:
````javascript
const logger = loggerOutput ({
    callbackHeaderConfig: {"Content-Type": "text/plain"},
    callbackLogLevels: [loggerTypes.error], // Will only send error to server
    callbackParamName: 'paramKey', // Will result a server call with parameter: {paramKey: '...logs'}
    callbackUrl: 'https://some-server.com', // URL to send logs to
    isConsoleClearedOnInit: true, // Will clean console when launching logger
    willDoCallback: true, // Will send some logs to server
    willDisplayConsole: true // Will display logs in the browser console
});

logger(loggerTypes.error, 'My message'); // Will be displayed & sent to server
logger(loggerTypes.warn, 'My message'); // Will be displayed & not sent to server
````

## Logger configuration

The `loggerOutput` function take an object as parameter, with given keys:

- `callbackHeaderConfig` = {}
- `callbackLogLevels` = [],
- `callbackParamName` = '',
- `callbackUrl` = '',
- `isConsoleClearedOnInit` = true,
- `willDoCallback` = false,
- `willDisplayConsole` = true

### {object} callbackHeaderConfig
Fetch header object that extends the default one:
```javascript
const headers = {
     cache: 'no-cache',
     headers: {'Content-Type': 'application/json'},
     method: 'POST',
     mode: 'cors',
     redirect: 'follow'
 };
```

### {array} callbackLogLevels
List of all logs type `loggerTypes` allowed to be sent to server.

### {string} callbackParamName
The object parameter name to push logs to given url.

### {string} callbackUrl
The url to call to send logs to.

### {Boolean} isConsoleClearedOnInit
- `true`: will do a `console.clear();` when calling function.
- `false`: will not do anything.

### {Boolean} willDoCallback
- `true`: will do a callback to a given URL for each configurated log
- `false`: will not call anything. Simple console usage.

### {Boolean} willDisplayConsole
- `true`: output logs to browser console
- `false`: will not display anything in browser console.

