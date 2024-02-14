import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../Security/AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import { ProfilePicContext } from "./ProfilePicProvider";
// import { useContext } from "react";

let settings = ["Profile", "Account", "Dashboard", "Logout"];

function UserDropDown({ profilePic }: any) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const authContext = React.useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext not found");

  const { isAuthenticated, setAuth } = authContext;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const history = useHistory();
  const location = useLocation();

  const token = Cookies.get("auth");

  let userId: any;

  if (token) {
    let claims = jwtDecode(token);
    console.log(token);
    claims && "userId" in claims
      ? (userId = claims.userId)
      : console.log("no user Id");
  }

  const handleCloseUserMenu = (MenuItem: string) => {
    setAnchorElUser(null);
    if (MenuItem === "Logout") {
      authContext.logout();
      history.push("/login");
    } else if (MenuItem === "Profile") {
      history.push(`/profile/${userId}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        {location.pathname.endsWith("/login") ||
        location.pathname.endsWith("/") ? (
          <div></div>
        ) : (
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="user" src={profilePic} />
          </IconButton>
        )}
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {isAuthenticated ? (
          settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Link
                to={`/${setting}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </Link>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={() => handleCloseUserMenu("Login")}>
            <Link
              to="/Login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography textAlign="center">Login</Typography>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
export default UserDropDown;
