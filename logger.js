"use strict"

const fs = require('fs');
const os = require('os');
const path = require('path');

var LOG_BASENAME = "combined";
var LOG_PATH = os.tmpdir();
var DEBUG = false;

function toggleDebug() {
    DEBUG = !DEBUG;
    return DEBUG;
}

function setLogPath(basename,path) {
    LOG_PATH = path;
    LOG_BASENAME = basename;
}

// Function to get the path of the log file
function getLogPath() {
    return path.join(LOG_PATH, LOG_BASENAME, '.log');
}

function logError(message) {
    const errorLogPath = path.join(LOG_PATH, LOG_BASENAME, '.log');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(path.dirname(errorLogPath))) {
        fs.mkdirSync(path.dirname(errorLogPath), { recursive: true });
    }

    // Append error to log file
    fs.appendFile(errorLogPath, `${message}`, (err) => {
        if (err) {
            console.error('Error appending to error log:', err);
        }
    });
}

// Function to log messages to the file
function log(level, message) {
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`;
    logError(logMessage);
}

function handleExit() {
    process.on('exit', (code) => {
        log('info',`Process exited with code ${code}`);
    });

    process.on('uncaughtException', (error) => {
        if (DEBUG) console.error('Uncaught exception occurred:', error);
        log('error',error);
        process.exit(1); // Exit with failure status
    });

    process.on('unhandledRejection', (reason, promise) => {
        if (DEBUG) console.error('Unhandled promise rejection at:', promise, 'reason:', reason);
        log('warn',new Error(`Unhandled promise rejection: ${reason}`));
    });
}

function getLineNumber() {
    let error, lineNumber = -1;
    try {
        error = new Error();
        const stack = error.stack.split("\n");
        const lineInfo = stack[2]; // The third line contains the caller's location info
        const match = lineInfo.match(/:(\d+):\d+\)$/);
        
        if (match) {
            lineNumber = match[1];
        } else {
            const match2 = lineInfo.split(":");
            lineNumber = match2[1];
        }
    } catch (err) {
        if (DEBUG) console.error("Error in getLineNumber function:", err);
    }
    return lineNumber;
}

async function backup() {
    const logFilePath = getLogPath();
    const timestamp = new Date().getTime();
    const backup_filename = path.join(LOG_PATH, LOG_BASENAME, `_${timestamp}.log`);
    fs.copyFileSync(logFilePath, backup_filename);
    fs.unlinkSync(logFilePath)
    logError("created new log file\n");
    return backup_filename;
}

async function deleteLogFile(filename) {
    const fullLogFilePath = path.join(LOG_PATH, LOG_BASENAME, filename);
    if (fs.existsSync(fullLogFilePath)) {
        fs.unlinkSync(fullLogFilePath);
        return {success: true, message: `deleted log file name ${filename} successfully.`};    
    }
    return {success: false, message: `${filename} does not exist?`};
}

async function listLogFiles() {
    const logDir = path.join(LOG_PATH, LOG_BASENAME);
    const _list = fs.readdirSync(logDir);
    let list = [];
    _list.forEach(function(file){
        if (file.includes('.log')) {
            list.push(file);
        }
    })
    return list;
}


// Initialize error handling
handleExit();



// Export functions for use in other modules
module.exports = {
    warn: message => log('warn', message),
    error: message => log('error', message),
    info: message => log('info', message),
    setLogPath,
    getLogPath,
    getLineNumber,
    backup,
    listLogFiles,
    deleteLogFile,
    toggleDebug,
};