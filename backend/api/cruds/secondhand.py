from sqlalchemy.ext.asyncio import AsyncSession

import api.models.secondhand as secondhand_model
import api.schemas.secondhand as secondhand_schema

from typing import List, Tuple
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