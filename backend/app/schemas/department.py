from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    name: str
    business_id: int


class DepartmentResponse(BaseModel):
    id: int
    name: str
    business_id: int

    class Config:
        from_attributes = True