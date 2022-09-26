from fastapi import APIRouter

router = APIRouter()

@router.put("/secondhand/{secondhand_id}/done", response_model=None)
async def secondhand_done(secondhand_id:int):
    return

