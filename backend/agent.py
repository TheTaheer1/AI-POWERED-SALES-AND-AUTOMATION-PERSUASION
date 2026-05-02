import os
import json
import asyncio
from typing import AsyncGenerator
import google.generativeai as genai

from models import BuyerProfile, ResearchRequest
from tools import RESEARCH_TOOLS
from prompts import RESEARCH_AGENT_PROMPT, JSON_SYNTHESIS_PROMPT

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def stream_research_agent(request: ResearchRequest) -> AsyncGenerator[str, None]:
    yield json.dumps({"status": "progress", "message": f"Initializing research for {request.contact_name} at {request.company_name}..."}) + "\n\n"
    
    system_instruction = RESEARCH_AGENT_PROMPT.format(product=request.our_product)
    
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        tools=RESEARCH_TOOLS,
        system_instruction=system_instruction
    )
    
    chat = model.start_chat()
    
    prompt = f"Research {request.contact_name} ({request.contact_title}) at {request.company_name}."
    
    yield json.dumps({"status": "progress", "message": "Planning research strategy..."}) + "\n\n"
    await asyncio.sleep(0.1)
    
    response = chat.send_message(prompt)
    
    while response.function_calls:
        for function_call in response.function_calls:
            tool_name = function_call.name
            args = function_call.args
            yield json.dumps({"status": "progress", "message": f"Running tool: {tool_name}..."}) + "\n\n"
            
            func = next(t for t in RESEARCH_TOOLS if t.__name__ == tool_name)
            try:
                kwargs = {k: v for k, v in args.items()}
                result = func(**kwargs)
            except Exception as e:
                result = f"Error executing tool: {str(e)}"
            
            yield json.dumps({"status": "progress", "message": f"Analyzed results from {tool_name}."}) + "\n\n"
            response = chat.send_message(
                genai.types.Part.from_function_response(
                    name=tool_name,
                    response={"result": result}
                )
            )

    yield json.dumps({"status": "progress", "message": "Synthesizing Buyer Profile..."}) + "\n\n"
    
    json_model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        system_instruction=JSON_SYNTHESIS_PROMPT,
        generation_config={"response_mime_type": "application/json"}
    )
    
    final_response = json_model.generate_content(
        f"Research History:\n{chat.history}\n\nOur Product: {request.our_product}\n\nOutput the BuyerProfile JSON."
    )
    
    try:
        profile_dict = json.loads(final_response.text)
        yield json.dumps({"status": "complete", "profile": profile_dict}) + "\n\n"
    except Exception as e:
        yield json.dumps({"status": "error", "message": f"Failed to parse JSON: {str(e)}"}) + "\n\n"

async def run_research_agent(request: ResearchRequest) -> BuyerProfile:
    profile_dict = None
    async for chunk in stream_research_agent(request):
        data = json.loads(chunk.strip())
        if data.get("status") == "complete":
            profile_dict = data.get("profile")
            
    if profile_dict:
        return BuyerProfile(**profile_dict)
    raise Exception("Failed to generate BuyerProfile")
