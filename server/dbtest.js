const db = require('./db');

async function testInsert() {
  try {
    const res = await db.query(
      "INSERT INTO errands (title) VALUES ($1) RETURNING *",
      ["Test insert from script"]
    );
    console.log('Insert succeeded:', res.rows[0]);
  } catch (err) {
    console.error('Insert failed:', err);
  }
}

testInsert();

