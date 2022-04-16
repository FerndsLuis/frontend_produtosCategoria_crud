import React from 'react';
import { Chart } from 'react-google-charts';

import _ from 'lodash';

export const options = {
    title: 'Relação: Produtos por Categoria',
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            chartData: [],
        };
    }

    buscarDados = async () => {
        const resp = await fetch('http://localhost:8080/api/produtos');
        const json = await resp.json();
        this.setState({ produtos: json });

        this.setState({ chartData: this.agruparDados(json) });
    };

    agruparDados = (dados) => {
        const values = _.groupBy(dados, (value) => {
            return value.categoria.nome;
        });

        const result = _.map(values, (value, key) => {
            return [key, value.length];
        });

        console.log(result);

        return [['Categoria', 'Quantidade'], ...result];
    };

    componentDidMount() {
        this.buscarDados();
    }

    componentDidUpdate() {
        console.log('Component did update', this.state.buttonPressed);
    }

    render() {
        return (
            <div>
                <Chart
                    chartType="PieChart"
                    data={this.state.chartData}
                    options={options}
                    width="100%"
                    height="400px"
                />
            </div>
        );
    }
}
export default Home;
