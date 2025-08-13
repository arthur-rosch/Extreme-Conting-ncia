# Integração WhatsApp com Evolution API

Esta documentação explica como usar a integração WhatsApp para enviar notificações de novas BMs e BMs vendidas.

## ⚙️ Configuração

### 1. Variáveis de Ambiente

**⚠️ IMPORTANTE**: O erro 400 está acontecendo porque as variáveis de ambiente não estão configuradas!

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# Evolution API Configuration
EVOLUTION_API_URL=https://sua-evolution-api.com
EVOLUTION_API_KEY=sua-chave-de-api-aqui
EVOLUTION_INSTANCE_NAME=nome-da-sua-instancia
```

### 2. Como Obter as Credenciais

1. **URL da API**: Endpoint da sua instância Evolution API
2. **API Key**: Chave de autenticação da sua instância
3. **Instance Name**: Nome da instância configurada

### 3. Verificar Configuração

Execute o comando para debug:
```bash
node scripts/debug-whatsapp.js
```

Ou acesse: `http://localhost:3000/api/whatsapp/test`

### 2. Dependências

As seguintes dependências foram instaladas:
- `axios` - Para requisições HTTP
- `zod` - Para validação de dados (já estava instalado)

## 🚀 Rotas Disponíveis

### 1. Nova BM Disponível

**Endpoint:** `POST /api/whatsapp/new-bm`

**Payload:**
```json
{
  "bmId": "bm-123",
  "name": "BMW X1 2020",
  "price": 85000,
  "location": "São Paulo - SP",
  "description": "Carro em excelente estado, único dono",
  "recipients": [
    "11999999999",
    "5511888888888",
    "(11) 7777-7777"
  ]
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "totalSent": 3,
  "totalFailed": 0,
  "results": [
    {
      "number": "5511999999999",
      "success": true,
      "error": null
    }
  ]
}
```

### 2. BM Vendida

**Endpoint:** `POST /api/whatsapp/sold-bm`

**Payload:**
```json
{
  "bmId": "bm-123",
  "name": "BMW X1 2020",
  "price": 85000,
  "buyerInfo": "João Silva",
  "recipients": [
    "11999999999",
    "5511888888888"
  ]
}
```

### 3. Verificar Status

**Endpoint:** `GET /api/whatsapp/new-bm` ou `GET /api/whatsapp/sold-bm`

Retorna o status da conexão com a Evolution API.

## 📱 Formatação de Números

O sistema formata automaticamente números brasileiros:

- `11999999999` → `5511999999999`
- `(11) 9999-9999` → `5511999999999`
- `11 9 9999-9999` → `5511999999999`
- `5511999999999` → `5511999999999` (já formatado)

## 💻 Exemplo de Uso no Frontend

```typescript
import { sendNewBMNotification } from '@/lib/whatsapp-examples';

// Enviar notificação de nova BM
const bmData = {
  bmId: 'bm-123',
  name: 'BMW X1 2020',
  price: 85000,
  location: 'São Paulo - SP',
  description: 'Carro em excelente estado',
  recipients: ['11999999999', '11888888888']
};

try {
  const result = await sendNewBMNotification(bmData);
  console.log('Mensagens enviadas:', result);
} catch (error) {
  console.error('Erro:', error);
}
```

## 🔧 Exemplo com cURL

### Nova BM:
```bash
curl -X POST http://localhost:3000/api/whatsapp/new-bm \
  -H "Content-Type: application/json" \
  -d '{
    "bmId": "bm-123",
    "name": "BMW X1 2020",
    "price": 85000,
    "location": "São Paulo - SP",
    "recipients": ["11999999999"]
  }'
```

### BM Vendida:
```bash
curl -X POST http://localhost:3000/api/whatsapp/sold-bm \
  -H "Content-Type: application/json" \
  -d '{
    "bmId": "bm-123",
    "name": "BMW X1 2020",
    "price": 85000,
    "buyerInfo": "João Silva",
    "recipients": ["11999999999"]
  }'
```

## 📝 Templates de Mensagem

### Nova BM:
```
BMW X1 2020

Carro em excelente estado, único dono, aceito cartão e financiamento.
```

### BM Vendida:
```
BM #001 VENDIDA 🧙🏻‍♂️✅
```

## 📱 Número de Teste

Todas as mensagens são enviadas para o número de teste: **47984473369**

Para alterar, edite o arquivo `lib/whatsapp-config.ts`.

## 🛠️ Testando a Integração

Execute o script de teste:

```bash
node scripts/test-whatsapp.js
```

## ⚠️ Tratamento de Erros

- **400**: Dados inválidos no payload
- **503**: Instância WhatsApp não conectada
- **500**: Erro interno do servidor

## 🔍 Debugging

- Verifique os logs do console para erros detalhados
- Use as rotas GET para verificar o status da conexão
- Teste a formatação de números com o script de teste

## 🎯 Interface do Usuário

### Formulário de BM (BMForm)
- ✅ **Botão "Enviar WhatsApp"** - Envia notificação de nova BM disponível
- 🔄 **Auto-formatação** - Usa dados do formulário atual
- ⚡ **Validação** - Verifica título e preço antes de enviar

### Tabela de BMs (BMTable)
- ✅ **Botão de venda** (💰) - Aparece apenas para BMs disponíveis
- 🔄 **Mudança de status** - Marca automaticamente como "vendida"
- 📱 **Notificação automática** - Envia WhatsApp ao confirmar venda
- 📝 **Info do comprador** - Campo opcional para dados do comprador

## ⚙️ Configuração de Contatos

Edite o arquivo `lib/whatsapp-config.ts` para configurar os contatos:

```typescript
export const DEFAULT_WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    name: 'Admin Principal',
    number: '11999999999', // Substitua pelo número real
    active: true,
    notifications: {
      newBM: true,    // Recebe notificações de nova BM
      soldBM: true,   // Recebe notificações de BM vendida
    },
  },
  // Adicione mais contatos...
];
```

## 📚 Arquivos Criados

- `lib/whatsapp-service.ts` - Serviço principal da Evolution API
- `app/api/whatsapp/new-bm/route.ts` - Rota para nova BM
- `app/api/whatsapp/sold-bm/route.ts` - Rota para BM vendida
- `hooks/use-whatsapp.ts` - Hook React para facilitar uso
- `lib/whatsapp-config.ts` - Configuração de contatos
- `WHATSAPP_INTEGRATION.md` - Esta documentação

