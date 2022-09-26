from fastapi import APIRouter

router = APIRouter()

@router.put("/secondhand/{id}/done")
async def secondhand_done():
    pass

