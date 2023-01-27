import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import campaigns, events, participants
from authenticator import authenticator


app = FastAPI()
app.include_router(campaigns.router)
app.include_router(events.router)
app.include_router(participants.router)
app.include_router(authenticator.router)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
