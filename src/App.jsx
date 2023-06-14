import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
function App() {
  const [isClicked, setIsClicked] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["myquery"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=flowers&langRestrict=en&key=AIzaSyC39PA06hIM4P6RXk4tFDzFihjHVUO8cNw"
      );
      return data;
    },
  });
  const handleCellClick = (id) => {
    setIsClicked(id);
    console.log(`Click on row with id=${id}`);
  };
  console.log(data);
  return (
    <>
      <div>
        {isLoading ? (
          <h1>Data is loading</h1>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.items.map((item) => (
                  <>
                    {" "}
                    <TableRow
                      onClick={() => {
                        handleCellClick(item.id);
                      }}
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.volumeInfo.title}
                      </TableCell>
                      <TableCell align="right">
                        {item.volumeInfo.authors?.join(", ")}
                      </TableCell>
                      <TableCell align="right">{item.id}</TableCell>
                      <TableCell align="right">
                        <a href={item.volumeInfo.infoLink}>
                          {" "}
                          {item.volumeInfo.infoLink}
                        </a>
                      </TableCell>
                    </TableRow>
                    {isClicked === item.id && <div>FULL info</div>}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default App;
