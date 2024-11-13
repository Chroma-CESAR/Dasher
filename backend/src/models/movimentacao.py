from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Numeric,
    CheckConstraint,
    Text
)
from src.config.base import Base

class Movimentacao(Base):
    __tablename__ = "movimentacao"

    id = Column(Integer, primary_key=True, autoincrement=True)
    data_movimentacao = Column(Date, nullable=False)
    numero_documento = Column(String, nullable=False, default="000000")
    descricao = Column(String, nullable=False)
    tipo_operacao = Column(
        String,
        CheckConstraint("tipo_operacao in ('Debito', 'Crédito')"),
        nullable=False
    )
    valor = Column(Numeric(10, 2), nullable=False)
    observacoes = Column(Text)