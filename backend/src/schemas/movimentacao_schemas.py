from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal
from typing import Optional

class MovimentacaoBase(BaseModel):
    data_movimentacao: date = Field(..., description="Data da movimentação")
    numero_documento: str = Field(..., description="Número do documento da movimentação")
    descricao: str = Field(..., description="Descrição da movimentação")
    tipo_operacao: str = Field(..., pattern="^(Debito|Crédito)$", description="Tipo de operação ('crédito' ou 'débito')")
    valor: Decimal = Field(..., description="Valor da movimentação")
    observacoes: Optional[str] = Field(None, description="Observações adicionais")

class MovimentacaoCreate(MovimentacaoBase):
    pass

class MovimentacaoResponse(MovimentacaoBase):
    id: int = Field(..., description="ID único da movimentação")
    
    class Config:
        orm_mode = True