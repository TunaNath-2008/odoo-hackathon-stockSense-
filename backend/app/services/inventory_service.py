from sqlalchemy.orm import Session

from app.models.stock import Stock
from app.models.ledger import StockLedger


def increase_stock(
    db: Session,
    product_id: int,
    location_id: int,
    quantity: float,
    movement_type: str = "RECEIPT",
    reference: str | None = None,
    note: str | None = None
):
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")

    stock = (
        db.query(Stock)
        .filter(
            Stock.product_id == product_id,
            Stock.location_id == location_id
        )
        .first()
    )

    if stock is None:
        stock = Stock(
            product_id=product_id,
            location_id=location_id,
            quantity=0
        )
        db.add(stock)

    stock.quantity += quantity

    ledger = StockLedger(
        product_id=product_id,
        location_id=location_id,
        movement_type=movement_type,
        quantity=quantity,
        reference=reference,
        note=note
    )

    db.add(ledger)
    db.commit()
    db.refresh(stock)

    return stock


def decrease_stock(
    db: Session,
    product_id: int,
    location_id: int,
    quantity: float,
    movement_type: str = "DELIVERY",
    reference: str | None = None,
    note: str | None = None
):
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")

    stock = (
        db.query(Stock)
        .filter(
            Stock.product_id == product_id,
            Stock.location_id == location_id
        )
        .first()
    )

    if stock is None:
        raise ValueError("No stock found at this location")

    if stock.quantity < quantity:
        raise ValueError("Insufficient stock")

    stock.quantity -= quantity

    ledger = StockLedger(
        product_id=product_id,
        location_id=location_id,
        movement_type=movement_type,
        quantity=-quantity,
        reference=reference,
        note=note
    )

    db.add(ledger)
    db.commit()
    db.refresh(stock)

    return stock


def transfer_stock(
    db: Session,
    product_id: int,
    from_location_id: int,
    to_location_id: int,
    quantity: float,
    reference: str | None = None,
    note: str | None = None
):
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero")

    if from_location_id == to_location_id:
        raise ValueError("Source and destination locations must be different")

    source_stock = (
        db.query(Stock)
        .filter(
            Stock.product_id == product_id,
            Stock.location_id == from_location_id
        )
        .first()
    )

    if source_stock is None:
        raise ValueError("No stock found at source location")

    if source_stock.quantity < quantity:
        raise ValueError("Insufficient stock at source location")

    destination_stock = (
        db.query(Stock)
        .filter(
            Stock.product_id == product_id,
            Stock.location_id == to_location_id
        )
        .first()
    )

    if destination_stock is None:
        destination_stock = Stock(
            product_id=product_id,
            location_id=to_location_id,
            quantity=0
        )
        db.add(destination_stock)

    source_stock.quantity -= quantity
    destination_stock.quantity += quantity

    source_ledger = StockLedger(
        product_id=product_id,
        location_id=from_location_id,
        movement_type="TRANSFER_OUT",
        quantity=-quantity,
        reference=reference,
        note=note
    )

    destination_ledger = StockLedger(
        product_id=product_id,
        location_id=to_location_id,
        movement_type="TRANSFER_IN",
        quantity=quantity,
        reference=reference,
        note=note
    )

    db.add(source_ledger)
    db.add(destination_ledger)

    db.commit()
    db.refresh(destination_stock)

    return destination_stock


def adjust_stock(
    db: Session,
    product_id: int,
    location_id: int,
    counted_quantity: float,
    reference: str | None = None,
    note: str | None = None
):
    if counted_quantity < 0:
        raise ValueError("Counted quantity cannot be negative")

    stock = (
        db.query(Stock)
        .filter(
            Stock.product_id == product_id,
            Stock.location_id == location_id
        )
        .first()
    )

    if stock is None:
        stock = Stock(
            product_id=product_id,
            location_id=location_id,
            quantity=0
        )
        db.add(stock)

    difference = counted_quantity - stock.quantity

    stock.quantity = counted_quantity

    ledger = StockLedger(
        product_id=product_id,
        location_id=location_id,
        movement_type="ADJUSTMENT",
        quantity=difference,
        reference=reference,
        note=note
    )

    db.add(ledger)
    db