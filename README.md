# NoteSphere (MERN Notes App)

## 1. Set up MongoDB
Edit `backend/.env` and set MONGO_URI:
- Local MongoDB: `mongodb://127.0.0.1:27017/notes-app`
- MongoDB Atlas: `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/notes-app?retryWrites=true&w=majority`
Also change JWT_SECRET to any long random text.

## 2. Run the backend (Terminal 1)
    cd backend
    npm install
    npm run dev

## 3. Run the frontend (Terminal 2)
    cd frontend
    npm install
    npm run dev

Open http://localhost:5173
