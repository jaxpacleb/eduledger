import requests
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client
import os

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

@app.get('/')
def get_base(page: int = 1):
    results = 10
    
    res = requests.get(f'https://randomuser.me/api/?inc=name, email, picture&results={results}&nat=us')
    # page={page}&results={results}&gender=male
    data = res.json()
    # cleaned_profile = [
    #         {'first_name': prop['name']['first'],'last_name': prop['name']['last'], 'email': prop['email'], 'picture': prop['picture']['medium']}
    #         for prop in data['results']
    # ]

    return {'profiles': data['results']}

@app.get('/accounts')
def add_account(username, password):
    res = supabase.table('accounts').insert({'username': username, 'password': password}).execute()
    return {'data': res.data}

