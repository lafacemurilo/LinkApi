const axios = require("axios");
const { generate } = require("gerador-validador-cpf");
const utf8 = require("utf8");
require("dotenv/config");

class Bling {
  create_client = async (client_name) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><contato><nome>${client_name}</nome><fantasia>CT</fantasia><tipoPessoa>F</tipoPessoa><contribuinte>9</contribuinte><cpf_cnpj>${generate(
      { format: true }
    )}</cpf_cnpj><ie_rg>24.100.112-2</ie_rg><endereco>Rua Visconde de São Gabriel</endereco><numero>123</numero><complemento>Sala 123</complemento><bairro>Centro</bairro><cep>95.700-000</cep><cidade>Bento Gonçalves</cidade><uf>RS</uf><fone>(99) 9999-9999</fone><celular>(99) 99999-9999</celular><email>teste@mail.com.br</email><emailNfe>testeNfe@mail.com.br</emailNfe><informacaoContato>Informações adicionais do contato</informacaoContato><limiteCredito>9999.99</limiteCredito><tipos_contatos><tipo_contato><descricao>Transportador</descricao></tipo_contato><tipo_contato><descricao>Fornecedor</descricao></tipo_contato></tipos_contatos></contato>`;

    return new Promise((resolve, reject) => {
      var config = {
        method: "post",
        url: `https://bling.com.br/Api/v2/contato/json/?apikey=${
          process.env.TOKEN_BLING
        }&xml=${utf8.encode(xml)}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  create_product = async (value_product) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <produto>
       <descricao>Caneta 001</descricao>
       <situacao>Ativo</situacao>
      <descricaoCurta>Descrição curta da caneta</descricaoCurta>
       <descricaoComplementar>Descrição complementar da caneta</descricaoComplementar>
       <un>Pc</un>
       <vlr_unit>${value_product}</vlr_unit>
       <preco_custo>1.23</preco_custo>
       <peso_bruto>0.2</peso_bruto>
       <peso_liq>0.18</peso_liq>
       <class_fiscal>1000.01.01</class_fiscal>
       <marca>Marca da Caneta</marca>
       <origem>0</origem>
       <gtin>223435780</gtin>
       <gtinEmbalagem>54546</gtinEmbalagem>
       <largura>11</largura>
       <altura>21</altura>
       <profundidade>31</profundidade>
       <estoqueMinimo>1.00</estoqueMinimo>
       <estoqueMaximo>100.00</estoqueMaximo>
       <cest>28.040.00</cest>
       <idGrupoProduto>12345</idGrupoProduto>
       <condicao>Novo</condicao>
       <freteGratis>N</freteGratis>
       <linkExterno>https: //minhaloja.com.br/meu-produto</linkExterno>
       <observacoes>Observações do meu produtos</observacoes>
       <producao>P</producao>
       <dataValidade>20/11/2019</dataValidade>
       <descricaoFornecedor>Descrição do fornecedor</descricaoFornecedor>
       <idFabricante>0</idFabricante>
       <codigoFabricante>123</codigoFabricante>
       <unidadeMedida>Centímetros</unidadeMedida>
       <garantia>4</garantia>
       <itensPorCaixa>2</itensPorCaixa>
       <volumes>2</volumes>
       <urlVideo>https: //www.youtube.com/watch?v=zKKL-SgC5lY</urlVideo>
       <imagens>
          <url>https: //bling.com.br/bling.jpg</url>
       </imagens>
    </produto>`;
    return new Promise((resolve, reject) => {
      var config = {
        method: "post",
        url: `https://bling.com.br/Api/v2/produto/json/?apikey=${
          process.env.TOKEN_BLING
        }&xml=${utf8.encode(xml)}`,
        headers: {
          //"Content-Type": "application/xml",
        },
        //data: xml,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  create_order_sale = async (order) => {
    console.log('order no create order', order);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <pedido>
        <cliente>
                <nome>${order.client_name}</nome>
                <tipoPessoa>F</tipoPessoa>
                <cpf_cnpj>${order.document_client}</cpf_cnpj>
        </cliente>
        <itens>
            <item>
                <codigo>${order.cod_product}</codigo>
                <descricao>${order.description_product}</descricao>
                <un>Pc</un>
                <qtde>1</qtde>
                <vlr_unit>${order.value_product}</vlr_unit>
            </item>
        </itens>
        <vlr_frete></vlr_frete>
        <vlr_desconto></vlr_desconto>
        <obs>Testando o campo observações do pedido</obs>
        <obs_internas>Testando o campo observações internas do pedido</obs_internas>
    </pedido>`;
    
    return new Promise((resolve, reject)=>{
    var config = {
      method: "post",
      url: `https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.TOKEN_BLING}&xml=${utf8.encode(xml)}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });

    })
  };
}

module.exports = Bling;
