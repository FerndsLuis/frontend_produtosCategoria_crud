import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';

import Home from './components/pages/home';
import Categoria from './components/pages/categoria';
import Produto from './components/pages/produto';
import Sobre from './components/pages/sobre';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <main className="App">
            <h1>Consumo Api</h1>
            <BrowserRouter>
                <Nav variant="tabs" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/produto">
                            Produto
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/categoria">
                            Categoria
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/sobre">
                            Sobre
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/produto" element={<Produto />}></Route>
                    <Route path="/categoria" element={<Categoria />}></Route>
                    <Route path="/sobre" element={<Sobre />}></Route>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
