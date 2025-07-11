# ErrandSpider

ErrandSpider is a lightweight full-stack productivity app designed to help users manage daily errands with the help of an AI-based task suggestion system. Built for speed, simplicity, and real-world usability, it allows users to create, update, delete, and view tasks — and get smart suggestions based on estimated time.

# 1.Tools and Components Used

# Backend
- **Node.js + Express** — REST API
- **PostgreSQL** — Database for storing tasks
- **pg** — PostgreSQL client for Node.js
- **CORS** — Cross-origin request handling
- **dotenv** — Environment variable management

# Frontend
- **React.js** — Frontend UI
- **Axios** — For calling backend APIs
- **React Hooks** — State and effect management
- **Bootstrap/Tailwind** — (Used for basic styling)

# Tools for Testing & Deployment
- **Postman** — For testing all HTTP endpoints
- **Vercel** — (Frontend deployment)
- **Render** — (Backend deployment)

---

# 2.Development Issues Faced

1. **HTTP Request Errors (Postman & Frontend)**  
   - Encountered 500 server errors due to incorrect route handling or bad request bodies.
   - Solved by validating input payloads and logging errors in Express.

2. **Frontend–Backend Integration Problems**  
   - API requests from frontend failed due to CORS or wrong URLs.
   - Fixed by setting correct `CORS` middleware and using `.env` for base URL configs.

---

# 3. Project Capabilities (Till Deployment & Testing)

- ✅ Add new errands/tasks with title and estimated time.
- 🗂️ View all tasks with their completion status.
- ✏️ Edit or delete any task.
- ✅ Mark tasks as complete/incomplete with a toggle.
- 🤖 Get AI-based task suggestions ordered by estimated time via `/api/ai/suggest`.
- 🌍 Fully tested via Postman and deployed backend and frontend.

---

# 4. Key Considerations for Further Development

1. **Persistent Auth & User Accounts**  
   - Current version has no login/signup. Future versions can include JWT-based auth.

2. **Task Categories or Priorities**  
   - Add support for labels like "High Priority", "Home", or "Work" to enhance filtering and AI suggestions.

---

# Folder Structure

ErrandSpider/
├── server/ # Node.js + Express backend
│ ├── routes/ # errands.js and ai.js
│ └── db.js # PostgreSQL connection
├── client/ # React frontend
│ ├── components/ # TaskList.js, AddTask.js, SuggestedTasks.js
│ └── App.js
├── .env # Environment variables (not pushed)
├── README.md # Project overview and instructions


