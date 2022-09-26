# パスオペレーション関数を定義
from typing import List
from fastapi import APIRouter
import api.schemas.secondhand as secondhand_schema

router = APIRouter()

@router.get("/secondhand", response_model=List[secondhand_schema.SecondHand])
async def list_secondhand():
    return [secondhand_schema.SecondHand(id=1, reserve_time=202209271100, elapsed_time=10, status="呼び出し中")]

# リクエストに対してレスポンスデータは id を持つ
@router.post("/secondhand", response_model=secondhand_schema.SecondHandRegisterResponse)
async def register_secondhand(secondhand_body: secondhand_schema.SecondHandRegister):
    return secondhand_schema.SecondHandRegisterResponse(id=1, **secondhand_body.dict())

@router.put("/secondhand/{secondhand_id}", response_model=secondhand_schema.SecondHandRegisterResponse)
async def update_secondhand(secondhand_id: int, secondhand_body: secondhand_schema.SecondHandRegister):
    return secondhand_schema.SecondHandRegisterResponse(id=secondhand_id, **secondhand_body.dict())


