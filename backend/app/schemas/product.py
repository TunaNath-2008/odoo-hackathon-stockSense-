from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    sku: str
    unit: str
    initial_stock: float = 0
    reorder_level: float = 0
    category_id: int


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    unit: str
    initial_stock: float
    reorder_level: float
    category_id: int

    class Config:
        from_attributes = True