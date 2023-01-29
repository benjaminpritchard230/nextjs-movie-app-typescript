import Link from "next/link";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
type Props = {};

const NavBar = (props: Props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Next Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Movies" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/movies/popular/">
                Popular
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} href="/movies/now-playing/">
                Now Playing
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} href="/movies/top-rated/">
                Top Rated
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} href="/movies/upcoming/">
                Upcoming
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TV Shows" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/tv-shows/popular/">
                Popular
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/movies/airing-today/">
                Airing Today
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/movies/top-rated/">
                Top Rated
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/movies/on-tv/">
                On TV
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="People" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/people/popular/">
                Popular
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
