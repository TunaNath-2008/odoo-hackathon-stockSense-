from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    business_id: Mapped[int] = mapped_column(
        ForeignKey("businesses.id"),
        nullable=False
    )

    business = relationship(
        "Business",
        back_populates="departments"
    )

    categories = relationship(
        "Category",
        back_populates="department"
    )