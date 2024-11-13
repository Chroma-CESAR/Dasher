from sqlalchemy import (
    Column,
    Integer,
    String
)
from sqlalchemy.orm import relationship
from src.config.base import Base

class Categoria(Base):
    __tablename__ = 'categoria'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String, nullable=False)

    # Relacionamento com despesas (opcional, para facilitar queries)
    despesas = relationship("Despesa", back_populates="categoria")