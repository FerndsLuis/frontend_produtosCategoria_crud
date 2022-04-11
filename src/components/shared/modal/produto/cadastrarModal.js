import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CadastrarModal(props) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [categorias, setCategorias] = useState(['']);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(['']);

    useEffect(() => {
        const id = setInterval(() => {
            setCategorias(props.dadosCategorias);
        }, 1000);
        return () => clearInterval(id);
    }, [props.dadosCategorias]);

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
                    Cadastrar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome"
                            onChange={(e) => atualizaNome(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="quantidade">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Select
                            defaultValue="Selecione"
                            onChange={atualizaQuantidade}
                        >
                            <option value={0}>Selecione</option>
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
                            onChange={(e) => atualizaValor(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select
                            defaultValue="Selecione"
                            onChange={atualizaCategoria}
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
                                nome,
                                quantidade,
                                valor,
                                categoriaSelecionada
                            )
                        }
                    >
                        Salvar
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

export default CadastrarModal;
