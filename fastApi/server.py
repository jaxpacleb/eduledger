import requests
from fastapi import FastAPI, HTTPException, status
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
import os
from pydantic import BaseModel

load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')   
SUPABASE_KEY = os.getenv('SUPABASE_KEY')   

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI(title='Eduledger')


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

class AccountCreate(BaseModel):
    firstName: str
    middleName: str | None = None
    lastName: str
    username: str
    confirmPassword: str

@app.get('/')
def get_base():
    data = 0


    if data < 10:
        return {'Message' : 'No Data to display!'}


# FIX THIS TOMORROW
@app.post('/accounts', status_code=status.HTTP_201_CREATED)
def add_account(account: AccountCreate):

    # CONTINUE THIS TOMORROW

    try:
        res = supabase.table('user_account').insert({'username': account.username, 'password': account.confirmPassword}).select('username, password').execute()
        return { 'data': res.data }
    except Exception as e:
        print("Database/Server Error:", str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
