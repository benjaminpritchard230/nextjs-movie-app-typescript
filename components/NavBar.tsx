import { useSearchText } from "@/context/SearchTextContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

type Props = {};

const NavBar = (props: Props) => {
  const { searchText, newSearch } = useSearchText();

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/movies?searchText=${searchText}`);
  };

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
              <NavDropdown.Item as={Link} href="/tv-shows/airing-today/">
                Airing Today
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/tv-shows/top-rated/">
                Top Rated
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/tv-shows/on-tv/">
                On TV
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="People" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/people/popular/">
                Popular
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e) => {
                newSearch(e.target.value);
              }}
            />
            <Button onClick={handleSearch} variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
