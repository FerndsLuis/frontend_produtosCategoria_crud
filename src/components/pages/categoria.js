import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import CadastrarModal from '../shared/modal/cadastrarModal';

class Categoria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            codigo: 0,
            nome: '',
            descricao: '',
            modalShow: false,
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

    atualizaNome = (e) => {
        this.setState({
            nome: e.target.value,
        });
    };
    atualizaDescricao = (e) => {
        this.setState({
            descricao: e.target.value,
        });
    };

    submitCategoria = () => {
        if (this.state.codigo === 0) {
            const categoria = {
                nome: this.state.nome,
                descricao: this.state.descricao,
            };

            this.cadastraCategoria(categoria);
        } else {
            const categoria = {
                codigo: this.state.codigo,
                nome: this.state.nome,
                descricao: this.state.descricao,
            };
            this.atualizaCategoria(categoria);
        }
        this.limparDados();
    };

    limparDados = () => {
        this.setState({ codigo: 0, nome: '', descricao: '' });
    };

    abrirModal = () => {
        this.setState({ modalShow: true });
    };

    render() {
        return (
            <div>
                <h3>Cadastrar</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome"
                            onChange={this.atualizaNome}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição"
                            onChange={this.atualizaDescricao}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.submitCategoria}
                    >
                        Salvar
                    </Button>
                </Form>

                <hr />

                <Button variant="primary" onClick={this.abrirModal}>
                    Launch vertically centered modal
                </Button>

                <CadastrarModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />

                <hr />

                <h3>Atualizar</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.codigo}
                            readOnly={true}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome"
                            value={this.state.nome}
                            onChange={this.atualizaNome}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição"
                            value={this.state.descricao}
                            onChange={this.atualizaDescricao}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.submitCategoria}
                    >
                        Atualizar
                    </Button>
                </Form>

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
                                                this.buscarDadosPorCodigo(
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

export default Categoria;
