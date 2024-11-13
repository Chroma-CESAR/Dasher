from fastapi import FastAPI
from fastcrud import FastCRUD
from fastcrud import crud_router

from src.config.db import get_session, lifespan
from src.models.categoria import Categoria
from src.models.despesa import Despesa
from src.schemas.categoria_schemas import CategoriaCreate, CategoriaResponse
from src.schemas.despesas_schemas import DespesaCreate, DespesaResponse

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

app.include_router(categoria_router)
app.include_router(despesa_router)
