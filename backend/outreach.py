import os
import json
import google.generativeai as genai
from models import OutreachRequest, OutreachResponse
from prompts import OUTREACH_AGENT_PROMPT

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_outreach_sequence(request: OutreachRequest) -> OutreachResponse:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=OUTREACH_AGENT_PROMPT,
        generation_config={"response_mime_type": "application/json"}
    )
    
    prompt = f"Generate a 3-touch email sequence for the following BuyerProfile:\n\n{request.buyer_profile.model_dump_json(indent=2)}"
    
    response = model.generate_content(prompt)
    
    try:
        response_dict = json.loads(response.text)
        return OutreachResponse(**response_dict)
    except Exception as e:
        raise Exception(f"Failed to generate outreach sequence: {str(e)}")
