import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import web3 from 'web3';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const SimpleTable = (props) => {
    const { classes, addressInfo } = props;
    const txs = addressInfo.transactions || [];
  
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>TxHash</TableCell>
              <TableCell numeric>Block</TableCell>
              <TableCell numeric>Timestamp</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {txs.map(row => {
              return (
                <TableRow key={row.hash}>
                  <TableCell>
                    {row.hash}
                  </TableCell>
                  <TableCell>
                    {row.blockNumber}
                  </TableCell>
                  <TableCell numeric>{row.timeStamp}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell>Eth {web3.utils.fromWei(`${row.value}`, 'ether')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
  SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleTable);