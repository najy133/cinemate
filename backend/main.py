from fastapi import FastAPI, HTTPException
from typing import Optional, List
from model import Movie
 
from database import (
    movie_recommendation,
    recommended,
    movie_info,
    show_movie_info,
    lucky_guess
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/movie/", response_model=Movie)
async def post_movie(movie: Movie):
    response = await movie_recommendation(movie)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.get("/api/movie/recommend/")
async def get_movie_recommendation():
    response = recommended()
    if response:
        return response
    raise HTTPException(404, f"There is no movie with the title")

@app.post("/api/movie/info/", response_model=Movie)
async def post_movie_info(movie: Movie):
    response = await movie_info(movie)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.get("/api/movie/info/return-info/")
async def get_movie_info():
    response = show_movie_info()
    if response:
        return response
    raise HTTPException(404, f"There is no movie with the title")

@app.get("/api/movie/lucky-guess/")
async def get_lucky_guess():
    response = lucky_guess()
    if response:
        return response
    raise HTTPException(404, f"There is no movie with the title")






