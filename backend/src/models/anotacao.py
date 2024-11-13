from sqlalchemy import Column, Integer, Date, Text
from src.config.db import Base

class Anotacao(Base):
    __tablename__ = "anotacao"

    id = Column(Integer, primary_key=True, autoincrement=True)
    data = Column(Date, nullable=False)
    observacao = Column(Text, nullable=False)
