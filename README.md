# SalesGenie AI 🧞‍♂️
**Close more deals with autonomous AI intelligence.**

SalesGenie AI is an agentic, full-stack sales automation platform built for the Google Hackathon. It acts as an autonomous Assistant for Sales Executives, handling everything from deep prospect research to live call coaching.

## 🎯 Chosen Vertical
**B2B Enterprise Sales / AI Productivity Assistant**

We chose this vertical because B2B sales reps spend over 60% of their time researching prospects, drafting personalized emails, and updating CRMs. SalesGenie AI reclaims this time by deploying AI agents to handle the grunt work, allowing reps to focus purely on building relationships and closing deals.

## 🧠 Approach & Logic

SalesGenie AI utilizes a multi-agent architecture powered by **Google Gemini 1.5 Pro** and **Gemini 1.5 Flash**.

1. **Prospect Research Agent (Gemini 1.5 Pro + DuckDuckGo Tools)**: 
   - *Logic:* Takes a prospect's name and company, then autonomously uses web-scraping tools to search for company info, tech stacks, and recent news. It synthesizes this into a structured JSON `BuyerProfile`.
   - *Tech:* Uses Function Calling to execute tools and Server-Sent Events (SSE) to stream its thought process to the frontend in real-time.

2. **Personalized Outreach Engine (Gemini 1.5 Flash)**:
   - *Logic:* Takes the generated `BuyerProfile` and crafts a 3-touch hyper-personalized email sequence.
   - *Tech:* Uses JSON schema constraints to ensure the output perfectly matches the frontend's Gmail UI expectations.

3. **Live Call Coach (Web Speech API + Gemini 1.5 Flash)**:
   - *Logic:* Listens to a live sales call using the browser's native microphone API. Every 8 seconds, it sends the transcript chunk to the AI, which detects objections and returns live, teleprompter-style suggested responses.

4. **Post-Call Intelligence (Gemini 1.5 Pro)**:
   - *Logic:* Upon ending the call, the full transcript is analyzed to generate an executive summary, extract commitments, identify objections, and calculate a "Deal Score Delta."

## ⚙️ How the Solution Works

- **Frontend**: React 18, Tailwind CSS v4, Lucide Icons. The UI features a premium dark-mode SaaS dashboard, animated teleprompter views, and a realistic Gmail mockup.
- **Backend**: FastAPI (Python) serving REST endpoints and SSE streams. 
- **AI Integration**: Google Generative AI SDK using `gemini-1.5-pro` for deep reasoning tasks and `gemini-1.5-flash` for low-latency live coaching.

**To run locally:**
1. Clone the repo.
2. `cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
3. Add your `GEMINI_API_KEY` to `backend/.env`.
4. Run backend: `uvicorn main:app --reload`
5. Run frontend: `cd frontend && npm install && npm run dev`

## 🔮 Assumptions Made
- **Demo Data**: The Dashboard and Analytics pages use mock data to demonstrate how the platform looks when fully populated. 
- **Persistence**: We are using the browser's `localStorage` to pass the BuyerProfile between modules instead of a traditional SQL database to keep the demo lightweight and portable.
- **Microphone Access**: The Live Call Coach assumes the user is running a modern browser (like Google Chrome) that supports the native `webkitSpeechRecognition` API.
