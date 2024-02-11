import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios, { AxiosHeaders } from "axios";
import { AuthContext } from "../Security/AuthContext";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Grow from "@mui/material/Grow";
import Cookies from "js-cookie";
import { decodeJwt as JWT } from "jose";
import { ProfilePicContext } from "../Fixed/ProfilePicProvider";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/poopfeed">
        ComPoop Industries
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LogIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked] = React.useState(true);

  const authContext = React.useContext(AuthContext);
  const { clearProfilePic } = React.useContext(ProfilePicContext);

  if (!authContext) throw new Error("AuthContext not found");

  const { setAuth } = authContext;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/login",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      const header = response.headers;
      let token;

      if (header instanceof AxiosHeaders) {
        token = header.get("Authorization") as string;
      }

      if (token) {
        Cookies.set("auth", token, { expires: new Date(2147483647000) });
        localStorage.setItem(email, email);
        let claims = JWT("claim= " + token);
        let userId: any;
        claims && "userId" in claims
          ? (userId = claims.userId)
          : console.log("UserID not found");
        localStorage.setItem("userId", userId);
        setAuth(true);
        history.push("/poopfeed");
      }
      clearProfilePic();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Grow in={checked}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
              backgroundSize: "auto",
              borderRadius: "5%",
              padding: "5%",
              paddingBottom: "30px",
              paddingRight: "30px",
              paddingLeft: "30px",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={"/signup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grow>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
