from pydantic import BaseModel


class WarehouseCreate(BaseModel):
    name: str
    code: str
    address: str | None = None
    business_id: int


class WarehouseResponse(BaseModel):
    id: int
    name: str
    code: str
    address: str | None = None
    business_id: int

    class Config:
        from_attributes = True