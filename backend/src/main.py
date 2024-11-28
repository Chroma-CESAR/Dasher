from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from fastcrud import FastCRUD
from fastcrud import crud_router
import joblib

from src.config.db import get_session, lifespan
from src.utils.tratar_dados import tratar_dados

from src.models.categoria import Categoria
from src.models.despesa import Despesa
from src.models.movimentacao import Movimentacao
from src.models.anotacao import Anotacao
from src.models.metodo_pagamento import MetodoPagamento

from src.schemas.categoria_schemas import CategoriaCreate
from src.schemas.despesas_schemas import DespesaCreate
from src.schemas.movimentacao_schemas import MovimentacaoCreate, MovimentacaoResponse
from src.schemas.anotacao_schemas import AnotacaoCreate
from src.schemas.metodo_pagamento_schemas import MetodoPagamentoCreate

app = FastAPI(lifespan=lifespan)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@movimentacao_router.post("/movimentacoes_create", response_model=MovimentacaoResponse, tags=["Movimentações"])
async def create_movimentacao(data: MovimentacaoCreate, session: AsyncSession = Depends(get_session)):
    try:
        mapeamento_categorias = {
            0: "Aluguel",
            1: "Contas de Consumo",
            2: "Despesas Diversas",
            3: "Educação",
            4: "Empréstimos",
            5: "Equipamentos",
            6: "Impostos e Taxas",
            7: "Pagamentos e Créditos",
            8: "Saúde",
            9: "Seguros",
            10: "Serviços Digitais",
            11: "Transporte"
        }

        rf_model = joblib.load("modelos/rf_model.pkl")
        vectorizer = joblib.load("modelos/tfidf_vectorizer.pkl")

        descricao_limpa = tratar_dados(data.descricao)
        descricao_tfidf = vectorizer.transform([descricao_limpa])
        categoria = rf_model.predict(descricao_tfidf)[0]

        print(f"Descrição: {data.descricao} - Categoria: {categoria}")

        movimentacao = Movimentacao(
            data_movimentacao=data.data_movimentacao,
            numero_documento=data.numero_documento,
            descricao=data.descricao,
            tipo_operacao=data.tipo_operacao,
            valor=data.valor,
            banco=data.banco,
            categoria=mapeamento_categorias[categoria]
        )

        session.add(movimentacao)
        await session.commit()
        await session.refresh(movimentacao)

        return movimentacao
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    

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
