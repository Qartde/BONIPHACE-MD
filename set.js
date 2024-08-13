const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUExR0kxWStYTjZnUWt1cG0zOHd6ZXE4ak5Balg1YWhHNEJucFQ3RUowcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHNSRmRaMFA2NVdVa25EcG16OEJSSnU1VmJUcWxCV04rSlFIeUdHMmZHTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQzZ0Ujl3Mjg4b1hoVGw2Q1BiRHE1RXZuaW90KzgxYTFKazBsUjFiZlZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoWHMreGN1RXAreFBPU29JVk80aGJ2N2R4cllSUkl3OUVLR2lFemFIZTJVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKZEl3TUJpQnBkVGJ0bjUvb05zM1QzcE5hKy8xR0tiMW1iSStHanZJV1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxRTWFOUlhsR0w3cjRuYXJheWg1ZlBXMHVqUDdrN3J4SDRKcVMzZjNNMEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FndGRtRFNwcm1rZnpCQllBTEQxeldKZW0rU01MSmhGYy9hcGh6dGNHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM29MMklHVlBxQVM3bGtyZ2M0Zjk5TlVtVTR1UWpqOTVYOTY3UEtVL2xSaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJGdmtNcFkwVmllY2M5VDRJbmlEMVh2aXZQMlMxU0hNd1JpbVdldkR3c0tVeksyaTZpMHcxTWdwMFFPV3E5eUxqR1IxTis5VlZjaWljU21YWFJJeUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAyLCJhZHZTZWNyZXRLZXkiOiJRdktkOWRmTWxQbitWTG5FcXVXVkFoSllSNGNacGJvR01yUFpOeHYvTHdZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxNWE2T0dwY1RIYVY2NlhjWDV0YXd3IiwicGhvbmVJZCI6IjRkMmVlNjQzLWFkZDYtNDQxZC1iMDA5LWQ4ZDU5YTNhZmI1NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQVpVOXM0RW9pZE1TSVBja2RYcUM3cEUyZEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGJPbFF0TG9KRmlLbUtYRGdXWFUycXArbXE4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFHUk1MWDRXIiwibWUiOnsiaWQiOiIyNTU2OTM2MjkwNzk6MTNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoifn5yQGhtQG7CpX5+In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZVgzTjBDRUtEdjdMVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJidUdaWW0vZGgxZytyeWZnUkdXdlJlVjJKUzk2UWNUVkhwN0dNUGx0aTBVPSIsImFjY291bnRTaWduYXR1cmUiOiJtZjRVZWcxZTMzSGtKRk12L3NmV3BQZmZlM3dzVG1wdm9lVGRjcVZCWTJCVmdTbmQ0WktpVEd6TTB6dk5MbnBENUtxTngrOXpWdlRpcSt5dlM1YTRBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiazBWTURDSEFjcE5yc0VNNVNuOXV2dTlnKzVJRmFRQU1SZjlLdE94eVJ4bytWYjlVa01zR29YaUFlbHpsZHlUaklIQmloVXFQOGxQY3FHckE4dXY5QUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTM2MjkwNzk6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVzdobVdKdjNZZFlQcThuNEVSbHIwWGxkaVV2ZWtIRTFSNmV4akQ1Yll0RiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzU0NTUxN30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredie Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255693629079",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/f660abdbefbae32daeb81.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
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
