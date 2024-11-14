from pydantic import BaseModel, Field

class MetodoPagamentoBase(BaseModel):
    metodo: str = Field(..., example="Cartão Final 0001",description="Nome do método de pagamento")

class MetodoPagamentoCreate(MetodoPagamentoBase):
    pass

class MetodoPagamentoResponse(MetodoPagamentoBase):
    id: int = Field(..., description="ID único do método de pagamento")
    
    class Config:
        orm_mode = True