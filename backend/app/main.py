from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import User
from app.api.stock import router as stock_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="StockSense API",
    description="Users, Operations & Intelligence Backend",
    version="1.0.0"
)


app.include_router(stock_router)


@app.get("/")
def root():
    return {
        "message": "StockSense Backend is running!"
    }