const BlingOpportunity = require("../models/BlingOpportunity");
const services_bling = require("../services/bling");
const { format } = require("date-fns");

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
      await this.create_client(req.body.current.person_name, order);

      //cadastro um produto no bling
      await this.create_product(req.body.current.value, order);

      //valido se vou criar o pedido
      if (order.cod_product === "" ||order.client_name === "" ||order.document_client === "" ||order.value_product === "" ||order.description_product === "") {
        return res.status(200).send({ error: "miss params" });
      }

      //crio o pedido
      const response_order = await sb.create_order_sale(order);
      console.log("criação do pedido ",response_order.status);

      //salvar no mongo
      const response_mongo = await this.save_mongo(order);
      return res.status(200).json(response_mongo);
    }

    return res.status(200).send("not found");
  };

  async create_client(person_name, order) {
    //cadastro um cliente no bling
    const response_client = await sb.create_client(person_name);
    order.client_name = response_client?.retorno?.contatos.contato.nome ?? "";
    order.document_client =
      response_client?.retorno?.contatos.contato.cpf_cnpj ?? "";
  }

  async create_product(current_value, order) {
    const response_product = await sb.create_product(current_value);
    order.cod_product = response_product?.retorno?.produtos[0].produto.id ?? "";
    order.description_product =
      response_product?.retorno?.produtos[0].produto.descricao ?? "";
    order.value_product =
      response_product?.retorno?.produtos[0].produto.preco ?? "";
  }

  async save_mongo(order) {
    const date = format(
      new Date(Date.now()),
      "yyyy-MM-dd'T'00:00:00.000+00:00"
    );
    const result = await BlingOpportunity.findOne({ date: date });
    var total_order = Number(order.value_product);
    if (result) total_order = Number(result.total + total_order);

    try {
      const result_amount = await BlingOpportunity.findOneAndUpdate(
        { date: date },
        { total: total_order },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      );
      console.log(result_amount);
      return ({ response: "success" });
    } catch {
      return ({ error: "error mongodb" });
    }
  }
}

module.exports = BlingOpportunityController;
