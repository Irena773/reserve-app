from fastapi import FastAPI
from api.routers import secondhand, done

app = FastAPI()

# @ デコレータ　関数に新たな機能を追加
app.include_router(secondhand.router)
app.include_router(done.router)