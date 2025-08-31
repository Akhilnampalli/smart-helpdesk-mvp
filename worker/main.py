from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Agentic Triage Worker")

class TriageRequest(BaseModel):
    text: str

class TriageResponse(BaseModel):
    category: str
    confidence: float
    draft: str
    citations: List[str] = []

def mock_classify(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ["bill","payment","refund","invoice"]):
        return "billing"
    if any(k in t for k in ["error","bug","crash","install","login"]):
        return "technical"
    if any(k in t for k in ["ship","delivery","order","tracking"]):
        return "shipping"
    return "general"

def mock_confidence(text: str) -> float:
    return max(0.55, min(0.98, 0.55 + len(text)/500.0))

def mock_kb(cat: str):
    kb = {
        "billing": ["KB-101 Reset Billing Address","KB-102 Refund Policy"],
        "technical": ["KB-201 Login Issues","KB-202 App Crash Troubleshoot"],
        "shipping": ["KB-301 Track Your Order","KB-302 Delayed Shipment"],
        "general": ["KB-001 General Support"]
    }
    return kb.get(cat, ["KB-000 General"])[:2]

@app.post("/triage", response_model=TriageResponse)
def triage(req: TriageRequest):
    cat = mock_classify(req.text)
    conf = round(mock_confidence(req.text), 2)
    citations = mock_kb(cat)
    draft = (f"Hi, this seems like a **{cat}** query. Steps: " + ", ".join(citations) +
             ". If unresolved, an agent will follow up.")
    return TriageResponse(category=cat, confidence=conf, draft=draft, citations=citations)
