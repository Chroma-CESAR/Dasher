from fastapi import FastAPI
from fastcrud import FastCRUD
from fastcrud import crud_router

from src.config.db import get_session, lifespan
from src.models.categoria import Categoria
from src.models.despesa import Despesa
from src.models.movimentacao import Movimentacao
from src.models.anotacao import Anotacao

from src.schemas.categoria_schemas import CategoriaCreate
from src.schemas.despesas_schemas import DespesaCreate
from src.schemas.movimentacao_schemas import MovimentacaoCreate
from src.schemas.anotacao_schemas import AnotacaoCreate

app = FastAPI(lifespan=lifespan)

categoria_crud = FastCRUD(Categoria)
categoria_router = crud_router(
    session=get_session,
    model=Categoria,
    create_schema=CategoriaCreate,
    update_schema=CategoriaCreate,
    crud=categoria_crud,
    path="/categorias",
    tags=["Categorias"]
)

despesa_crud = FastCRUD(Despesa)
despesa_router = crud_router(
    session=get_session,
    model=Despesa,
    create_schema=DespesaCreate,
    update_schema=DespesaCreate,
    crud=despesa_crud,
    path="/despesas",
    tags=["Despesas"]
)

movimentacao_crud = FastCRUD(Movimentacao)
movimentacao_router = crud_router(
    session=get_session,
    model=Movimentacao,
    create_schema=MovimentacaoCreate,
    update_schema=MovimentacaoCreate,
    crud=movimentacao_crud,
    path="/movimentacoes",
    tags=["Movimentações"]
)

anotacao_crud = FastCRUD(Anotacao)
anotacao_router = crud_router(
    session=get_session,
    model=Anotacao,
    create_schema=AnotacaoCreate,
    update_schema=AnotacaoCreate,
    crud=anotacao_crud,
    path="/anotacoes",
    tags=["Anotações"]
)

app.include_router(categoria_router)
app.include_router(despesa_router)
app.include_router(movimentacao_router)
app.include_router(anotacao_router)
