import motor.motor_asyncio
from model import Movie
import pandas as pd
import numpy as np
from pathlib import Path
from imdb import IMDb, IMDbError
import random

client = motor.motor_asyncio.AsyncIOMotorClient()

db = client.moviedb
collection = db.todo

result = []
result2 = []

# post - (apply algorithm here) set
async def movie_recommendation(input_movie):

    global result
    result = []
    check_movie = False

    # Initializing Datasets
    movies = pd.read_csv("./movies.csv")
    ratings = pd.read_csv("./ratings.csv")
    # --------------------------------------------------------------------------------------------

    # Merging Both Datasets around movieId
    df = pd.merge(ratings, movies, on='movieId')

    # Group by Title and return the mean of only particular title's rating in the group
    ratings_avg = pd.DataFrame(df.groupby('title')['rating'].mean())

    # Group by Title and return the mean of only particular title's rating count in the group
    ratings_avg['rating count'] = pd.DataFrame(
        df.groupby('title')['rating'].count())

    # To Rate the best films of the list
    best_films = df.groupby(
        'title')['rating'].count().sort_values(ascending=False)

    user_ratings = df.pivot_table(
        index='userId', columns='title', values='rating')
    # --------------------------------------------------------------------------------------------

    # Correlation Calculator
    movies_list = list(movies['title'])

    for movie in movies_list:
        if str(input_movie.title).lower() in movie.lower():
            check_movie = True
            break
    # --------------------------------------------------------------------------------------------

    correlations = user_ratings.corrwith(user_ratings[movie])

    movie_correlations = pd.DataFrame(correlations, columns=['correlation'])
    movie_correlations.dropna(inplace=True)
    movie_correlations = movie_correlations.join(ratings_avg['rating count'])
    # --------------------------------------------------------------------------------------------

    recommendations = movie_correlations[movie_correlations['rating count'] > 50].sort_values(
        'correlation', ascending=False).reset_index()
    recommendations = recommendations.merge(movies, on='title', how='left')

    results = recommendations.to_numpy()
    rmovies = results[1:6, 0:2]

    index = 0
    for movie in rmovies[0:-1]:
        x = "%.2f" % movie[1]
        result.append(f"Title: {movie[0]} - Correlation: {x},  ")
        index += 1

    if check_movie == True:
        last_movie = rmovies[-1]
        x = "%.2f" % last_movie[1]
        result.append(f"Title: {last_movie[0]} - Correlation: {x}")

    if check_movie == False:
        result.append("Sorry this movie is not available!")
        return result

    return result

async def movie_info(input_movie):

    global result2
    result2 = []
    check_movie = False

    movies = pd.read_csv("./movies.csv")

    movies_list = list(movies['title'])
    for movie in movies_list:
        if str(input_movie.title).lower() in movie.lower():
            check_movie = True
            input_movie = movie
            break

    if check_movie == True:

        ia = IMDb()
        movies = ia.search_movie(input_movie)

        id = movies[0].getID()
        movie = ia.get_movie(id)
        
        if len(movie['title']) != 0 and movie['year'] > 0:
            title = movie['title']
            year = movie['year']
            result2.append(f"Title: {title} -  ({year})")

        if movie['rating'] > 0:
            rating = movie['rating']
            result2.append(f"Rating: {rating}")

        if len(movie['cast']) != 0:
            casting = movie['cast']
        
        if len(movie['genre']) != 0:
            genres = movie['genre']
            genres_output = "Genre: {"
            
            for genre in genres[0:-1]:
                genres_output += f"{genre}, "

            genres_output += f" {genres[-1]}"
            genres_output += "}"

            result2.append(genres_output)
        
        actors = ", ".join(map(str, casting))
        result2.append(f" Actors: {actors}")    

    else:    
        result2.append("Sorry the infromation of this movie is not available!")
        return result2

    return result2

# ------------------------------------------------------------------------------------------------------------------

# get for movie reccomendation
def recommended():
    return result


def show_movie_info():
    return result2

def lucky_guess():
    result3 = []
    ia = IMDb()
    top = ia.get_top250_movies()
    guess = random.choice(top)

    id = guess.getID()
    movie = ia.get_movie(id)
    
    
    if len(movie['title']) != 0 and movie['year'] > 0:
        title = movie['title']
        year = movie['year']
        result3.append(f"Title: {title} -  ({year})")

    if movie['rating'] > 0:
        rating = movie['rating']
        result3.append(f"Rating: {rating}")

    if len(movie['cast']) != 0:
        casting = movie['cast']
    
    if len(movie['genre']) != 0:
        genres = movie['genre']
        genres_output = "Genre: {"
        
        for genre in genres[0:-1]:
            genres_output += f"{genre}, "

        genres_output += f" {genres[-1]}"
        genres_output += "}"

        result3.append(genres_output)
        
        actors = ", ".join(map(str, casting))
        result3.append(f" Actors: {actors}")
        
    return result3
 	

