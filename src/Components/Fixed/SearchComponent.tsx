import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";

import Popup from "reactjs-popup";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

interface SearchResultFormat {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePic: string;
  role: string;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: "25px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        boxShadow: "0 0 10px #719ECE",
      },
    },
  },
}));

export function SearchResults({ results }: { results: SearchResultFormat[] }) {
  return (
    <>
      {results.map((result: SearchResultFormat, index) => (
        <Link
          to={`/user/${result.id}`}
          key={index}
          // to={`/poopfeed`}
          // to={`/compoop`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={(event: any) => {
            alert("Link clicked!"); // This will show an alert when the link is clicked
            console.log("Link clicked!");
            event.stopPropagation();
          }}
        >
          <Card sx={{ minWidth: 275, marginTop: 1 }}>
            <CardContent>
              <Avatar alt={result.userName} src={result.profilePic} />
              <Typography variant="h5" component="div">
                {`${result.firstName} ${result.lastName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Email: ${result.email}`}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {`Username: ${result.userName}`}
              </Typography> */}
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}

export function SearchBar({
  handleSearch,
  results,
}: {
  handleSearch: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  results: SearchResultFormat[];
}) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Popup
        trigger={
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => handleSearch(event)}
          />
        }
        position="bottom left"
        on="focus"
      >
        <SearchResults results={results} />
      </Popup>
    </Search>
  );
}

export default function SearchComponent() {
  const [input, setInput] = React.useState("");
  // const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState<SearchResultFormat[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const token = Cookies.get("auth");

  const handlePopoverOpen = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const debouncedSave = React.useCallback(
    debounce((nextValue: string) => setInput(nextValue), 500),
    [input] // Will be created only once initially
  );

  const handleSearch = (event: any) => {
    const { value: nextValue } = event.target;
    debouncedSave(nextValue);

    if (nextValue) {
      handlePopoverOpen(event);
      setAnchorEl(event.currentTarget);
    } else {
      handlePopoverClose();
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null); // Create a ref

  const handlePopoverClose = () => {
    // Only close the popover if there's no search input
    if (!input) {
      setAnchorEl(null);
      if (inputRef.current) {
        inputRef.current.focus(); // Return focus to the input field
      }
    }
  };

  React.useEffect(() => {
    if (input) {
      console.log("sending request");
      axios
        .get(`http://localhost:8008/search/${input}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          withCredentials: true,
        })
        .then((response) => {
          setResults(
            response.data.map((item: any) => ({
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              email: item.email,
              password: item.password,
              userName: item.userName,
              profilePic: item.profilePic,
              role: item.role,
            }))
          );

          console.log(response.data);
        })

        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [input, token]);
  return (
    <>
      <SearchBar handleSearch={handleSearch} results={results} />
      {/* <SearchResults results={results} /> */}
    </>
  );
}
