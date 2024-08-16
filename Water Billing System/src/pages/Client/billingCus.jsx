import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WarningIcon from "@mui/icons-material/Warning";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TableYourBills from "../../components/Table";

function Lit() {
  return (
    <>
      <div className="d-flex">
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex align-items-center mb-3">
            <label htmlFor="filter" className="me-2">
              Filter:
            </label>
            <TextField
              id="filter"
              variant="outlined"
              size="small"
              placeholder="Type to filter..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Container fluid>
            <TableYourBills />
          </Container>
        </main>
      </div>
    </>
  );
}

export default Lit;
