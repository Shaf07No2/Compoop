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
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const handleClick = (id: string) => {
    // Perform your action here

    // Then navigate to the new route
    history.push(`/profile/${id}`);
  };
  return (
    <>
      {results.map((result: SearchResultFormat) => (
        <div
          // to={`/profile/${result.id}`}
          // to={`/compoop`}
          key={result.id}
          style={{ textDecoration: "none", color: "inherit" }}
          // onClick={(event: any) => {
          //   event.preventDefault();
          //   event.stopPropagation();
          // }}
          onClick={() => handleClick(`${result.id}`)}
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
        </div>
      ))}
    </>
  );
}

export function SearchBar({
  handleSearch,
  results,
  isOpen,
  setOpen,
}: {
  handleSearch: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  results: SearchResultFormat[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null); // Create a ref
  let blurTimeout: NodeJS.Timeout;
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Set focus to the input field when the popup is open
    }
  }, [isOpen]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Popup
        open={isOpen}
        trigger={
          <StyledInputBase
            ref={inputRef} // Use the ref here
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(event) => {
              handleSearch(event);
              setOpen(true); // Open the popup when there's input
            }}
            onFocus={() => {
              // Clear the timeout when the input is focused
              clearTimeout(blurTimeout);
            }}
          />
        }
        position="bottom left"
        closeOnDocumentClick
        lockScroll
        repositionOnResize
      >
        <SearchResults results={results} />
      </Popup>
    </Search>
  );
}

export default function SearchComponent() {
  console.log("rerendering");
  const [input, setInput] = React.useState("");
  // const [searchTerm, setSearchTerm] = React.useState("");
  const [results, setResults] = React.useState<SearchResultFormat[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const token = Cookies.get("auth");

  const handlePopoverOpen = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const debouncedSave = React.useCallback(
    debounce((nextValue: string) => setInput(nextValue), 300),
    [input] // Will be created only once initially
  );

  const handleSearch = (event: any) => {
    const { value: nextValue } = event.target;
    debouncedSave(nextValue);

    if (nextValue && nextValue.trim() !== "") {
      handlePopoverOpen(event);
      setAnchorEl(event.currentTarget);
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
  }, [input, token, isOpen]);
  return (
    <>
      <SearchBar
        handleSearch={handleSearch}
        results={results}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />
    </>
  );
}
