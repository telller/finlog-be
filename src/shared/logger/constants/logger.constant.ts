export const DEFAULT_LOG_LEVEL = 'debug';
export enum LogLevel {
    LOG = 'log',
    ERROR = 'error',
    WARN = 'warn',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
    FATAL = 'fatal',
}

export const LoggerLevels = {
    error_silent: [LogLevel.ERROR, LogLevel.FATAL],
    error: [LogLevel.ERROR, LogLevel.FATAL, LogLevel.LOG],
    warn: [LogLevel.ERROR, LogLevel.FATAL, LogLevel.WARN, LogLevel.LOG],
    debug: [LogLevel.ERROR, LogLevel.FATAL, LogLevel.WARN, LogLevel.DEBUG, LogLevel.LOG],
    verbose: [
        LogLevel.ERROR,
        LogLevel.FATAL,
        LogLevel.WARN,
        LogLevel.DEBUG,
        LogLevel.VERBOSE,
        LogLevel.LOG,
    ],
};

export const DEFAULT_LOG_FORMAT = 'log';
export const LogLevelFormat = {
    verbose: 'VERBOSE',
    log: 'INFO',
    debug: 'DEBUG',
    warn: 'WARNING',
    error: 'ERROR',
    fatal: 'CRITICAL',
};
