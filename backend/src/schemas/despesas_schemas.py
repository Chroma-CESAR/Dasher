from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from decimal import Decimal

class DespesaBase(BaseModel):
    data_vencimento: date = Field(..., example="2024-11-15", description="Data de vencimento da despesa")
    descricao: str = Field(..., example="Compra no supermercado", description="Descrição da despesa")
    valor: Decimal = Field(..., example="150.75", description="Valor da despesa")
    categoria_id: int = Field(None, example=1, description="ID da categoria associada")
    data_pagamento: Optional[date] = Field(None, example="2024-11-13", description="Data de pagamento, se realizada")
    metodo_pagamento_id: int = Field(
        None, example="1", description="Método de pagamento usado"
    )


class DespesaCreate(DespesaBase):
    """Esquema para criar uma despesa (dados de entrada)."""
    pass


class DespesaResponse(DespesaBase):
    """Esquema para resposta de uma despesa (dados de saída)."""
    id: int = Field(..., example=1, description="ID único da despesa")

    class Config:
        orm_mode = True