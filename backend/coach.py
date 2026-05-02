import os
import json
import google.generativeai as genai
from models import CoachRequest, CoachResponse
from prompts import COACH_AGENT_PROMPT

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_coaching_feedback(request: CoachRequest) -> CoachResponse:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=COACH_AGENT_PROMPT,
        generation_config={"response_mime_type": "application/json"}
    )
    
    history_text = "\n".join(request.conversation_history)
    prompt = f"Conversation History:\n{history_text}\n\nLatest Transcript Chunk:\n{request.transcript_chunk}\n\nAnalyze and provide coaching feedback in JSON."
    
    response = model.generate_content(prompt)
    
    try:
        response_dict = json.loads(response.text)
        return CoachResponse(**response_dict)
    except Exception as e:
        raise Exception(f"Failed to generate coaching feedback: {str(e)}")
