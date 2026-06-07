import "dotenv/config";
import sql from "./configs/db.js";

async function testSql() {
  try {
    const userId = "test_user";
    const prompt = "a white cat playing with a boy";
    const secure_url = "https://res.cloudinary.com/dwwxfomsu/image/upload/v1780501305/hkgrinwk9rnsp9ljgzmz.png";
    const publish = undefined;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;
    console.log("SQL insert successful");
  } catch (error) {
    console.error("SQL error:", error);
  }
}

testSql();
