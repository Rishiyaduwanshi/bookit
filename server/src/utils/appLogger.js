import fs from 'node:fs';
import path from 'node:path';
import dayjs from 'dayjs';
import morgan from 'morgan';

const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(path.join(logDir, 'app.log'), {
  flags: 'a',
});

morgan.token('ist-date', () => {
  return dayjs().format('DD-MM-YYYY hh:mm:ss A');
});

morgan.token('user', req => {
  return req.user ? req.user.id : 'Guest';
});

morgan.token('ip', req => {
  return (
    req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  );
});

const customMorganFormat =
  '[:ist-date] :method :url :status :response-time ms - :res[content-length] :ip :user';

const httpLogger = morgan(customMorganFormat, { stream: accessLogStream });

export default httpLogger;
