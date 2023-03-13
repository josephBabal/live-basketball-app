from typing import Union

from fastapi import FastAPI
from nba_api.live.nba.endpoints import scoreboard
from nba_api.stats.static import players
from nba_api.stats.static import teams
from nba_api.stats.endpoints import leaguegamefinder

app = FastAPI()


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

@app.get("/items/{item_id}")
def read_item(item_id: str, q: str | None = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
