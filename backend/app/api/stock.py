from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.inventory_service import (
    increase_stock,
    decrease_stock,
    transfer_stock,
    adjust_stock
)


router = APIRouter(
    prefix="/stock",
    tags=["Stock"]
)


@router.post("/receive")
def receive_stock(
    product_id: int,
    location_id: int,
    quantity: float,
    reference: str | None = None,
    note: str | None = None,
    db: Session = Depends(get_db)
):
    try:
        stock = increase_stock(
            db=db,
            product_id=product_id,
            location_id=location_id,
            quantity=quantity,
            reference=reference,
            note=note
        )

        return {
            "message": "Stock received successfully",
            "product_id": stock.product_id,
            "location_id": stock.location_id,
            "quantity": stock.quantity
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.post("/deliver")
def deliver_stock(
    product_id: int,
    location_id: int,
    quantity: float,
    reference: str | None = None,
    note: str | None = None,
    db: Session = Depends(get_db)
):
    try:
        stock = decrease_stock(
            db=db,
            product_id=product_id,
            location_id=location_id,
            quantity=quantity,
            reference=reference,
            note=note
        )

        return {
            "message": "Stock delivered successfully",
            "product_id": stock.product_id,
            "location_id": stock.location_id,
            "quantity": stock.quantity
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.post("/transfer")
def transfer(
    product_id: int,
    from_location_id: int,
    to_location_id: int,
    quantity: float,
    reference: str | None = None,
    note: str | None = None,
    db: Session = Depends(get_db)
):
    try:
        stock = transfer_stock(
            db=db,
            product_id=product_id,
            from_location_id=from_location_id,
            to_location_id=to_location_id,
            quantity=quantity,
            reference=reference,
            note=note
        )

        return {
            "message": "Stock transferred successfully",
            "product_id": stock.product_id,
            "location_id": stock.location_id,
            "quantity": stock.quantity
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@router.post("/adjust")
def adjust(
    product_id: int,
    location_id: int,
    counted_quantity: float,
    reference: str | None = None,
    note: str | None = None,
    db: Session = Depends(get_db)
):
    try:
        stock = adjust_stock(
            db=db,
            product_id=product_id,
            location_id=location_id,
            counted_quantity=counted_quantity,
            reference=reference,
            note=note
        )

        return {
            "message": "Stock adjusted successfully",
            "product_id": stock.product_id,
            "location_id": stock.location_id,
            "quantity": stock.quantity
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )