# API de Produtos 📱🎧📕

Consiste em uma aplicação full-stack para gerenciamento de produtos, onde é possível: criar, pesquisar, editar, apagar e favoritar os produtos. 

### BackEnd:

* Construído com Node.js, Express, Typescript, MongoDB e Zod
* Utilizando os princípios SOLID e Programação Orientada a Objetos
* Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores
* Testes unitários criados utilizando Mocha, Chai e Sinon

### FrontEnd:
* Construída utilizado React, Context API, React Hooks, Typescript, Bootstrap, React-Bootstrap e CSS

### Instruções

- Para rodar a aplicação localmente e os testes do backend, realize o clone do projeto e utilize os comandos a seguir:

```
Para clonar o projeto:
git clone git@github.com:guilherme-ac-fernandes/radarfit-product-api.git

Para rodar a aplicação dockerizada, instalar as dependências e iniciar as aplicações:
<-- na raiz do projeto -->
npm run compose:up // para subir o docker-compose

Para parar a aplicação dockerizada:
<-- na raiz do projeto -->
npm run compose:down // para parar os containers

Para rodar o testes do BackEnd:
<-- na raiz do projeto -->
npm run back:acess
npm test // para rodar o teste simplificado
npm run test:coverage // para avaliar a cobertura dos testes
exit // para sair do container do backend
```

### Demonstração

<p align="center">
  <img src="https://github.com/guilherme-ac-fernandes/radarfit-product-api/blob/main/demo/product_details.png" alt="Products RadarFit Aplication - Demostração"/>
</p>
