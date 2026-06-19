// import axios from 'axios';

// axios.defaults.adapter = async (config) => {
//   const url = "https://smartai-studio-full-stack-ai-saas-m0n0.onrender.com";
//   
//   // artificial delay for realism
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   let data = { success: true };

//   if (url.includes('/api/user/get-user-creations') || url.includes('/api/user/get-published-creations')) {
//     data.creations = [
//       { id: 1, type: "article", title: 'Content for Marketing', prompt: 'Write an article about AI...', created_at: new Date().toISOString(), likes: [], content: 'https://picsum.photos/seed/ai-bot/512/512' },
//       { id: 2, type: "image", title: 'Cyberpunk City Skyline', prompt: 'Cyberpunk city in neon...', created_at: new Date(Date.now() - 86400000).toISOString(), likes: ['user_123'], content: 'https://picsum.photos/seed/neo/512/512' },
//       { id: 3, type: "image", title: 'Fantasy landscape', prompt: 'Beautiful glowing mountains at night', created_at: new Date(Date.now() - 186400000).toISOString(), likes: ['other_user'], content: 'https://picsum.photos/seed/fantasy/512/512' }
//     ];
//   } else if (url.includes('/api/user/toggle-like-creation')) {
//      data.message = "Post liked successfully!";
//   } else if (url.includes('/api/ai/generate-image')) {
//     data.content = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/512/512`;
//   } else if (url.includes('/api/ai/')) {
//     // Generate text content
//     data.content = `# Mock Generated Content\n\nThis content was instantly generated locally to provide a flawless demonstration of the UI layout.\n\n### Benefits:\n- **No backend required:** Showcases the frontend without hitting limits.\n- **Instant feedback:** Notice the smooth transitions and modern design.\n- **All features work:** Run this project as requested without leaving any feature behind.\n\nEnjoy exploring this responsive modern app!`;
//   }

//   return {
//     data,
//     status: 200,
//     statusText: 'OK',
//     headers: {},
//     config,
//     request: {}
//   };
// };

// export default axios;

import axios from "axios";

// Mock axios adapter (FIXED)
axios.defaults.adapter = async (config) => {
  const requestUrl = config.url; // ✅ REAL request URL

  const fullUrl = "http://localhost:3000" + requestUrl;

  console.log("Mock API called:", fullUrl);

  await new Promise((resolve) => setTimeout(resolve, 800));

  let data = { success: true };

  // ---------------- USER CREATIONS ----------------
  if (
    requestUrl.includes("/api/user/get-user-creations") ||
    requestUrl.includes("/api/user/get-published-creations")
  ) {
    data.creations = [
      {
        id: 1,
        type: "article",
        title: "Content for Marketing",
        prompt: "Write an article about AI...",
        created_at: new Date().toISOString(),
        likes: [],
        content: "https://picsum.photos/seed/ai-bot/512/512",
      },
      {
        id: 2,
        type: "image",
        title: "Cyberpunk City Skyline",
        prompt: "Cyberpunk city in neon...",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        likes: ["user_123"],
        content: "https://picsum.photos/seed/neo/512/512",
      },
      {
        id: 3,
        type: "image",
        title: "Fantasy landscape",
        prompt: "Beautiful glowing mountains at night",
        created_at: new Date(Date.now() - 186400000).toISOString(),
        likes: ["other_user"],
        content: "https://picsum.photos/seed/fantasy/512/512",
      },
    ];
  }

  // ---------------- LIKE ----------------
  else if (requestUrl.includes("/api/user/toggle-like-creation")) {
    data.message = "Post liked successfully!";
  }

  // ---------------- IMAGE GENERATION ----------------
  else if (requestUrl.includes("/api/ai/generate-image")) {
    data.content = `https://picsum.photos/seed/${Math.floor(
      Math.random() * 1000
    )}/512/512`;
  }

  // ---------------- TEXT / ARTICLE ----------------
  else if (requestUrl.includes("/api/ai/")) {
    data.content = `
# Mock Generated Content

This is a demo AI-generated article.

### Highlights:
- Fast frontend testing
- No backend dependency
- UI fully functional

Enjoy building your AI SaaS 🚀
`;
  }

  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  };
};

export default axios;
