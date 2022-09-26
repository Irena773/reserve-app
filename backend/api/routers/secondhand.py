# パスオペレーション関数を定義
from fastapi import APIRouter

router = APIRouter()

@router.get("/secondhand")
async def list_secondhand():
    pass

@router.post("/secondhand")
async def register_secondhand():
    pass

@router.put("/secondhand/{id}")
async def update_secondhand():
    pass