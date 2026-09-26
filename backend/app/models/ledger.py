from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class StockLedger(Base):
    __tablename__ = "stock_ledger"

    id: Mapped[int] = mapped_column(primary_key=True)

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False
    )

    location_id: Mapped[int] = mapped_column(
        ForeignKey("locations.id"),
        nullable=False
    )

    movement_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    quantity: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    reference: Mapped[str | None] = mapped_column(
        String(100)
    )

    note: Mapped[str | None] = mapped_column(
        String(250)
    )

    product = relationship("Product")

    location = relationship("Location")