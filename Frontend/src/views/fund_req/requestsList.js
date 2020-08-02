import React, { Fragment, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../../App.css";
import { Redirect, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import moment from "moment";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const useStylesButton = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SchemeRequestTable = (props) => {
  const { schemes } = props;
  //const classes = useStyles();
  const [title, setTitle] = useState("title");
  const classes = useStyles2();
  const buttonStyleClass = useStylesButton();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "serialNo",
    order: "asc",
  });
  let history = useHistory();

  let emptyRows = 0;
  if (schemes) {
    emptyRows =
      rowsPerPage - Math.min(rowsPerPage, schemes.length - page * rowsPerPage);
  }

  const handleRoute = (scheme) => {
    const { slug } = scheme;
    history.push({
      pathname: `/all-requests/${slug}`,
      state: {
        scheme,
      },
    });
  };
  const handleRoute2 = (scheme) =>
    history.push({
      pathname: "/common-view2",
      scheme: scheme,
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectScheme = (scheme) => {
    const { name } = scheme;
    setTitle(name);
    handleRoute(scheme);
  };

  const handleFundRequest = (scheme) => {
    const { name } = scheme;
    setTitle(name);
    handleRoute2(scheme);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (path) => {
    const sortColumn2 = { ...sortColumn };
    if (sortColumn.path === path) {
      sortColumn2.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn2.path = path;
      sortColumn2.order = "asc";
    }

    setSortColumn({
      path: sortColumn2.path,
      order: sortColumn2.order,
    });
  };

  const sortedData = _.orderBy(schemes, [sortColumn.path], [sortColumn.order]);

  console.log("sorted data >>", sortedData);

  return (
    <Fragment>
      <Typography
        component="div"
        style={{
          backgroundColor: "#f6f8fa",
          paddingTop: "5.5rem",
          width: "auto",
          fontWeight: "600",
          height: "20vh",
          color: "#24292e",
          textshadow:
            "0 1px 1px rgba(27,31,35,0.25), 0 1px 25px rgba(27,31,35,0.75)",
        }}
        variant="h3"
        align="center"
      >
        Requests
      </Typography>

      <Container
        style={{ paddingTop: "1rem" }}
        maxWidth="lg"
        component="main"
        className={classes.heroContent}
      >
        <Typography
          style={{ color: "#24292e" }}
          component="h6"
          variant="h5"
          align="center"
        >
          Select a scheme to see all the requests
        </Typography>
      </Container>
      <div style={{ padding: "0rem 5rem 1rem 5rem" }}>
        <div
          className="scheme-search"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1rem",
          }}
        >
          <TextField
            label="Search schemes"
            // variant="outlined"
            onChange={handleSearch}
          />
        </div>
        <div className="scheme-table">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead
                style={{
                  backgroundColor: "#F1F8FF",
                }}
              >
                <TableRow>
                  <TableCell align="left" onClick={() => handleSort("id")}>
                    <div style={{ cursor: "pointer" }}>Serial Number</div>
                  </TableCell>
                  <TableCell align="left">Scheme Name</TableCell>
                  <TableCell
                    onClick={() => handleSort("scheme_budget")}
                    align="left"
                  >
                    <div style={{ cursor: "pointer" }}>Budget (Rs.)</div>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("date_of_launching")}
                    align="right"
                  >
                    <div style={{ cursor: "pointer" }}>Created On</div>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("date_updated")}
                    align="right"
                  >
                    <div style={{ cursor: "pointer" }}>Updated on</div>
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("numerOfRequests")}
                    align="center"
                  >
                    Scheme ID
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? schemes.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : schemes
                ).map(
                  (scheme) => {
                    return scheme.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) && (
                        <TableRow key={scheme.name}>
                          <TableCell align="left">{scheme.id}</TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => handleSelectScheme(scheme)}
                            >
                              {scheme.name}
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            {scheme.scheme_budget}
                          </TableCell>
                          <TableCell align="right">
                            {scheme.date_of_launching}
                          </TableCell>
                          <TableCell align="right">
                            {moment(scheme.date_updated).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell align="center">
                            <b>{scheme.id}</b>
                          </TableCell>
                        </TableRow>
                      )
                  }
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, { label: "All", value: -1 }]}
                    colSpan={4}
                    count={schemes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
                <TableRow></TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Fragment>
  );
};

export default SchemeRequestTable;
