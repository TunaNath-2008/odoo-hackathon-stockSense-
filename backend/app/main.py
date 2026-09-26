from fastapi import FastAPI

from app.core.database import Base, engine
from app.models import User

from app.routers.users import router as users_router

from app.api.business import router as business_router
from app.api.department import router as department_router
from app.api.category import router as category_router
from app.api.product import router as product_router
from app.api.stock import router as stock_router
from app.api.warehouse import router as warehouse_router
from app.api.location import router as location_router
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="StockSense API",
    description="Inventory Management System Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users_router)

app.include_router(business_router)
app.include_router(department_router)
app.include_router(category_router)
app.include_router(product_router)
app.include_router(stock_router)
app.include_router(warehouse_router)
app.include_router(location_router)


@app.get("/")
def root():
    return {
        "message": "StockSense Backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }