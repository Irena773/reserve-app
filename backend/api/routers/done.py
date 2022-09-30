from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.done as done_schema
import api.cruds.done as done_crud
from api.db import get_db

router = APIRouter()

@router.put("/secondhand/{secondhand_id}/done", response_model=done_schema.DoneResponse)
async def mark_crud_as_done(secondhand_id:int, db:AsyncSession = Depends(get_db)):
    done = await done_crud.get_done(db, secondhand_id=secondhand_id)
    if done is not None:
        raise HTTPException(status_code=400, detail="Done already exists")

    return await done_crud.create_done(db, secondhand_id)

