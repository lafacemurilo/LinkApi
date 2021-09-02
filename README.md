# LinkApi
Pipedrive business integration with the bling platform

## Primeiros passos

1. Você precisará de Node.js v14.16.0 instalado.
2. Instale as dependências com `npm ci`.
3. Execute o projeto localmente com `npm start`.
4. Execute o suite de testes do projeto com `npm test`.
5. Bater no endpoint `xxx` para ver a documentação do projeto.


## Sobre o funcionamento do projeto

1. Após o comando `npm start` o script config/ngrok.js irá gerar um tunel para expor o localhost:3000.
2. O script acima irá configurar o webhook da pipedrive usando o host gerado pelo ngrok.
3. Configuração do webhook | metodo : update, objeto: deal, endpoint : async/opportunity.

## EndPoints.

1. async/opportunity : 
    Metodo : POST
    Body : json
    Usado apenas pelo webhook, mas caso necessário bater direto usar o mesmo payload retornado pela webhook da pipedrive

2. async/opportunity/total : 
    Metodo : GET
    Body : json {data : "yyyy-mm-dd"}
    