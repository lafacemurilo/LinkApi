const BlingOpportunity = require("../models/BlingOpportunity");
const services_bling = require("../services/bling");

const sb = new services_bling();

class BlingOpportunityController {
  create_order = async (req, res) => {
    console.log("chegou aqui na regra de negócio");
    console.log("previous ", req.body.previous.status);
    console.log("previous ", req.body.current.status);
    console.log(req.body);

    if (req.body.previous.status === "open" && req.body.current.status === "won") {
      var order = {
        client_name: "",
        document_client: "",
        cod_product: "",
        description_product: "",
        value_product: "",
      };

      //cadastro um cliente no bling
      const response_client = await sb.create_client(req.body.current.person_name);
      order.client_name = response_client?.retorno?.contatos.contato.nome ?? "";
      order.document_client = response_client?.retorno?.contatos.contato.cpf_cnpj ?? "";

      //cadastro um produto no bling
      const response_product = await sb.create_product(req.body.current.value);
      order.cod_product = response_product?.retorno?.produtos[0].produto.id ?? "";
      order.description_product = response_product?.retorno?.produtos[0].produto.descricao ?? "";
      order.value_product = response_product?.retorno?.produtos[0].produto.preco ?? "";

      //crio um pedido
      if (order.cod_product === '' || order.client_name === '' || order.document_client === '' || order.value_product === '' || order.description_product === ''){
        return res.status(500).send({error : "miss params"});
      }
      const response_order = await sb.create_order_sale(order);
      console.log("criação do pedido ", response_order);

      return res.status(200).send("deu certo");

      //-----------------------------------------------------//

      //pesquisar no mongo se existe algum registro referente Date
      //se houver somo os valores e atualizo o registro
      //se não houver, apenas seto na base

      //-------------------------------------------------//
    }

    return res.status(200).send("not found");

    /* try {
           const blingopportunity = await BlingOpportunity.create(req.body);
       
           return {blingopportunity};
         } catch (err) {
           return { error: "Async insert opportunity failed" };
         }*/
  };
}

module.exports = BlingOpportunityController;
