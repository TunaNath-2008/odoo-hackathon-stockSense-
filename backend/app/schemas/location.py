from pydantic import BaseModel


class LocationCreate(BaseModel):
    name: str
    location_type: str
    capacity: float | None = None
    warehouse_id: int
    parent_id: int | None = None


class LocationResponse(BaseModel):
    id: int
    name: str
    location_type: str
    capacity: float | None = None
    warehouse_id: int
    parent_id: int | None = None

    class Config:
        from_attributes = True