import React, {useContext} from 'react'
import AuthOptions from "../../auth/AuthOptions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserContext from "../../../context/UserContext";

export default function Header() {
    const { userData } = useContext(UserContext);
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {userData.user ? (
                <Navbar.Brand href="/">Liquidations Plus</Navbar.Brand>
            ):(
                <Navbar.Brand href="/login">Liquidations Plus</Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                </Nav>
                <Nav>
                    <AuthOptions></AuthOptions>
                   
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
