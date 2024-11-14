from sqlalchemy import (
    Column,
    Integer,
    String
)
from sqlalchemy.orm import relationship
from src.config.base import Base

class MetodoPagamento(Base):
    __tablename__ = 'metodo_pagamento'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    metodo = Column(String, unique=True, nullable=False)

    despesas = relationship("Despesa", back_populates="metodo_pagamento")