import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  FormGroup,
  Icon,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEntregador() {
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [rg, setRg] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  //const [ativo, setAtivo]= useState();

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      rg: rg,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      //ativo: ativo
    };

    if (idEntregador != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8082/api/entregador/" + idEntregador,
          entregadorRequest
        )
        .then((response) => {
          console.log("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um Entregador.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8082/api/entregador", entregadorRequest)
        .then((response) => {
          console.log("Entregador cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o Entregador.");
        });
    }
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8082/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id);
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setDataNascimento(response.data.dataNascimento);
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setRg(response.data.rg);
          setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
          setValorFrete(response.data.valorFrete);
          setEnderecoRua(response.data.enderecoRua);
          setEnderecoNumero(response.data.enderecoNumero);
          setEnderecoBairro(response.data.enderecoBairro);
          setEnderecoCidade(response.data.enderecoCidade);
          setEnderecoCep(response.data.enderecoCep);
          setEnderecoUf(response.data.enderecoUf);
          setEnderecoComplemento(response.data.enderecoComplemento);
        });
    }
  }, [state]);
  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEntregador === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEntregador != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
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

                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid label="RG">
                  <InputMask
                    required
                    mask="9.999.999"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Data Nascimento" width={4}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required label="Fone Celular" width={4}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={4}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  maxLength="100 "
                  width={4}
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Valor por frete"
                  width={4}
                  value={valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group></Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={13}
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Número"
                  maxLength="100 "
                  width={4}
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <FormGroup>
                <Form.Input
                  fluid
                  label="Bairro"
                  maxLength="100 "
                  width={10}
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Cidade"
                  maxLength="100 "
                  width={6}
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="CEP"
                  maxLength="8 "
                  width={4}
                  value={enderecoCep}
                  onChange={(e) => setEnderecoCep(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="UF"
                  maxLength="2"
                  width={4}
                  value={enderecoUf}
                  onChange={(e) => setEnderecoUf(e.target.value)}
                ></Form.Input>
              </FormGroup>
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
                <Link to={"/"}>Voltar</Link>
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
