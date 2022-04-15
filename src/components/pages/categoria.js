import React from 'react';
import { Table, Button } from 'react-bootstrap';
import CadastrarModal from '../shared/modal/categoria/cadastrarModal';
import AtualizarModal from '../shared/modal/categoria/atualizarModal';

class Categoria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            codigo: 0,
            nome: '',
            descricao: '',
            modalShow: false,
            modalShowAtualizar: false,
            setModalShow: false,
        };
    }

    componentDidMount() {
        this.buscarDados();
    }

    buscarDados = () => {
        fetch('http://localhost:8080/api/categoria').then((resposta) =>
            resposta.json().then((dados) => {
                this.setState({ categorias: dados });
            })
        );
    };

    buscarDadosPorCodigo = (codigo) => {
        fetch('http://localhost:8080/api/categoria/' + codigo, {
            method: 'GET',
        }).then((resposta) =>
            resposta.json().then((dado) => {
                this.setState({
                    codigo: dado.codigo,
                    nome: dado.nome,
                    descricao: dado.descricao,
                });
            })
        );
    };

    deletarCategoria = (categoria) => {
        fetch('http://localhost:8080/api/categoria', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria),
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarDados();
            } else {
                alert('Não foi possível excluir.');
            }
        });
    };

    cadastraCategoria = (categoria) => {
        fetch('http://localhost:8080/api/categoria', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(categoria),
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarDados();
            } else {
                alert('Erro ao cadastrar');
            }
        });
    };

    atualizaCategoria = (categoria) => {
        fetch('http://localhost:8080/api/categoria', {
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

    limparDados = () => {
        this.setState({ codigo: 0, nome: '', descricao: '' });
    };

    abrirModal = () => {
        this.setState({ modalShow: true });
    };

    abrirModalAtualizar = (codigo) => {
        this.buscarDadosPorCodigo(codigo);

        this.setState({ modalShowAtualizar: true });
    };

    cadastrarDados = (nomeProps, descricaoProps) => {
        const categoria = {
            nome: nomeProps,
            descricao: descricaoProps,
        };

        this.cadastraCategoria(categoria);
        this.limparDados();
    };

    atualizarDados = (codigoProps, nomeProps, descricaoProps) => {
        const categoria = {
            codigo: codigoProps,
            nome: nomeProps,
            descricao: descricaoProps,
        };

        this.atualizaCategoria(categoria);
        this.limparDados();
    };

    render() {
        return (
            <div>
                <Button
                    variant="primary"
                    onClick={this.abrirModal}
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                >
                    Cadastrar Categoria
                </Button>

                <CadastrarModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    salvar={this.cadastrarDados}
                />

                <AtualizarModal
                    show={this.state.modalShowAtualizar}
                    onHide={() => this.setState({ modalShowAtualizar: false })}
                    salvar={this.atualizarDados}
                    dadosCodigo={this.state.codigo}
                    dadosNome={this.state.nome}
                    dadosDescricao={this.state.descricao}
                />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descriçao</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categorias &&
                        this.state.categorias.length > 0 ? (
                            this.state.categorias.map((categoria) => (
                                <tr key={categoria.codigo}>
                                    <td>{categoria.codigo}</td>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    <td>
                                        <Button
                                            style={{ marginRight: '1rem' }}
                                            variant="primary"
                                            onClick={() =>
                                                this.abrirModalAtualizar(
                                                    categoria.codigo
                                                )
                                            }
                                        >
                                            Atualizar
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                this.deletarCategoria(categoria)
                                            }
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={4}>
                                    {this.state.categorias.length === 0
                                        ? 'Nenhuma categoria cadastrada'
                                        : 'carregando...'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Categoria;
