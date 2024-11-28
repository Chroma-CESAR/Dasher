# Dasher

**Dasher** é um projeto acadêmico desenvolvido para a cadeira de **Projetos 05** da faculdade **CESAR School**. Este projeto foi criado para atender às necessidades da **Eceel-Tech**, uma empresa de suporte de TI localizada em Curitiba. O objetivo é melhorar a qualidade de trabalho dos funcionários, facilitando a visualização de dados financeiros das movimentações da empresa.

O projeto combina tecnologias modernas em uma arquitetura full-stack, utilizando Docker para orquestração de serviços.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Sobre o Projeto

O **Dasher** visa fornecer uma solução eficiente para a **Eceel-Tech**, otimizando a visualização de dados financeiros e, assim, contribuindo para melhorar a tomada de decisões. A interface simples e intuitiva foi projetada para facilitar o uso por parte dos funcionários da empresa, independentemente de sua experiência técnica.

Características principais:
- Visualização centralizada das movimentações financeiras.
- Backend robusto para manipulação e consulta de dados.
- Integração com APIs e serviços externos, se necessário.
- Docker para facilitar o deploy e a portabilidade do sistema.

---

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu sistema:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) 
- [Python](https://www.python.org/)

---

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/dasher.git
   cd dasher
   ```

2. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de acordo com o seu ambiente.

3. Inicie os serviços com Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Acesse o aplicativo:
   - O **frontend** estará disponível em `http://localhost:3000`.
   - O **backend** estará disponível em `http://localhost:5000`.

---

## Configuração

As variáveis de ambiente configuradas no arquivo `.env` incluem informações como:

- Credenciais de banco de dados.
- Chaves de API externas.
- Configurações específicas do ambiente (desenvolvimento, produção, etc.).

Certifique-se de nunca compartilhar o arquivo `.env` diretamente.

---

## Como Usar

1. Acesse o frontend para interagir com o aplicativo.
2. O backend gerencia todas as requisições e lógica de negócio.
3. Utilize as APIs documentadas no backend para integração com outros serviços, se necessário.

---

## Estrutura do Projeto

```plaintext
Dasher/
├── frontend/            # Código da interface do usuário
├── backend/             # Código do servidor e lógica de negócio
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── Docker-compose.yml   # Orquestração de serviços com Docker
├── .env.example         # Exemplo de configuração de variáveis de ambiente
└── .git/                # Controle de versão com Git
```

