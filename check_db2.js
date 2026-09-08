const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath, { readonly: true });
const stmt = db.prepare('SELECT id, name, images FROM Product');
console.log('Products:', stmt.all());
