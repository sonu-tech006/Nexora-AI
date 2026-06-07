import "dotenv/config";
import axios from "axios";
import FormData from "form-data";

async function testClipdrop() {
  try {
    const formData = new FormData();
    formData.append("prompt", "a white cat playing with a boy");

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );
    console.log("Success! Image data size:", data.byteLength);
  } catch (error) {
    if (error.response && error.response.data) {
        const str = Buffer.from(error.response.data).toString('utf-8');
        console.error("ClipDrop Error Response:", str);
    } else {
        console.error("Other Error:", error.message);
    }
  }
}

testClipdrop();
