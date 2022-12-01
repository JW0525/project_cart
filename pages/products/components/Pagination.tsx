import styled from "@emotion/styled";
import uiCss from "../../../styles/uiCss";

const PaginationLayout = styled.div`
  ${uiCss.flexRow.custom('center', 'flex-start')};
  margin: 30px;
  gap: 4px;
  
  button {
    border: none;
    padding: 0 8px;
    margin: 0;
    font-size: 1.5rem;
    font-family: Campton-Book, sans-serif;

    &:hover {
      transform: translateY(-2px);
      font-size: 1.5rem;
      cursor: pointer;
    }

    &:disabled {
      transform: revert;
      cursor: revert;
    }

    &.selected {
      transform: revert;
      color: #FF4800;
      cursor: revert;
      font-size: 1.5rem;
    }
  }
`;

const Pagination = (props: {
  total: number,
  limit: number,
  page: any,
  setPage: any
}) => {
  const { total, limit, page, setPage } = props;
  const numPages = Math.ceil(total / limit);


  return (
    <PaginationLayout>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {
        numPages &&
        Array(numPages).fill(1).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={(page === i + 1) ? "selected" : ""}
            >
              {i + 1}
            </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </PaginationLayout>
  );
}

export default Pagination;