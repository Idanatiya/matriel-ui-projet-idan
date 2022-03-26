import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import logo from "assets/icons/logo.png";

export default function Chart() {
  return (
    <Root>
      <Typography variant="h3">Charts</Typography>
      <Typography variant="h4">On progress...</Typography>
      <Image src={logo} />
    </Root>
  );
}

const Root = styled("div")`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Image = styled("img")`
 width: 70px
 height: 70px
`;
