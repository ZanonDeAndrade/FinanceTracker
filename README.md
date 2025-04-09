# Aplicativo de Controle Financeiro

Uma aplicação web para gerenciamento de finanças pessoais com suporte a registro de receitas e despesas, visualização de saldo, gráficos e lista de transações.

## Funcionalidades

- Cadastro de receitas e despesas
- Visualização de saldo atual
- Gráficos de gastos por categoria
- Lista de transações com filtros
- Suporte a tema claro/escuro

## Tecnologias Utilizadas

### Frontend
- React
- Tailwind CSS
- Recharts (para gráficos)
- Lucide React (para ícones)
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Instalação e Uso

### Pré-requisitos
- Node.js (v14+)
- npm ou yarn
- MongoDB

### Backend

1. Clone o repositório
```
git clone <url-do-repositorio>
cd finance-tracker-backend
```

2. Instale as dependências
```
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
NODE_ENV=development
```

4. Inicie o servidor
```
npm run dev
```

### Frontend

1. Navegue para o diretório frontend
```
cd ../finance-tracker-frontend
```

2. Instale as dependências
```
npm install
```

3. Inicie a aplicação
```
npm start
```

4. Acesse a aplicação em `http://localhost:3000`

## API Endpoints

- `GET /api/transactions` - Obter todas as transações
- `POST /api/transactions` - Adicionar uma nova transação
- `GET /api/transactions/:id` - Obter uma transação específica
- `PUT /api/transactions/:id` - Atualizar uma transação
- `DELETE /api/transactions/:id` - Excluir uma transação
- `GET /api/transactions/stats` - Obter estatísticas das transações

## Estrutura do Projeto

### Frontend
```
finance-tracker-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── BalanceSummary.jsx
│   │   └── Charts/
│   │       ├── CategoryChart.jsx
│   │       └── TimelineChart.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```

### Backend
```
finance-tracker-backend/
├── src/
│   ├── controllers/
│   │   └── transactionController.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactions.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── server.js
├── package.json
└── .env
```
