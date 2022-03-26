import * as React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import TableHeader from "../../components/TableHeader/TableHeader";
import { Coin, SortValue, OrderDirection, RowData } from "types/common";
import styled from "@emotion/styled";
import Row from "../../components/Row/Row";
import { coinStatsClient } from "api/api";
import { HeadCell } from "types/common";
import { headerCells } from "types/constants";

const ROWS_PER_PAGE = 10;

const Home = () => {
  const [data, setData] = React.useState<(Coin & { chartData: number[][] })[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);
  const [orderDirection, setOrderDirection] =
    React.useState<OrderDirection>("asc");
  const [orderByValue, setOrderByValue] = React.useState<SortValue>("rank");
  const [currPage, setCurrPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [visibleColumns, setVisibleColumns] =
    React.useState<HeadCell[]>(headerCells);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await coinStatsClient.get<{ coins: Coin[] }>(
          "coins?skip=0&currency=EUR"
        );
        const coinIds = data.coins.map(({ id }) => id);
        const promises = coinIds.map((coinId) =>
          coinStatsClient
            .get<{ chart: number[][] }>("charts", {
              params: {
                period: "1w",
                coinId,
              },
            })
            .then(({ data }) => data.chart)
        );
        const chartsData = await Promise.allSettled(promises);
        const updData = chartsData.reduce((acc, item, idx) => {
          if (item.status === "fulfilled") {
            const coin = data.coins[idx];
            acc.push({ ...coin, chartData: item.value });
          }
          return acc;
        }, [] as RowData[]);
        setLoading(false);
        localStorage.setItem("coinsData", JSON.stringify(updData));
        setData(updData);
      } finally {
        setLoading(false);
      }
    };
    const coinsData = JSON.parse(localStorage.getItem("coinsData") as string);
    if (coinsData) return setData(coinsData);
    fetchData();
  }, []);

  const onHandleSort = (id: keyof Coin) => {
    const isAsceding = orderByValue === id && orderDirection === "asc";
    setOrderDirection(isAsceding ? "desc" : "asc");
    setOrderByValue(id);
    const sortOrder = isAsceding ? 1 : -1;
    const sortedData = data.slice().sort((a, b) => {
      const A =
        typeof a[id] === "string" ? (a[id] as string).toLowerCase() : a[id];
      const B =
        typeof b[id] === "string" ? (b[id] as string).toLowerCase() : b[id];
      if (A < B) {
        return sortOrder * -1;
      } else if (A > B) {
        return sortOrder * 1;
      } else {
        return 0;
      }
    });
    setData(sortedData);
  };

  const onPageChange = (
    _ev: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setCurrPage(page);
  };

  const onChangeRowsPerPage = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(+ev.target.value);
  };

  const onDeleteRow = (rowId: string) => {
    const filteredData = data.filter((row) => row.id !== rowId);
    setData(filteredData);
  };
  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    cell: HeadCell
  ) => {
    if (!checked) {
      const visibleCols = visibleColumns.filter((col) => col.id !== cell.id);
      setVisibleColumns(visibleCols);
    } else {
      const index = headerCells.findIndex(({ id }) => id === cell.id);
      const newData = visibleColumns.slice();
      if (index !== -1) {
        newData.splice(index, 0, cell);
        setVisibleColumns(newData);
      }
    }
  };

  const indexFirstRow = currPage * rowsPerPage;
  const indexLastRow = indexFirstRow + rowsPerPage;

  if (loading && data.length === 0)
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );

  return (
    <>
      <Header variant="h3">Analytics</Header>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHeader
            data={visibleColumns}
            onHandleChange={onHandleChange}
            orderByValue={orderByValue}
            orderDirection={orderDirection}
            onHandleSort={onHandleSort}
          />
          <TableBody>
            {data.slice(indexFirstRow, indexLastRow).map((row) => (
              <Row
                key={row.id}
                row={row}
                onDeleteRow={onDeleteRow}
                visibleCols={visibleColumns}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50, 75, { value: -1, label: "🦄 All" }]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onChangeRowsPerPage}
        page={currPage}
      />
    </>
  );
};

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Header = styled(Typography)`
  padding: 10px;
`;

export default Home;
