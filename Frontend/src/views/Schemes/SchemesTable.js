import React, { Fragment, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import moment from "moment";
import { getSchemes } from "../../core_api_calls/schemes";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
  preload: PropTypes.func.isRequired,
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

const SchemeTable = (props) => {
  console.log("props: ", props);
  const { schemes } = props;
  const [title, setTitle] = useState("title");
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "Scheme Name",
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
      pathname: `scheme-details/${slug}`,
      scheme: scheme,
    });
  };
  const handleRoute2 = (scheme) => {
    history.push({
      pathname: "/common-view2",
      scheme: scheme,
    });
  };

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
  return (
    <Fragment>
      <Typography
        component="div"
        style={{
          backgroundColor: "#f6f8fa",
          paddingTop: "5.5rem",
          width: "100%",
          fontWeight: "600",
          height: "20vh",
          color: "#24292e",
          textshadow:
            "0 1px 1px rgba(27,31,35,0.25), 0 1px 25px rgba(27,31,35,0.75)",
        }}
        variant="h3"
        align="center"
      >
        All Schemes
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
          Select a scheme to see all details
        </Typography>
      </Container>

      <div style={{}}>
        <div
          className="scheme-search"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "0.7rem",
          }}
        >
          <TextField
            label="Search schemes"
            // variant="outlined"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="scheme-table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead style={{ backgroundColor: "#F1F8FF" }}>
              <TableRow>
                <TableCell align="center">Scheme Name</TableCell>
                <TableCell
                  onClick={() => {
                    handleSort("scheme_budget");
                  }}
                  align="center"
                >
                  <div style={{ cursor: "pointer" }}>Budget (Cr.)</div>
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleSort("date_of_launching");
                  }}
                  align="center"
                >
                  <div style={{ cursor: "pointer" }}>Launched On</div>
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleSort("date_updated");
                  }}
                  align="center"
                >
                  <div style={{ cursor: "pointer" }}>Updated On</div>
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
                (scheme) =>
                  scheme.name.toLowerCase().includes(search.toLowerCase()) && (
                    <TableRow key={scheme.name}>
                      <TableCell align="center" component="th" scope="row">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelectScheme(scheme)}
                        >
                          {scheme.name}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {scheme.scheme_budget}
                      </TableCell>
                      <TableCell align="center">
                        {scheme.date_of_launching}
                      </TableCell>
                      <TableCell align="center">
                        {moment(scheme.date_updated).format("YYYY-MM-DD")}
                      </TableCell>
                    </TableRow>
                  )
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
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
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
    </Fragment>
  );
};

export default SchemeTable;
