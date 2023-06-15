import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery } from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { getFullInfoById, searchByQuery } from "../services/books-api";
import { Button, Skeleton, styled } from "@mui/material";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { BooksDetails } from "../components/BookDetails/BooksDetails";

export const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const currentDetails = searchParams.get("details");
  const [currentId, setCurrentId] = useState("");
  const [query, setQuery] = useState("");
  const {
    data: tableBooks,
    isLoading,
    refetch: getSearchedBooks,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => searchByQuery(searchQuery),
    enabled: false,
  });

  const { data: detailedData, refetch: refetchBookData } = useQuery({
    queryKey: ["bookInfo", currentDetails],
    queryFn: () => getFullInfoById(currentDetails),
    enabled: false,
    keepPreviousData: true,
  });
  useEffect(() => {
    console.dir(searchQuery);
    searchQuery && getSearchedBooks();
  }, [searchQuery, getSearchedBooks]);
  useEffect(() => {
    currentId && refetchBookData();
  }, [currentId, refetchBookData]);

  const navigate = useNavigate();
  const handleRowClick = (id) => {
    if (currentId === id) {
      setCurrentId("");
      return;
      // navigate('/books')
    }
    setCurrentId(id);

    setSearchParams({ q: searchQuery, details: id });
    console.dir(typeof currentDetails);
  };

  return (
    <>
      <ReactQueryDevtools />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchParams({ q: query });
          }}
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            placeholder="Type book title that you wanna to search..."
          />
          <button disabled={query ? false : true}>Search</button>
        </form>
        {tableBooks && searchQuery && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    {isLoading ? <Skeleton variant="text" /> : "Title"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isLoading ? <Skeleton variant="text" /> : "Author"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isLoading ? <Skeleton variant="text" /> : "ID"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isLoading ? <Skeleton variant="text" /> : "Link"}
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {tableBooks.items.map((item) => {
                  const {
                    id,
                    volumeInfo: { authors, title, infoLink },
                  } = item;
                  return (
                    <React.Fragment key={id}>
                      <StyledTableRow
                        onClick={() => {
                          handleRowClick(id);
                        }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {authors?.join(", ")}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <a href={infoLink}>{infoLink}</a>
                        </StyledTableCell>
                      </StyledTableRow>
                      {item.id === currentDetails && <BooksDetails />}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div>BooksPage</div>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
