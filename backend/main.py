import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
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

# Define absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
ASSETS_DIR = os.path.join(STATIC_DIR, "assets")

# Mount assets specifically (Vite puts JS/CSS in dist/assets)
if os.path.isdir(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # Don't intercept API routes
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not Found")
    
    # Try to serve the exact static file (e.g. vite.svg)
    file_path = os.path.join(STATIC_DIR, full_path)
    if full_path and os.path.isfile(file_path):
        return FileResponse(file_path)
        
    # Default to index.html for React Router
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
        
    # Debugging info if static files aren't found
    contents = "Static directory not found"
    if os.path.isdir(STATIC_DIR):
        contents = str(os.listdir(STATIC_DIR))
        
    return {
        "status": "ok", 
        "message": f"SalesGenie AI Backend is running! (Frontend not built)",
        "debug_path": index_path,
        "debug_contents": contents,
        "debug_pwd": os.getcwd()
    }

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

# Force rebuild
