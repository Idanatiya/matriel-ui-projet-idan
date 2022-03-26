import * as React from "react";
import { TableRow, TableCell, Stack, IconButton } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "@emotion/styled";
import { Delete, Compare } from "@mui/icons-material";
import { HeadCell, RowData } from "../../types/common";
import { RouteEndpoints } from "../../routes/route";
import { useNavigate } from "react-router";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const abbreviate = require("number-abbreviate");
interface Props {
  row: RowData;
  onDeleteRow: (id: string) => void;
  visibleCols: HeadCell[];
}

const Row = ({ row, onDeleteRow, visibleCols }: Props) => {
  const navigate = useNavigate();
  const ids = visibleCols.map((col) => col.id);
  return (
    <TableRow key={row.id}>
      <Cell isVisible={ids.includes("rank")}>
        <BaseSpan>{row.rank}</BaseSpan>
      </Cell>
      <Cell isVisible={ids.includes("name")}>
        <img
          style={{ width: 25, objectFit: "cover" }}
          src={row.icon}
          alt={row.name}
        />
        <Stack direction="column">
          <BaseSpan>{row.name}</BaseSpan>
          <CoinSymbol>{row.symbol}</CoinSymbol>
        </Stack>
      </Cell>
      <Cell isVisible={ids.includes("price")}>
        <Highlight isNegative={row.price < 0}>
          {row.price.toFixed(5)}$
        </Highlight>
      </Cell>
      <Cell isVisible={ids.includes("priceBtc")}>
        <BaseSpan>{row.priceBtc.toFixed(6)}</BaseSpan>
      </Cell>
      <Cell isVisible={ids.includes("marketCap")}>
        <Captlize>{abbreviate(row.marketCap)}</Captlize>
      </Cell>
      <Cell isVisible={ids.includes("volume")}>
        <Captlize>{abbreviate(row.volume)}</Captlize>
      </Cell>
      <Cell isVisible={ids.includes("priceChange1d")}>
        <Highlight isNegative={row.priceChange1d < 0}>
          {row.priceChange1d}$
        </Highlight>
      </Cell>
      <Cell isVisible={ids.includes("priceChange1w")}>
        <div style={{ height: 100 }}>
          <Line
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
              datasets: [
                {
                  data: row.chartData,
                  borderWidth: 1,
                  borderColor: row.priceChange1w > 0 ? "#1DB954" : "#E50914",
                },
              ],
            }}
          />
        </div>
      </Cell>
      <TableCell onClick={() => onDeleteRow(row.id)}>
        <DelteBtn>
          <Delete />
        </DelteBtn>
        <IconButton onClick={() => navigate(RouteEndpoints.CHART)}>
          <Compare />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const Cell = styled(TableCell)((props: { isVisible: boolean }) => ({
  opacity: props.isVisible ? 1 : 0,
  transition: "ease 0.3s",
}));

const BaseSpan = styled("span")`
  font-weight: bold;
`;

const DelteBtn = styled(IconButton)`
  color: crimson;
`;

const Captlize = styled("span")`
  text-transform: uppercase;
  font-weight: bold;
`;

const Highlight = styled("span")((props: { isNegative: boolean }) => ({
  color: props.isNegative ? "crimson" : "unset",
  fontWeight: props.isNegative ? "bold" : "normal",
}));

const CoinSymbol = styled("span")`
  font-size: 10px;
  color: #dbdbdb;
`;

export default Row;
