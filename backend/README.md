# BackEnd

A API contém um Endpoints referente a _[produtos](https://radarfit-product-api-production.up.railway.app/produtos)_.

### Endpoints

#### Produtos

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os produtos | https://radarfit-product-api-production.up.railway.app/produtos |
| `GET` | Retorna os produtos de acordo com o termo passado parâmetro q | https://radarfit-product-api-production.up.railway.app/produtos/find?q=string |
| `GET` | Retorna os detalhes do produto específico | https://radarfit-product-api-production.up.railway.app/produtos/:id |
| `POST` | Adiciona um novo produto | https://radarfit-product-api-production.up.railway.app/produtos |
| `PUT` | Atualiza todos os dados de um produto específico | https://radarfit-product-api-production.up.railway.app/produtos/:id |
| `PATCH` | Atualiza alguns dados de um produto específico | https://radarfit-product-api-production.up.railway.app/produtos/:id |
| `DELETE` | Apaga um produto específico | https://radarfit-product-api-production.up.railway.app/produtos/:id |

Nas requisições POST e PUT é necessário informar o seguinte JSON:

```
{
  "produto": "Cadeira Gamer",
  "valor": 835.91,
  "descricao": "Xperiencie ULtra Branca"
}
```

**Observação:** a rota PATCH necessita informa pelo menos um dos campos presentes nas requisições POST e PUT.
