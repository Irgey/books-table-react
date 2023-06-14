// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import "./App.css";
// import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import React, { useEffect, useState } from "react";
// import s from "./styles.module.css";
// import { getFullInfoById, searchByQuery } from "./services/books-api";
// function App() {
//   const [currentId, setCurrentId] = useState("");

//   const [query, setQuery] = useState("");

//   const {
//     data: tableBooks,
//     isLoading,
//     isSuccess,
//     refetch: getSearchedBooks,
//     isFetched,
//   } = useQuery({
//     queryKey: ["books"],
//     queryFn: () => searchByQuery(query),
//     enabled: false,
//   });

//   const {
//     data: detailedData,
//     isLoading: isdetailedDataLoading,
//     refetch: refetchBookData,
//   } = useQuery({
//     queryKey: ["bookInfo", currentId],
//     queryFn: () => getFullInfoById(currentId),
//     enabled: false,
//   });
//   useEffect(() => {
//     currentId && refetchBookData();
//   }, [currentId, refetchBookData]);

//   const handleRowClick = (id) => {
//     setCurrentId(id);
//   };
//   console.log(detailedData);
//   return (
//     <>
//       <ReactQueryDevtools />
//       <div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             getSearchedBooks();
//           }}
//         >
//           {" "}
//           <input
//             value={query}
//             onChange={(e) => {
//               setQuery(e.target.value);
//             }}
//             type="text"
//             placeholder="Type book title that you wanna to search..."
//           />
//           <button>Search</button>
//         </form>
//         {isFetched && (
//           <>
//             {" "}
//             {isLoading && <h1>Data is loading</h1>}
//             {isSuccess && (
//               <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Title</TableCell>
//                       <TableCell align="right">Author</TableCell>
//                       <TableCell align="right">ID</TableCell>
//                       <TableCell align="right">Link</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {tableBooks.items.map((item) => {
//                       const {
//                         id,
//                         volumeInfo: { authors, title, infoLink },
//                       } = item;
//                       return (
//                         <React.Fragment key={id}>
//                           <TableRow
//                             onClick={() => {
//                               handleRowClick(id);
//                             }}
//                             sx={{
//                               "&:last-child td, &:last-child th": { border: 0 },
//                             }}
//                           >
//                             <TableCell component="th" scope="row">
//                               {title}
//                             </TableCell>
//                             <TableCell align="right">
//                               {authors?.join(", ")}
//                             </TableCell>
//                             <TableCell align="right">{item.id}</TableCell>
//                             <TableCell align="right">
//                               <a href={infoLink}>{infoLink}</a>
//                             </TableCell>
//                           </TableRow>
//                           {currentId === item.id && (
//                             <TableRow>
//                               <TableCell colSpan={4}>
//                                 <div>
//                                   {detailedData && (
//                                     <>
//                                       <h2>{detailedData.volumeInfo.title}, </h2>
//                                       <p>{detailedData.volumeInfo.subtitle}</p>
//                                       <div className={s.contentWrapper}>
//                                         <img
//                                           src={
//                                             detailedData.volumeInfo.imageLinks
//                                               .thumbnail
//                                           }
//                                         />
//                                         <ul>
//                                           <li>
//                                             {" "}
//                                             <p>
//                                               <b>Author: </b>
//                                               {detailedData.volumeInfo.authors?.join(
//                                                 ", "
//                                               )}
//                                             </p>
//                                           </li>
//                                           <li>
//                                             <p>
//                                               <b>Publisher: </b>
//                                               {
//                                                 detailedData.volumeInfo
//                                                   .publisher
//                                               }
//                                               ,
//                                               {
//                                                 detailedData.volumeInfo
//                                                   .publishedDate
//                                               }
//                                             </p>
//                                           </li>
//                                           <li>
//                                             {" "}
//                                             <p>
//                                               <b>Print type: </b>
//                                               {
//                                                 detailedData.volumeInfo
//                                                   .printType
//                                               }
//                                             </p>
//                                           </li>
//                                           <li>
//                                             {" "}
//                                             <p>
//                                               <b>Page count: </b>
//                                               {
//                                                 detailedData.volumeInfo
//                                                   .pageCount
//                                               }
//                                             </p>
//                                           </li>
//                                           <li>
//                                             {" "}
//                                             <p>
//                                               <b>Description: </b>
//                                               {
//                                                 detailedData.volumeInfo
//                                                   .description
//                                               }
//                                             </p>
//                                           </li>
//                                         </ul>
//                                       </div>
//                                     </>
//                                   )}
//                                 </div>
//                               </TableCell>
//                             </TableRow>
//                           )}
//                         </React.Fragment>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;
