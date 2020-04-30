import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

dotenv.config();
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: process.env.SERVICE_NAME },
    transports: [
        new transports.File({
            filename: `${process.env.SERVICE_NAME}-error.log`,
            level: 'error'
        }),
        new transports.File({
            filename: `${process.env.SERVICE_NAME}-combined.log`
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        })
    );
}

export default logger
