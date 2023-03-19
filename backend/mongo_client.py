from pymongo import MongoClient

# Replace the connection string with your own
client = MongoClient("mongodb+srv://jBabal:<R4i9pGvjA2Ewz24QpLmf>@cluster0.sj4p3mx.mongodb.net/?retryWrites=true&w=majority")
db = client["live-basketball"]
users_collection = db["users"]
user_id = users_collection.insert_one({"username": "johndoe", "password": "password123"}).inserted_id

favorite_teams_collection = db["favorite_teams"]