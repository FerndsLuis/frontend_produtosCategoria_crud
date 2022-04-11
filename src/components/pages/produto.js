import React from 'react';

import { Table, Button } from 'react-bootstrap';

import CadastrarModal from '../shared/modal/produto/cadastrarModal';
import AtualizarModal from '../shared/modal/produto/atualizarModal';
class Produto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            categorias: [],
            codigo: 0,
            nome: '',
            quantidade: 0,
            valor: 0,
            categoria: { codigo: 0 },
            modalShow: false,
            setModalShow: false,
            modalShowAtualizar: false,
        };
    }

    formatCurrency = (currencyString) => {
        let firstHalf = currencyString.substring(0, currencyString.length);
        let secondHalf = currencyString.substring(
            currencyString.length,
            currencyString.length
        );
        return parseFloat(`${firstHalf}.${secondHalf}`).toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
        );
        //https://stackoverflow.com/questions/60438671/currency-formatting-in-react-javascript
    };

    componentDidMount() {
        this.buscarDados();
        this.buscarDadosCategoria();
    }

    buscarDados = () => {
        fetch('http://localhost:8080/api/produtos').then((resposta) =>
            resposta.json().then((dados) => {
                this.setState({ produtos: dados });
            })
        );
    };

    buscarDadosCategoria = () => {
        fetch('http://localhost:8080/api/categoria').then((resposta) =>
            resposta.json().then((dados) => {
                this.setState({ categorias: dados });
            })
        );
    };

    buscarDadosPorCodigo = (codigo) => {
        fetch('http://localhost:8080/api/produto/' + codigo, {
            method: 'GET',
        }).then((resposta) =>
            resposta.json().then((dado) => {
                this.setState({
                    codigo: dado.codigo,
                    nome: dado.nome,
                    quantidade: dado.quantidade,
                    valor: dado.valor,
                    categoria: { codigo: dado.categoria.codigo },
                });
            })
        );
    };

    deletarProduto = (produto) => {
        fetch('http://localhost:8080/api/produto', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto),
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarDados();
            } else {
                alert('Não foi possível excluir.');
            }
        });
    };

    cadastraProduto = (produto) => {
        fetch('http://localhost:8080/api/produto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto),
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarDados();
            } else {
                alert('Erro ao cadastrar');
            }
        });

        alert(JSON.stringify(produto));
    };

    atualizaProduto = (categoria) => {
        fetch('http://localhost:8080/api/produto', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria),
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarDados();
            } else {
                alert('Erro ao atualizar');
            }
        });
    };

    atualizaNome = (e) => {
        this.setState({ nome: e.target.value });
    };
    atualizaQuantidade = (e) => {
        this.setState({ quantidade: e.target.value });
        console.log(this.state.quantidade);
    };
    atualizaValor = (e) => {
        this.setState({ valor: e.target.value });
    };
    atualizaCategoria = (e) => {
        this.setState({ categoria: { codigo: e.target.value } });
    };

    cadastrar = () => {
        const produto = {
            nome: this.state.nome,
            quantidade: this.state.quantidade,
            valor: this.state.valor,
            categoria: { codigo: this.state.categoria.codigo },
        };

        this.cadastraProduto(produto);
    };

    abrirModal = () => {
        this.setState({ modalShow: true });
    };

    abrirModalAtualizar = (codigo) => {
        this.buscarDadosPorCodigo(codigo);

        this.setState({ modalShowAtualizar: true });
    };

    cadastrarDados = (
        nomeProps,
        quantidadeProps,
        valorProps,
        categoriaSelecionadaProps
    ) => {
        const produto = {
            nome: nomeProps,
            quantidade: quantidadeProps,
            valor: valorProps,
            categoria: { codigo: categoriaSelecionadaProps },
        };

        this.cadastraProduto(produto);
        this.limparDados();
    };

    atualizarDados = (
        codigoProps,
        nomeProps,
        quantidadeProps,
        valorProps,
        categoriaSelecionadaProps
    ) => {
        const produto = {
            codigo: codigoProps,
            nome: nomeProps,
            quantidade: quantidadeProps,
            valor: valorProps,
            categoria: { codigo: categoriaSelecionadaProps },
        };

        this.atualizaProduto(produto);
        this.limparDados();
    };

    limparDados = () => {
        this.setState({
            codigo: 0,
            nome: '',
            quantidade: 0,
            valor: 0,
            categoria: { codigo: 0 },
        });
    };

    render() {
        return (
            <div>
                <CadastrarModal
                    show={this.state.modalShow}
                    dadosCategorias={this.state.categorias}
                    salvar={this.cadastrarDados}
                    onHide={() => this.setState({ modalShow: false })}
                />

                <AtualizarModal
                    show={this.state.modalShowAtualizar}
                    onHide={() => this.setState({ modalShowAtualizar: false })}
                    salvar={this.atualizarDados}
                    dadosCodigo={this.state.codigo}
                    dadosNome={this.state.nome}
                    dadosQuantidade={this.state.quantidade}
                    dadosValor={this.state.valor}
                    dadosCategoria={this.state.categoria.codigo}
                    dadosCategorias={this.state.categorias}
                />

                <Button
                    variant="primary"
                    onClick={this.abrirModal}
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                >
                    Cadastrar Produto
                </Button>

                <hr />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.produtos &&
                        this.state.produtos.length > 0 ? (
                            this.state.produtos.map((produto) => (
                                <tr key={produto.codigo}>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>
                                        {this.formatCurrency(
                                            produto.valor.toString()
                                        )}
                                    </td>
                                    <td>{produto.categoria.nome}</td>
                                    <td>
                                        <Button
                                            style={{ marginRight: '1rem' }}
                                            variant="primary"
                                            onClick={() =>
                                                this.abrirModalAtualizar(
                                                    produto.codigo
                                                )
                                            }
                                        >
                                            Atualizar
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                this.deletarProduto(produto)
                                            }
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={6}>
                                    carregando...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Produto;
