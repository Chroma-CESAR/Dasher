from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional

class MovimentacaoBase(BaseModel):
    data_movimentacao: date = Field(..., description="Data da movimentação")
    numero_documento: str = Field(..., description="Número do documento da movimentação")
    descricao: str = Field(..., description="Descrição da movimentação")
    tipo_operacao: str = Field(..., pattern="^(Débito|Crédito)$", description="Tipo de operação ('Crédito' ou 'Débito')")
    valor: Decimal = Field(..., description="Valor da movimentação")
    banco: str = Field(...,example="Caixa", description="Banco da movimentação")

class MovimentacaoCreate(MovimentacaoBase):
    pass

class MovimentacaoResponse(MovimentacaoBase):
    id: int = Field(..., description="ID único da movimentação")
    categoria: str = Field(..., description="Categoria da movimentação")
    
    class Config:
        from_attributes = True