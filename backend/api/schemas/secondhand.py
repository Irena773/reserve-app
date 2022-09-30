from typing import Optional
from pydantic import BaseModel, Field
import datetime

class SecondHandBase(BaseModel):
    status: Optional[str] = Field(None, example="査定中")

class SecondHandRegister(SecondHandBase):
    pass

class SecondHandRegisterResponse(SecondHandRegister):
    id:int

    class Config:
        orm_mode = True

class SecondHand(SecondHandBase):
    id: int
    reserve_time: Optional[int] = Field(datetime.datetime.today())
    elapsed_time: Optional[int] = Field(datetime.datetime.today())
    done: bool = Field(False, description="完了フラグ")
    class Config:
        orm_mode = True