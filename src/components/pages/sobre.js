import React from 'react';

import { Table } from 'react-bootstrap';
class Sobre extends React.Component {
    render() {
        return (
            <div>
                <h3 className="mt-3">Sobre</h3>

                <p>
                    Projeto desenvolvido para consumo de API em{' '}
                    <a href="https://github.com/FerndsLuis/backend_produtosCategoria_crud">
                        JAVA com SrringBoot
                    </a>
                </p>

                <p>Tabela Categoria possui os campos</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>codigo</th>
                            <th>descricao</th>
                            <th>nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Integer</td>
                            <td>String</td>
                            <td>String</td>
                        </tr>
                    </tbody>
                </Table>

                <p>Tabela Produto possui os campos</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>codigo</th>
                            <th>nome</th>
                            <th>quantidade</th>
                            <th>valor</th>
                            <th>categoria:codigo:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Integer</td>
                            <td>String</td>
                            <td>Integer</td>
                            <td>Float</td>
                            <td>Integer</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Sobre;
