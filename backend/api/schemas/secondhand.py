from sqlite3 import Time
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime, timedelta, timezone

JST = timezone(timedelta(hours=+9), 'JST')
class SecondHandBase(BaseModel):
    status: Optional[str] = Field(None, example="査定中")
    reserve_time: Optional[datetime] = Field(None, example= datetime.now(JST))
    elapsed_time: Optional[datetime] = Field(None, example= datetime.now(JST))

class SecondHandRegister(SecondHandBase):
    pass

class SecondHandRegisterResponse(SecondHandRegister):
    id:int
    reserve_time: Optional[datetime] = Field(datetime.now(JST))
    elapsed_time: Optional[datetime] = Field(datetime.now(JST))
    class Config:
        orm_mode = True

class SecondHand(SecondHandBase):
    id: int
    reserve_time: Optional[datetime] = Field(datetime.now(JST))
    elapsed_time: Optional[datetime] = Field(datetime.now(JST))
    class Config:
        orm_mode = True