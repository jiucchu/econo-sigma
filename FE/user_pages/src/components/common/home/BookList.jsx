import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Book = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Img = styled.img`
  display: inline-block;
  width: 11.563em;
  height: 13.563em;
  background-color: aliceblue;
  border: none;
  box-shadow: 0.4em 0.5em 0.5em 0em rgba(0, 0, 0, 0.25), 0em 0.313em 0.875em 0em rgba(0, 0, 0, 0.18);
`;

const Title = styled.span`
  font-family: 'NanumSquareOTF', sans-serif;
  font-size: 1.3em;
  font-weight: 800;
  margin-top: 0.8em;
  margin-bottom: 0.3em;
`;

const Writer = styled.span`
  font-family: 'NanumSquareOTF', sans-serif;
  font-size: 0.938em;
  font-weight: 300;
`;

const Publisher = styled.span`
  font-family: 'NanumSquareOTF', sans-serif;
  font-size: 0.938em;
  font-weight: 300;
`;

const BookList = ({ data }) => {
  const navigate = useNavigate();

  const bookData = data;
  const key = bookData.id;
  const img = bookData.imageURL;
  let title = bookData.title;
  const author = bookData.author;
  const publisher = bookData.publisher;

  if (title.length > 8) {
    title = `${title.substring(0, 8)}...`;
  }

  const onClick = () => {
    navigate(`/books/${bookData.id}`);
  };

  return (
    <Book onClick={onClick} key={key}>
      <Img src={img} alt={title} />
      <Title>{title}</Title>
      <div>
        <Writer>{author}</Writer>
        <span
          style={{
            fontFamily: 'NanumSquareOTF, sans-serif',
            fontWeight: '300',
            fontSize: '0.938em',
            marginLeft: '0.5em',
            marginRight: '0.5em',
          }}
        >
          /
        </span>
        <Publisher>{publisher}</Publisher>
      </div>
    </Book>
  );
};

export default BookList;