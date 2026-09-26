from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import User
<<<<<<< HEAD
from app.routers.users import router as users_router
=======
from app.api.stock import router as stock_router
>>>>>>> ab145e1ef87db9b8a1d9e151532700460ad0677f


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="StockSense API",
    description="Users, Operations & Intelligence Backend",
    version="1.0.0"
)


<<<<<<< HEAD
app.include_router(users_router)
=======
app.include_router(stock_router)
>>>>>>> ab145e1ef87db9b8a1d9e151532700460ad0677f


@app.get("/")
def root():
    return {
        "message": "StockSense Backend is running!"
    }