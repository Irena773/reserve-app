# パスオペレーション関数を定義
from typing import List
from fastapi import APIRouter
import api.schemas.secondhand as secondhand_schema

router = APIRouter()

@router.get("/secondhand", response_model=List[secondhand_schema.SecondHand])
async def list_secondhand():
    return [secondhand_schema.SecondHand(id=1, reserve_time=202209271100, elapsed_time=10, status="呼び出し中")]


@router.post("/secondhand")
async def register_secondhand():
    pass

@router.put("/secondhand/{id}")
async def update_secondhand():
    pass