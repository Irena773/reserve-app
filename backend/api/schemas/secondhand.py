from typing import Optional
from pydantic import BaseModel, Field

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
    reserve_time: int
    elapsed_time: int
    
    class Config:
        orm_mode = True