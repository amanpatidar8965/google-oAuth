import { config } from 'dotenv';

config();

const getVar = (name: string): string => {
  const _var = process.env[name];
  if (!_var) {
    throw new Error(`Unable to locate env. variable: ${name}`);
  }
  return _var;
};

export const Env = {
  PORT: 3000,
  GOOGLE_CLIENT_ID: getVar('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getVar('GOOGLE_CLIENT_SECRET'),
  GOOGLE_CALLBACK_URL: getVar('GOOGLE_CALLBACK_URL'),


  DATABASE: {
    DB_USER: getVar('DB_USER'),
    DB_PASSWORD: getVar('DB_PASSWORD'),
    DATABASE_NAME: getVar('DATABASE_NAME'),
    PORT: parseInt(getVar('DB_PORT')),
    TYPE: getVar('DB_TYPE'),
    HOST: getVar('DB_HOST'),
  },
};
