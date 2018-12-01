import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";

class CustomTable extends React.Component {
  state = {
    selected: -1,
    page: 0,
    rowsPerPage: 10
  };

  handleClick = (event, id) =>
    this.setState({ selected: id }, () => this.props.onChangedSelected(id));

  handleChangePage = (event, page) => this.setState({ page });

  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: event.target.value });

  render() {
    const {
      classes,
      tableHead,
      tableData,
      tableHeaderColor,
      columnType
    } = this.props;
    const { selected, rowsPerPage, page } = this.state;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((row, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                      padding={"none"}
                    >
                      {row}
                    </TableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, key) => (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, key)}
                  key={key}
                  selected={key === selected}
                >
                  {columnType.map((prop, key) => (
                    <TableCell className={classes.tableCell} key={key}>
                      {n.data()[prop]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Sayfalama miktarı:"
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.array,
  tableData: PropTypes.arrayOf(PropTypes.object),
  onChangedSelected: PropTypes.func,
  columnType: PropTypes.array
};

export default withStyles(tableStyle)(CustomTable);
