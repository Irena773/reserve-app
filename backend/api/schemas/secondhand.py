from typing import Optional
from pydantic import BaseModel, Field

class SecondHand(BaseModel):
    id: int
    reserve_time: int
    elapsed_time: int
    status: Optional[str] = Field(None, example="査定中")