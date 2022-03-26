import * as React from "react";
import { useAppContext } from "context/AppContext";
import styled from "@emotion/styled";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RouteEndpoints } from "routes/route";
import { QueryStats, BarChart, LightMode, DarkMode } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

const DRAWER_WIDTH = 250;
const useStyles = makeStyles({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  active: {
    backgound: "#e1ebff",
  },
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const { mode, toggleColorTheme } = useAppContext();
  const menuItems = [
    { label: "Table", path: RouteEndpoints.Table, icon: <QueryStats /> },
    { label: "Chart", path: RouteEndpoints.CHART, icon: <BarChart /> },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Root>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Container onClick={() => navigate(RouteEndpoints.Table)}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>GM</Avatar>
          <Typography variant="h5" marginLeft={2}>
            Crypto Stats
          </Typography>
        </Container>
        <List>
          <IconButton onClick={toggleColorTheme}>
            {mode === "light" ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Captialized>{mode} Mode</Captialized>
          {menuItems.map(({ label, path, icon }) => (
            <LinkContainer
              key={label}
              active={pathname === path}
              isLight={mode === "light"}
            >
              <ListItem onClick={() => navigate(path)} button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </LinkContainer>
          ))}
        </List>
      </Drawer>
      <ChildrenContainer isLight={mode === "light"}>
        {children}
      </ChildrenContainer>
    </Root>
  );
};

const Root = styled("div")`
  display: flex;
`;

const ChildrenContainer = styled("div")((props: { isLight: boolean }) => ({
  width: "100%",
  background: props.isLight ? "#f0f0f0" : "black",
  color: props.isLight ? "black" : "white",
}));

const Captialized = styled("span")`
  text-transform: capitalize;
`;
const Container = styled("div")`
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LinkContainer = styled("div")(
  (props: { active: boolean; isLight: boolean }) => ({
    background: props.active ? "#2059cc" : props.isLight ? "white" : "black",
    color: props.isLight ? "black" : "white",
  })
);

export default Layout;
