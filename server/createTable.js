import "dotenv/config";
import sql from "./configs/db.js";

async function createTable() {
  try {
    console.log("Creating table...");
    await sql`
      CREATE TABLE IF NOT EXISTS creations (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        prompt TEXT,
        content TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        publish BOOLEAN DEFAULT false,
        likes TEXT[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'creations' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();
