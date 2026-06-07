import axios from 'axios';

async function testTrigger() {
  try {
    const res = await axios.post('http://localhost:3000/api/ai/test-generate-image', {
      prompt: "a white cat playing with a boy"
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Failed:", err.response ? err.response.data : err.message);
  }
}

testTrigger();
