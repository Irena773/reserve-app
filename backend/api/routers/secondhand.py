# パスオペレーション関数を定義
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import api.cruds.secondhand as secondhand_crud
from api.db import get_db

import api.schemas.secondhand as secondhand_schema

router = APIRouter()

@router.get("/secondhand", response_model=List[secondhand_schema.SecondHand])
async def list_secondhand(db: AsyncSession = Depends(get_db)):
    return await secondhand_crud.get_secondhand_with_done(db)

# リクエストに対してレスポンスデータは id を持つ
@router.post("/secondhand", response_model=secondhand_schema.SecondHandRegisterResponse)
async def create_secondhand(
    secondhand_body: secondhand_schema.SecondHandRegister, db: AsyncSession = Depends(get_db)
    ):
    return await secondhand_crud.create_secondhand(db, secondhand_body)

@router.put("/secondhand/{secondhand_id}", response_model=secondhand_schema.SecondHandRegisterResponse)
async def update_secondhand(
    secondhand_id: int, secondhand_body: secondhand_schema.SecondHandRegister, db:AsyncSession = Depends(get_db)
    ):
    secondhand = await secondhand_crud.get_secondhand(db, secondhand_id=secondhand_id)
    if secondhand is None:
        raise HTTPException(status_code=404, detail="secondhand not found")
    return await secondhand_crud.update_secondhand(db, secondhand_body, original=secondhand)


