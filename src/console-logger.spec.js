import {loggerOutput, loggerTypes} from './console-logger';

global.fetch = require('jest-fetch-mock');

describe('console-logger file test', () => {
    describe('checks loggerTypes integrity', () => {
        it('checks loggerTypes length', () => {
            expect(Object.keys(loggerTypes)).toHaveLength(9);
        });

        it('checks loggerTypes key / value pair', () => {
            for(const [key, value] of Object.entries(loggerTypes)) {
                expect(key).toBe(value);
            }
        });
    });

    describe('checks loggerOutput', () => {
        beforeEach(() => {
            jest.resetAllMocks();
            jest.restoreAllMocks();

            jest.spyOn(window.console, 'assert').mockImplementation();
            jest.spyOn(window.console, 'clear').mockImplementation();
            jest.spyOn(window.console, 'debug').mockImplementation();
            jest.spyOn(window.console, 'log').mockImplementation();
            jest.spyOn(window.console, 'warn').mockImplementation();
            jest.spyOn(window.console, 'error').mockImplementation();
            jest.spyOn(window.console, 'trace').mockImplementation();
        });

        describe('checks console.clear on init', () => {
            it('check console clear call', () => {
                loggerOutput({});
                expect(window.console.clear).toHaveBeenCalledWith();
            });

            it('check console clear not called', () => {
                loggerOutput({isConsoleClearedOnInit: false});
                expect(window.console.clear).not.toHaveBeenCalled();
            });
        });

        describe('checks console output for simple working cases', () => {
            it('check console log', () => {
                loggerOutput({})(loggerTypes.log, 'test');
                expect(window.console.log).toHaveBeenCalledWith('test');
            });

            it('check console log with multiple messages', () => {
                loggerOutput({})(loggerTypes.log, 'test', ['test'], {test: 'test'});
                expect(window.console.log).toHaveBeenCalledWith('test', ['test'], {test: 'test'});
            });

            it('check console trace', () => {
                loggerOutput({})(loggerTypes.trace, {});
                expect(window.console.trace).toHaveBeenCalledWith({});
            });
        });

        describe('checks callback cases', () => {
            it('check fetch callback with classic log', () => {
                loggerOutput({
                    callbackLogLevels: [loggerTypes.log],
                    callbackUrl: '/test',
                    willDoCallback: true
                })(loggerTypes.log, 'some test');

                expect(fetch).toHaveBeenCalledWith('/test', expect.objectContaining({
                    body: expect.stringContaining('some test')
                }));
            });

            it('check fetch callback with object log', () => {
                loggerOutput({
                    callbackLogLevels: [loggerTypes.log],
                    callbackUrl: '/test',
                    willDoCallback: true
                })(loggerTypes.log, {testKey: 'testValue'});

                expect(fetch).toHaveBeenCalledWith('/test', expect.objectContaining({
                    body: expect.stringContaining('testKey')
                }));
            });

            it('check fetch callback with multiple messages log', () => {
                loggerOutput({
                    callbackLogLevels: [loggerTypes.log],
                    callbackUrl: '/test',
                    willDoCallback: true
                })(loggerTypes.log, 'test', ['test'], {testKey: 'testValue'});

                expect(fetch).toHaveBeenCalledWith('/test', expect.objectContaining({
                    body: expect.stringContaining('testKey')
                }));
            });
        });
    });
});
