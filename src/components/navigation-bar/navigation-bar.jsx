import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { SearchView } from "../search-view/search-view";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

export const NavigationBar = ({ user, movies, onLoggedOut, onSearch }) => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <SearchView 
          movies={movies}
          onSearch={onSearch}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};