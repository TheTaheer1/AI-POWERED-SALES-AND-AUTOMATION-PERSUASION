import json
from duckduckgo_search import DDGS

def search_company_info(company_name: str) -> str:
    """Searches for general information about a company."""
    with DDGS() as ddgs:
        results = ddgs.text(f"{company_name} company overview", max_results=3)
        return json.dumps(list(results)) if results else "No info found."

def search_news(company_name: str) -> str:
    """Searches for recent news and buying signals about a company."""
    with DDGS() as ddgs:
        results = ddgs.text(f"{company_name} news recent developments", max_results=3)
        return json.dumps(list(results)) if results else "No news found."

def search_tech_stack(company_name: str) -> str:
    """Searches for the technology stack used by a company."""
    with DDGS() as ddgs:
        results = ddgs.text(f"{company_name} tech stack technologies used built with", max_results=3)
        return json.dumps(list(results)) if results else "No tech stack info found."

def enrich_contact(contact_name: str, company_name: str) -> str:
    """Searches for information about a specific contact at a company."""
    with DDGS() as ddgs:
        results = ddgs.text(f"{contact_name} {company_name} linkedin profile role", max_results=3)
        return json.dumps(list(results)) if results else "No contact info found."

def analyze_job_postings(company_name: str) -> str:
    """Searches for recent job postings to understand company needs."""
    with DDGS() as ddgs:
        results = ddgs.text(f"{company_name} careers job openings", max_results=3)
        return json.dumps(list(results)) if results else "No job postings found."

RESEARCH_TOOLS = [
    search_company_info,
    search_news,
    search_tech_stack,
    enrich_contact,
    analyze_job_postings
]
