from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.warehouse import Warehouse
from app.schemas.warehouse import WarehouseCreate, WarehouseResponse


router = APIRouter(
    prefix="/warehouses",
    tags=["Warehouses"]
)


@router.post("/", response_model=WarehouseResponse)
def create_warehouse(
    warehouse: WarehouseCreate,
    db: Session = Depends(get_db)
):
    new_warehouse = Warehouse(
        name=warehouse.name,
        code=warehouse.code,
        address=warehouse.address,
        business_id=warehouse.business_id
    )

    db.add(new_warehouse)
    db.commit()
    db.refresh(new_warehouse)

    return new_warehouse


@router.get("/", response_model=list[WarehouseResponse])
def get_warehouses(
    db: Session = Depends(get_db)
):
    return db.query(Warehouse).all()