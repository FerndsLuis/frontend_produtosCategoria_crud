import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CadastrarModal(props) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const atualizaNome = (e) => {
        setNome(e.target.value);
    };

    const atualizaDescricao = (e) => {
        setDescricao(e.target.value);
    };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
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
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição"
                            onChange={(e) => atualizaDescricao(e)}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ marginRight: '1rem' }}
                        onClick={() => props.salvar(nome, descricao)}
                    >
                        Salvar
                    </Button>
                    <Button variant="danger" onClick={props.onHide}>
                        Fechar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CadastrarModal;
