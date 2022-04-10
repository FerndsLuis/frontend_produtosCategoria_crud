import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AtualizarModal(props) {
    const [codigo, setCodigo] = useState(props.dadosCodigo);
    const [nome, setNome] = useState(props.dadosNome);
    const [descricao, setDescricao] = useState(props.dadosDescricao);

    useEffect(() => {
        if (props.dadosCodigo) {
            setCodigo(props.dadosCodigo);
        }
        if (props.dadosNome) {
            setNome(props.dadosNome);
        }
        if (props.dadosDescricao) {
            setDescricao(props.dadosDescricao);
        }
    }, [props.dadosCodigo, props.dadosNome, props.dadosDescricao]);

    const atualizaNome = (e) => {
        setNome(e.target.value);
    };

    const atualizaDescricao = (e) => {
        setDescricao(e.target.value);
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
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição"
                            onChange={(e) => atualizaDescricao(e)}
                            value={descricao}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ marginRight: '1rem' }}
                        onClick={() => props.salvar(codigo, nome, descricao)}
                    >
                        Atualizar
                    </Button>
                    <Button variant="danger" onClick={props.onHide}>
                        Fechar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AtualizarModal;
