import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AtualizarModal(props) {
    const [codigo, setCodigo] = useState(props.dadosCodigo);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [categorias, setCategorias] = useState(['']);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    useEffect(() => {
        if (props.dadosCodigo) {
            setCodigo(props.dadosCodigo);
        }
        if (props.dadosNome) {
            setNome(props.dadosNome);
        }
        if (props.dadosQuantidade) {
            setQuantidade(props.dadosQuantidade);
        }
        if (props.dadosValor) {
            setValor(props.dadosValor);
        }
        if (props.dadosCategorias) {
            setCategorias(props.dadosCategorias);
        }
        if (props.dadosCategoria) {
            setCategoriaSelecionada(props.dadosCategoria);
        }
    }, [
        props.dadosCodigo,
        props.dadosNome,
        props.dadosQuantidade,
        props.dadosValor,
        props.dadosCategorias,
        props.dadosCategoria,
    ]);

    const atualizaNome = (e) => {
        setNome(e.target.value);
    };
    const atualizaQuantidade = (e) => {
        setQuantidade(e.target.value);
    };
    const atualizaValor = (e) => {
        setValor(e.target.value);
    };
    const atualizaCategoria = (e) => {
        setCategoriaSelecionada(e.target.value);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Atualizar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            readOnly={true}
                            value={codigo}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome"
                            onChange={(e) => atualizaNome(e)}
                            value={nome}
                        />
                    </Form.Group>
                    <Form.Group controlId="quantidade">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Select
                            defaultValue={quantidade}
                            value={quantidade}
                            onChange={(e) => atualizaQuantidade(e)}
                        >
                            <option value={quantidade}>{quantidade}</option>
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={15}>15</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Digite o valor"
                            value={valor}
                            onChange={(e) => atualizaValor(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select
                            defaultValue={categoriaSelecionada}
                            onChange={(e) => atualizaCategoria(e)}
                        >
                            <option value={0}>Selecione</option>
                            {categorias.map((categoria) => (
                                <option
                                    key={categoria.codigo}
                                    value={categoria.codigo}
                                >
                                    {categoria.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        style={{ marginRight: '1rem', marginTop: '1rem' }}
                        onClick={() =>
                            props.salvar(
                                codigo,
                                nome,
                                quantidade,
                                valor,
                                categoriaSelecionada
                            )
                        }
                    >
                        Atualizar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={props.onHide}
                        style={{ marginTop: '1rem' }}
                    >
                        Fechar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AtualizarModal;
