from pydantic import BaseModel, Field

class CategoriaBase(BaseModel):
    nome: str = Field(..., example="Alimentação", description="Nome da categoria")


class CategoriaCreate(CategoriaBase):
    """Esquema para criar uma categoria (dados de entrada)."""
    pass


class CategoriaResponse(CategoriaBase):
    """Esquema para resposta de uma categoria (dados de saída)."""
    id: int = Field(..., example=1, description="ID único da categoria")

    class Config:
        orm_mode = True