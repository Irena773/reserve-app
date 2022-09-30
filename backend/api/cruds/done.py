from typing import Tuple, Optional

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.secondhand as secondhand_model


async def get_done(db: AsyncSession, secondhand_id: int) -> Optional[secondhand_model.Done]:
    result: Result = await db.execute(
        select(secondhand_model.Done).filter(secondhand_model.Done.id == secondhand_id)
    )
    done: Optional[Tuple[secondhand_model.Done]] = result.first()
    return done[0] if done is not None else None

async def create_done(db: AsyncSession, secondhand_id:int) -> secondhand_model.Done:
    done = secondhand_model.Done(id=secondhand_id)
    db.add(done)
    await db.commit()
    await db.refresh(done)
    return done
