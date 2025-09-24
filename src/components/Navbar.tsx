import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from 'react-bootstrap';

export const NavBar = (): React.JSX.Element => {
    return (
        <>
        <Navbar expand='lg' >
            <Container>
                <NavbarBrand href='/'>Voltar pra Home</NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav'/>
                <NavbarCollapse id='basic-navbar-nav' className=''>
                    <NavLink href='/favoritos'>Favoritos</NavLink>
                </NavbarCollapse>
            </Container>
        </Navbar>
        </>
    );
};

export default NavBar;