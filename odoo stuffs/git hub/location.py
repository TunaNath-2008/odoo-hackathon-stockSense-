from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Location(Base):
    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    location_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    capacity: Mapped[float | None] = mapped_column()

    warehouse_id: Mapped[int] = mapped_column(
        ForeignKey("warehouses.id"),
        nullable=False
    )

    parent_id: Mapped[int | None] = mapped_column(
        ForeignKey("locations.id")
    )

    warehouse = relationship(
        "Warehouse",
        back_populates="locations"
    )

    parent = relationship(
        "Location",
        remote_side="Location.id"
    )