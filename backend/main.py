from typing import Union

from fastapi import FastAPI
from nba_api.stats.static import players
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguegamefinder
from nba_api.live.nba.endpoints import scoreboard
from nba_api.live.nba.endpoints import boxscore
from datetime import date, timedelta
from nba_api.stats.endpoints import scoreboardv2
from nba_api.stats.endpoints import boxscoretraditionalv2

from fastapi.middleware.cors import CORSMiddleware

# from mongo_client import users_collection
# from mongo_client import favorite_teams_collection
# from mongo_client import db
# from bson.objectid import ObjectId

# from pymongo import MongoClient

app = FastAPI()

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

# * login/user
# Add a new user to the users_collection
# @app.post("/addUser/{username}/{password}")
# async def add_user(username: str, password: str):
#     # Check if a user with the same username already exists
#     if users_collection.find_one({"username": username}):
#         return {"error": "Username already exists"}
    
#     # Insert the new user into the users_collection
#     user = {
#         "_id": ObjectId(),
#         "username": username,
#         "password": password
#     }

#     result = users_collection.insert_one(user)    
#     # Return the new user's ID
#     return str(result.inserted_id)


# # Get all the users from the users_collection
# @app.get("/getUsers")
# async def get_all_users():
#     print("==here")
#     users = []
#     for user in users_collection.find():
#         print("id", user["_id"], "username", user["username"], "pass", [user["password"]])
#         users.append({"id": str(user["_id"]), "username": user["username"], "password": user["password"]})
#     return users


@app.get("/scoreboard")
def get_scoreboard():
    return (scoreboard.ScoreBoard().games.get_dict())

# @app.get("/getGame/{game_id}")
# def get_game(game_id: int, q: Union[str, None] = None):
#     # Get **all** the games so we can filter to an individual GAME_ID
#     result = leaguegamefinder.LeagueGameFinder()
#     all_games = result.get_data_frames()[0]
#     # Find the game_id we want
#     print(game_id)
#     print(all_games)
#     full_game = all_games[all_games.GAME_ID == game_id]
#     full_game
#     print(full_game)
#     return (full_game)

@app.get("/getActivePlayers")
def get_active_players():
    return (players.get_active_players())

@app.get("/getAllTeams")
def get_all_teams():
    return (teams.get_teams())

@app.get("/boxScore/{game_id}")
def get_boxScore(game_id: str):
    box = boxscore.BoxScore(game_id)
    boxscore_data = box.game.get_dict()

    # return the boxscore data as JSON
    return boxscore_data

@app.get("/getYesterdayGames")
def get_games_yesterday():
    yesterday = date.today() - timedelta(days=1)
    scoreboard_endpoint = scoreboardv2.ScoreboardV2(day_offset=-1, game_date=yesterday.strftime('%m/%d/%Y'))
    games = scoreboard_endpoint.line_score.get_data_frame().to_dict("records")
    return games
 
@app.get("/getYesterdayGameDetails/{gameId}")
def get_yesterday_gameDetails(gameId: str): 
    box = boxscore.BoxScore(gameId)
    boxscore_data = box.game.get_dict()
    # return the boxscore data as JSON
    return boxscore_data

