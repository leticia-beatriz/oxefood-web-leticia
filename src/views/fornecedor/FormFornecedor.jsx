import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormCliente() {
     function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }
  const { state } = useLocation();
  const [idFuncionario, setIdFuncionario] = useState();

  const [nome, setNome] = useState();
  const [endereco, setEndereco] = useState();
  const [dataFundacao, setDataFundacao] = useState();
  const [valorMercado, setValorMercado] = useState();
  const [paginaWeb, setPaginaWeb] = useState();
  const [contatoVendedor, setContatoVendedor] = useState();
    

  function salvar() {
    let FornecedorRequest = {
      nome: nome,
      endereco: endereco,
      dataFundacao: dataFundacao,
      valorMercado: valorMercado,
      paginaWeb: paginaWeb,
      contatoVendedor:contatoVendedor
    };

    if (idFornecedor != null) {
      //Alteração:
      axios
        .put("http://localhost:8082/api/fornecedor/" + idFornecedor, FornecedorRequest)
        .then((response) => {
          console.log("Fornecedor alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter o Fornecedor.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8082/api/fornecedor", FornecedorRequest)
        .then((response) => {
          console.log("Fornecedor cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o Fornecedor.");
        });
    }
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8082/api/fornecedor/" + state.id)
        .then((response) => {
          setIdFuncionario(response.data.id);
          setNome(response.data.nome);
          setEndereco(response.data.endereco);
          setDataFundacao(formatarData(response.data.dataFundacao));
          setValorMercado(response.data.valorMercado);
          setPaginaWeb(response.data.paginaWeb);
          setContatoVendedor(response.data.contatoVendedor);

        });
    }
  }, [state]);

  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idFornecedor === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                fornecedor &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idFornecedor != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                fornecedor &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Endereço"
                  width={13}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                ></Form.Input>
                 <Form.Input
                  fluid
                  label="Valor de mercado"
                  width={4}
                  value={valorMercado}
                  onChange={(e) => setValorMercado(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input required
                  fluid
                  label="pagina Web"
                  maxLength="100"
                  value={paginaWeb}
                  onChange={(e) => setPaginaWeb(e.target.value)}
                  />
                <Form.Input fluid label="contato vendedor" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={contatoVendedor}
                    onChange={(e) => setContatoVendedor(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Data Fundação" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataFundacao}
                    onChange={(e) => setDataFundacao(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                <Link to={"/list-cliente"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
