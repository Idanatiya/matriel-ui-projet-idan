import * as React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Popper,
  FormGroup,
  FormControlLabel,
  Box,
  IconButton,
} from "@mui/material";
import { HeadCell, Coin, OrderDirection } from "types/common";
import { List } from "@mui/icons-material";
import { headerCells } from "types/constants";
import { useAppContext } from "context/AppContext";

interface Props {
  data: HeadCell[];
  onHandleSort: (id: keyof Coin) => void;
  orderByValue: keyof Coin;
  orderDirection: OrderDirection;
  onHandleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    cell: HeadCell
  ) => void;
}

const TableHeader = ({
  data,
  onHandleSort,
  orderByValue,
  orderDirection,
  onHandleChange,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { mode } = useAppContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const createSortHandler =
    (id: keyof Coin) => (ev: React.MouseEvent<unknown>) => {
      onHandleSort(id);
    };
  return (
    <>
      <Popper open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <FormGroup>
            {headerCells.map((cell) => (
              <FormControlLabel
                key={cell.id}
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(ev, checked) =>
                      onHandleChange(ev, checked, cell)
                    }
                  />
                }
                label={cell.name}
                style={{ color: mode === "light" ? "black" : "white" }}
              />
            ))}
          </FormGroup>
        </Box>
      </Popper>
      <TableHead>
        <TableRow>
          {data.map((cell) => (
            <TableCell key={cell.id}>
              <TableSortLabel
                active={cell.id === orderByValue}
                onClick={createSortHandler(cell.id as keyof Coin)}
                direction={cell.id === orderByValue ? orderDirection : "asc"}
              >
                {cell.name}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>
            <span>Toggle column</span>
            <IconButton onClick={handleClick}>
              <List />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
