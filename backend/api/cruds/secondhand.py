from sqlalchemy.ext.asyncio import AsyncSession

import api.models.secondhand as secondhand_model
import api.schemas.secondhand as secondhand_schema

from typing import List, Tuple, Optional
from sqlalchemy import select
from sqlalchemy.engine import Result


async def create_secondhand(
    db: AsyncSession, secondhand_create: secondhand_schema.SecondHandRegister
) -> secondhand_model.SecondHand:
    secondhand = secondhand_model.SecondHand(**secondhand_create.dict())
    db.add(secondhand)
    await db.commit()
    await db.refresh(secondhand)
    return secondhand

async def get_secondhand(db: AsyncSession, secondhand_id: int) -> Optional[secondhand_model.SecondHand]:
    result: Result = await db.execute(
        select(secondhand_model.SecondHand).filter(secondhand_model.SecondHand.id == secondhand_id)
    )
    secondhand: Optional[Tuple[secondhand_model.SecondHand]] = result.first()
    return secondhand[0] if secondhand is not None else None 

async def get_secondhand_with_done(db:AsyncSession) -> List[Tuple[int,int,int,str,bool]]:
    result: Result = await(
        db.execute(
            select(               
                secondhand_model.SecondHand.id,
                secondhand_model.SecondHand.reserve_time,
                secondhand_model.SecondHand.elapsed_time,
                secondhand_model.SecondHand.status,
            )
        )
    )
    return result.all()

async def update_secondhand(
    db: AsyncSession, secondhand_create: secondhand_schema.SecondHandRegister, original:secondhand_model.SecondHand
) -> secondhand_model.SecondHand:
    original.status = secondhand_create.status
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original