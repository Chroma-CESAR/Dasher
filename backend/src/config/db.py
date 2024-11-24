from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from src.config.base import Base
from decouple import config as env
from fastapi import FastAPI
from src.models.movimentacao import Movimentacao

DATABASE_URL = env('DATABASE_URL')

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Database session dependency
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

# Create tables before the app start
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    try:
        await inserir_dados()
        print("Dados inseridos com sucesso no lifespan!")
    except Exception as e:
        print(f"Erro ao inserir dados no lifespan: {str(e)}")
    
    yield

# Função para popular o banco de dados
async def inserir_dados():
    try:
        async with async_session() as session:
            async with session.begin():
                # Note que os valores agora são números, não strings
                Movimentacao1 = Movimentacao(data_movimentacao="2024-01-08", numero_documento="815247", descricao="PAG FGTS", tipo_operacao="Débito", valor=427.30, banco="CAIXA")
                Movimentacao2 = Movimentacao(data_movimentacao="2024-01-10", numero_documento="341", descricao="CRED TED PANASONIC DO BRASIL LTDA NFS-e 2585", tipo_operacao="Crédito", valor=7721.98, banco="CAIXA")
                # ... (continue com os outros, mudando valor="123.45" para valor=123.45)

                session.add_all([
                    Movimentacao1, Movimentacao2
                    # ... resto das movimentações
                ])

                await session.commit()
                print("Dados inseridos com sucesso!")
    except Exception as e:
        print(f"Erro ao inserir dados: {str(e)}")
        await session.rollback()
        raise  # Re-lança a exceção para não silenciar o erro
