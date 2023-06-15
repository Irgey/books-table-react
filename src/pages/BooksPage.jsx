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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { Button, Skeleton, styled } from "@mui/material";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

export const BooksPage = () => {
  const [currentId, setCurrentId] = useState("");

  const [query, setQuery] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const {
    data: tableBooks,
    isLoading,
    refetch: getSearchedBooks,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => searchByQuery(query),
    enabled: false,
  });

  const { data: detailedData, refetch: refetchBookData } = useQuery({
    queryKey: ["bookInfo", currentId],
    queryFn: () => getFullInfoById(currentId),
    enabled: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    currentId && refetchBookData();
  }, [currentId, refetchBookData]);

  const handleRowClick = (id) => {
    setCurrentId(id);
  };
  const navigate = useNavigate();
  const onRowClick = (rowId) => {
    navigate(`${rowId}`);
  };
  return (
    <>
      {/* <ReactQueryDevtools />
      <div>
        <form
          data-aos="fade-up"
          onSubmit={(e) => {
            e.preventDefault();
            getSearchedBooks();
          }}
        >
          {" "}
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            placeholder="Type book title that you wanna to search..."
          />
          <button>Search</button>
        </form>
        <>
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
                      {currentId === item.id && (
                        <StyledTableRow>
                          <StyledTableCell colSpan={4}>
                            <div data-aos="fade-up">
                              {detailedData && (
                                <>
                                  <h2>
                                    <span>{detailedData.volumeInfo.title}</span>
                                    {detailedData.volumeInfo.subtitle && (
                                      <span>
                                        ,{detailedData.volumeInfo.subtitle}
                                      </span>
                                    )}
                                  </h2>
                                  <div className={s.contentWrapper}>
                                    <div>
                                      {" "}
                                      <img
                                        src={
                                          detailedData.volumeInfo.imageLinks
                                            .thumbnail
                                        }
                                      />
                                    </div>
                                    <ul className={s.contentList}>
                                      {detailedData.volumeInfo.authors && (
                                        <li>
                                          <p>
                                            <b>Author: </b>
                                            {detailedData.volumeInfo.authors.join(
                                              ", "
                                            )}
                                          </p>
                                        </li>
                                      )}
                                      {detailedData.volumeInfo.publisher && (
                                        <li>
                                          <p>
                                            <b>Publisher: </b>
                                            {detailedData.volumeInfo.publisher},
                                            {
                                              detailedData.volumeInfo
                                                .publishedDate
                                            }
                                          </p>
                                        </li>
                                      )}
                                      {detailedData.volumeInfo.printType && (
                                        <li>
                                          <p>
                                            <b>Print type: </b>
                                            {detailedData.volumeInfo.printType}
                                          </p>
                                        </li>
                                      )}
                                      {detailedData.volumeInfo.pageCount && (
                                        <li>
                                          <p>
                                            <b>Page count: </b>
                                            {detailedData.volumeInfo.pageCount}
                                          </p>
                                        </li>
                                      )}
                                      {detailedData.volumeInfo.description && (
                                        <li>
                                          {" "}
                                          <b>Description: </b>
                                          <ReactMarkdown
                                            className={s.descrContainer}
                                            rehypePlugins={[rehypeRaw]}
                                          >
                                            {
                                              detailedData.volumeInfo
                                                .description
                                            }
                                          </ReactMarkdown>{" "}
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </div> */}

      <div>BooksPage</div>
      {[0, 1, 2, 3, 4].map((item) => (
        <Button
          key={item}
          onClick={() => {
            onRowClick(item);
          }}
        >
          {item}
        </Button>
      ))}
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
