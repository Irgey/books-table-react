import { useParams } from "react-router-dom";

export const BooksDetails = () => {
  const { bookId } = useParams();
  return <div>BooksDetails - {bookId}</div>;
};
