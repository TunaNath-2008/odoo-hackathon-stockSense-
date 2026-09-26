from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    department_id: int


class CategoryResponse(BaseModel):
    id: int
    name: str
    department_id: int

    class Config:
        from_attributes = True