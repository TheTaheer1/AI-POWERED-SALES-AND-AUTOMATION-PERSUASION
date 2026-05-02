from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

import models
from agent import run_research_agent, stream_research_agent
from outreach import generate_outreach_sequence
from coach import generate_coaching_feedback
from post_call import generate_post_call_intelligence

load_dotenv()

app = FastAPI(title="SalesGenie AI")

# Allow CORS for local frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "SalesGenie AI Backend is running!"}

@app.post("/api/research", response_model=models.BuyerProfile)
async def research_prospect(request: models.ResearchRequest):
    try:
        return await run_research_agent(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/research/stream")
async def research_prospect_stream(request: models.ResearchRequest):
    return StreamingResponse(
        stream_research_agent(request),
        media_type="text/event-stream"
    )

@app.post("/api/outreach", response_model=models.OutreachResponse)
async def create_outreach(request: models.OutreachRequest):
    try:
        return await generate_outreach_sequence(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/coach", response_model=models.CoachResponse)
async def call_coach(request: models.CoachRequest):
    try:
        return await generate_coaching_feedback(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/post-call", response_model=models.PostCallResponse)
async def post_call(request: models.PostCallRequest):
    try:
        return await generate_post_call_intelligence(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
