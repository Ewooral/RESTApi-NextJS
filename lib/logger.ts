import winston from 'winston';

const logUserActions = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, user }) => {
            return `${timestamp} [${level}] ${user ? user + ' ' : ''}${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' })
    ]
});

export default logUserActions;