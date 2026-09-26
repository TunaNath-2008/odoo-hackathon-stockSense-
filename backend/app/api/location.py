from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.location import Location
from app.schemas.location import LocationCreate, LocationResponse


router = APIRouter(
    prefix="/locations",
    tags=["Locations"]
)


@router.post("/", response_model=LocationResponse)
def create_location(
    location: LocationCreate,
    db: Session = Depends(get_db)
):
    new_location = Location(
        name=location.name,
        location_type=location.location_type,
        capacity=location.capacity,
        warehouse_id=location.warehouse_id,
        parent_id=location.parent_id
    )

    db.add(new_location)
    db.commit()
    db.refresh(new_location)

    return new_location


@router.get("/", response_model=list[LocationResponse])
def get_locations(
    db: Session = Depends(get_db)
):
    return db.query(Location).all()