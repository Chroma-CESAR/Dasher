from fastapi import FastAPI
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, NoResultFound
from fastcrud import FastCRUD
from fastcrud import crud_router

from src.config.db import get_session, lifespan

from src.models.categoria import Categoria
from src.models.despesa import Despesa
from src.models.movimentacao import Movimentacao
from src.models.anotacao import Anotacao
from src.models.metodo_pagamento import MetodoPagamento

from src.schemas.categoria_schemas import CategoriaCreate
from src.schemas.despesas_schemas import DespesaCreate
from src.schemas.movimentacao_schemas import MovimentacaoCreate
from src.schemas.anotacao_schemas import AnotacaoCreate
from src.schemas.metodo_pagamento_schemas import MetodoPagamentoCreate

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

metodo_pagamento_crud = FastCRUD(MetodoPagamento)
metodo_pagamento_router = crud_router(
    session=get_session,
    model=MetodoPagamento,
    create_schema=MetodoPagamentoCreate,
    update_schema=MetodoPagamentoCreate,
    crud=metodo_pagamento_crud,
    path="/metodos_pagamento",
    tags=["Metodos de Pagamento"]
)

# Tratamento de erros
@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"},
    )

@app.exception_handler(IntegrityError)
async def integrity_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": "Database integrity error occurred"},
    )

@app.exception_handler(NoResultFound)
async def no_result_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "No result found"},
    )

app.include_router(categoria_router)
app.include_router(despesa_router)
app.include_router(movimentacao_router)
app.include_router(anotacao_router)
app.include_router(metodo_pagamento_router)
