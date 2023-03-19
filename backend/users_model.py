from pydantic import BaseModel, EmailStr, Field

# from schematics.models import Model

class Users(BaseModel):
    username: str
    password: str
    