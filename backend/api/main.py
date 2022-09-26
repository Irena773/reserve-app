from fastapi import FastAPI

app = FastAPI()


# @ デコレータ　関数に新たな機能を追加
@app.get("/hello")
async def hello():
    return {"message": "hello world!"}