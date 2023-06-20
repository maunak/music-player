import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <NAV>
      <h1>Music Player</h1>
      <Button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library <FontAwesomeIcon icon={faMusic} />
      </Button>
    </NAV>
  );
};

const NAV = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  border: 2px solid #52796f;
  padding: 0.5rem;
  transition: all 0.5s ease;

  :hover {
    background: #52796f;
    color: white;
  }

  @media screen and (max-width: 768px) {
    z-index: 10;
  }
`;
export default Nav;
