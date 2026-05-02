from pydantic import BaseModel, Field
from typing import List, Optional

class ResearchRequest(BaseModel):
    company_name: str
    contact_name: str
    contact_title: str
    our_product: str

class BuyerProfile(BaseModel):
    company_info: str = Field(description="Summary of the company, its industry, and size.")
    contact_details: str = Field(description="Summary of the contact's role and responsibilities.")
    tech_stack: List[str] = Field(description="List of technologies the company uses.")
    buying_signals: List[str] = Field(description="Recent news or events indicating a potential need.")
    pain_points: List[str] = Field(description="Potential challenges the contact or company faces.")
    icp_score: int = Field(ge=0, le=100, description="Ideal Customer Profile score from 0 to 100.")
    personalization_hooks: List[str] = Field(description="Specific points to reference in outreach.")

class OutreachRequest(BaseModel):
    buyer_profile: BuyerProfile

class EmailSequence(BaseModel):
    subject_line: str
    subject_variants: List[str]
    body: str
    channel: str = "email"
    personalization_hooks_used: List[str]
    predicted_open_rate: str
    cta: str

class OutreachResponse(BaseModel):
    email_1: EmailSequence
    email_2: EmailSequence
    email_3: EmailSequence

class CoachRequest(BaseModel):
    transcript_chunk: str
    conversation_history: List[str]

class CoachResponse(BaseModel):
    objection_type: Optional[str] = Field(description="Type of objection raised, if any.")
    suggested_response: str = Field(description="Suggested response for the sales rep.")
    tone_tip: str = Field(description="Tip on tone delivery.")
    next_question: str = Field(description="A good question to ask next.")
    sentiment: str = Field(description="positive, neutral, or negative")
    urgency_to_close: int = Field(ge=0, le=10, description="Score indicating urgency to close.")

class PostCallRequest(BaseModel):
    full_transcript: str
    buyer_profile: BuyerProfile

class PostCallResponse(BaseModel):
    executive_summary: List[str] = Field(description="3 bullet points summarizing the call.")
    key_objections_raised: List[str]
    commitments_made: List[str]
    follow_up_email_draft: str
    next_meeting_suggested_agenda: List[str]
    deal_score_delta: int = Field(description="Change in ICP/deal score based on the call (-10 to +10).")
    updated_buyer_profile: BuyerProfile
