from pydantic import BaseModel, Field
from datetime import date

class AnotacaoBase(BaseModel):
    data: date = Field(..., description="Data da anotação")
    observacao: str = Field(..., description="Texto da anotação")

class AnotacaoCreate(AnotacaoBase):
    pass

class AnotacaoResponse(AnotacaoBase):
    id: int = Field(..., description="ID único da anotação")

    class Config:
        from_attributes = True
