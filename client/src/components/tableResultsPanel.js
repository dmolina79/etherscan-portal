import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Table from './table';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    margin: theme.spacing.unit,
    background: theme.palette.secondary.main
  }
});

const renderTable = addressInfo => {
    if (addressInfo) {
        return (
            <Table addressInfo={addressInfo} />
        );
    }
}

const renderAddressInfo = addressInfo => {
    if (addressInfo) {
        const { address, balance } = addressInfo;
        return (
            <div>
                <Typography>Address: {address}</Typography>
                <Typography>Balance: {balance} Ether</Typography>
            </div>
        );
    }
}

const TableResulsPanel = props =>  {

    const { classes, addressInfo } = props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
            </div>
            <div className={classes.column}>
              <Typography className={classes.heading}>Address Detail Information</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {renderAddressInfo(addressInfo)}
            {renderTable(addressInfo)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
}

TableResulsPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableResulsPanel);