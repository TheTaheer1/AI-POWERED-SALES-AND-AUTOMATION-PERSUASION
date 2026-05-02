import os
import json
import google.generativeai as genai
from models import PostCallRequest, PostCallResponse
from prompts import POST_CALL_AGENT_PROMPT

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_post_call_intelligence(request: PostCallRequest) -> PostCallResponse:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        system_instruction=POST_CALL_AGENT_PROMPT,
        generation_config={"response_mime_type": "application/json"}
    )
    
    prompt = f"Current BuyerProfile:\n{request.buyer_profile.model_dump_json(indent=2)}\n\nFull Transcript:\n{request.full_transcript}\n\nAnalyze and output PostCallResponse in JSON."
    
    response = model.generate_content(prompt)
    
    try:
        response_dict = json.loads(response.text)
        return PostCallResponse(**response_dict)
    except Exception as e:
        raise Exception(f"Failed to generate post-call intelligence: {str(e)}")
