from typing import Union

from fastapi import FastAPI
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.static import players
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguegamefinder
from nba_api.live.nba.endpoints import boxscore

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/scoreboard")
def get_scoreboard():
    # games = scoreboard.ScoreBoard()
    # games.get_json()
    # games.get_dict()
    return (scoreboard.ScoreBoard().games.get_dict())

@app.get("/getGame/{game_id}")
def get_game(game_id: int, q: Union[str, None] = None):
    # Get **all** the games so we can filter to an individual GAME_ID
    result = leaguegamefinder.LeagueGameFinder()
    all_games = result.get_data_frames()[0]
    # Find the game_id we want
    print(game_id)
    print(all_games)
    full_game = all_games[all_games.GAME_ID == game_id]
    full_game
    print(full_game)
    return (full_game)

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

