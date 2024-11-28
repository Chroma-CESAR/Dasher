from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from src.config.base import Base
from decouple import config as env
from fastapi import FastAPI
from src.config.seed import inserir_dados
from sqlalchemy.future import select
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
        async with async_session() as session:
            result = await session.execute(select(Movimentacao))
            if result.scalars().first() is None:
                await inserir_dados(async_session)
                print("\033[32mDados inseridos com sucesso no lifespan!\033[0m")
            else:
                 print("\033[33mTabela já contém dados. Seed não será executado.\033[0m")
                
    except Exception as e:
        print(f"\033[31mErro ao inserir dados no lifespan: {str(e)}\033[0m")
    
    yield
