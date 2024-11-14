from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Numeric,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from src.config.base import Base

class Despesa(Base):
    __tablename__ = 'despesas'

    id = Column(Integer, primary_key=True, autoincrement=True)
    data_vencimento = Column(Date, nullable=False)
    descricao = Column(String, nullable=False)
    valor = Column(Numeric(10, 2), nullable=False)
    categoria_id = Column(Integer, ForeignKey("categoria.id"), nullable=False)
    data_pagamento = Column(Date)
    metodo_pagamento_id = Column(Integer, ForeignKey("metodo_pagamento.id"), nullable=False)

    # Relacionamento com categoria
    categoria = relationship("Categoria", back_populates="despesas")

    # Relacionamento com método de pagamento
    metodo_pagamento = relationship("MetodoPagamento", back_populates="despesas")
