import Logo from "../../assets/logo.png";
import ExternalLink from '../Linker/externalLink';
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import { FaLinkedin, FaGithub } from 'react-icons/fa'

import './header.scss';

const Header = () => {
    return (
        <Container fluid>
            <Row className="header-content">
                <Col>
                    <Row className="logo-section">
                        <Col><img src={Logo} alt="" className="logo" /></Col>
                        <div className="header-text">
                            <h2>Usuários</h2>
                        </div>
                    </Row>
                </Col>
                <Col>
                    <Row className="profile-section">
                        <Col>
                            <Row className="username">THIAGO MOURA:</Row>
                        </Col>
                        <ExternalLink
                            url="https://www.linkedin.com/in/thiago-m-2a263310a/"
                            title="LinkedIn"
                            window={true}
                        >
                            <Col className="social-icon"><FaLinkedin /></Col>
                        </ExternalLink>
                        <ExternalLink
                            url="https://github.com/ThiagoAug"
                            title="GitHub"
                            window={true}
                        >
                            <Col className="social-icon"><FaGithub /></Col>
                        </ExternalLink>
                    </Row>
                </Col>
            </Row>
        </Container>

    );
};

export default Header;