const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS082a1FIbm5UMWQxdlcraTkxTVNBZllPc1M0WUcvOCtzS1RJaEcvTjhHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUxIdUd2NjA5bVdCZWdMVU9yR2ZFZ3grV1o1SHMzRnlrQ1NpVjV1YjJnND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5S3RJeEZyM21EMTFIV2U2TGR3WTRJU3dQM0ZORFZqcEtUSmlkYm9kREhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWQ3BycURuOW5PUytteDA4ZmNIU0pPMmdUMVVQMXh0b3ZWTmdpWEhQVmxnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMU011ZkJhajNpS3FqUWZvb3gyczdWQzFkNVJneTZrWCtEdmp4N1E4bnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9mT3dsRDVSUVJqWkQ4Qk9DTjB1V2lzeStTTkJtVkx2NjgwcnorOFNlUnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU1nSGM3KzBZZGhIQWVtcnBQTFhweThuM1FFSUM5ZjA3S0prdm1IMSttdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVp5Q0c5Zk5pY2JXYkQ3Z0w5U2xydjRDMHRxSlJodWVmd3BnUkVJMVh4WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InljRC9RaCt6Y3krWHprYkhKUVp6WEZPYzVRNTFBVlhYazcxOEI3c2NwL3hlRldVNjNEb2E3Um5kQXc5U0RSU1FraDc4UzVoanpRMmJLZm9nd1dwUkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiI5RmxFWmlsMmZtS3ZCK3RlUk82WnYvR3hzbkJTczJkbDRaNVZuQmpNY3NRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1cEltSEhpRFRIV0hlQTVQU0FXcldnIiwicGhvbmVJZCI6ImYyMTY2ZDMxLTY4MzItNDExNC1iYzdhLWY0MTZiMzYyMjNiZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEODJrak1idDJGQmN4UFgrak85SVRYNGZlUWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWNubVRXZS9janQvY09ZR1FzVktSYzBKdEpRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNDSjdWRUg2IiwibWUiOnsiaWQiOiIyNTU2OTM2MjkwNzk6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoifn5yQGhtQG7CpX5+In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJS1gzTjBDRU9iRjU3VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJidUdaWW0vZGgxZytyeWZnUkdXdlJlVjJKUzk2UWNUVkhwN0dNUGx0aTBVPSIsImFjY291bnRTaWduYXR1cmUiOiJNVWJjVnczRzhwR2VQMis2Zmc3YjIvVFRDV0JET1ZxQVFVeFI4ZTBlVjZERXlTeC9PNERNWWFVaCtzS0ppYlc0VG56SnZpd3BwQ1FUQ2xwSHdwTElCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRDdEdUIxVWw4Vjc4bWJxejVFTUFZSU9GL0M4T3lEU3gwZGw4N2dmL3d4R29qTjZ2WXdMalNoWlVDQ05XU0VObFU3YVFOVWFiaXMyNzM4Ujk4R2dURGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTM2MjkwNzk6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVzdobVdKdjNZZFlQcThuNEVSbHIwWGxkaVV2ZWtIRTFSNmV4akQ1Yll0RiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzQ1ODI5MX0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredie Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255693629079",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/f660abdbefbae32daeb81.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
