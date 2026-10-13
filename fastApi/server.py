import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from supabase import create_client, Client

# Load credentials from .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

# Initialize client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="EduLedger API")

@app.get("/")
def root():
    return {"status": "online", "message": "FastAPI is connected and ready"}


@app.get("/test-db")
def test_db():
    try:
        # Replace 'users' or 'items' with an actual table name from your Supabase schema
        response = supabase.table("accounts").select("*").limit(1).execute()
        return {"success": True, "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))