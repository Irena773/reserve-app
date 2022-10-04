from sqlite3 import Time
from typing import Optional
from pydantic import BaseModel, Field
import datetime

class SecondHandBase(BaseModel):
    status: Optional[str] = Field(None, example="査定中")
    reserve_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())
    elapsed_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())

class SecondHandRegister(SecondHandBase):
    pass

class SecondHandRegisterResponse(SecondHandRegister):
    id:int
    reserve_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())
    elapsed_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())
    class Config:
        orm_mode = True

class SecondHand(SecondHandBase):
    id: int
    reserve_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())
    elapsed_time: Optional[datetime.datetime] = Field(datetime.datetime.now().isoformat())
    done: bool = Field(False, description="完了フラグ")
    class Config:
        orm_mode = True