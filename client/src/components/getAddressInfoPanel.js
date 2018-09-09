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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContent from './snackBarContent';


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

class GetAddressInfoPanel extends Component {
  state = {
    address: '',
    loading: false,
    success: null,
    showMessage: false,
    errorMessage: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loadAddressData = async (address) => {
    const res = await fetch(`/api/address/${address}`, {
      method: 'get'
    });
    return res;
  }

  loadTxData = async (address) => {
    const res = await fetch(`/api/transactions/${address}`, {
      method: 'get'
    });
    return res;
  }

  handleButtonClick = async () => {
    const { address } = this.state;
    this.setState({ loading: !this.state.loading });
    const res = await Promise.all([this.loadAddressData(address),this.loadTxData(address)]);
    const resAddressJson = await res[0].json();
    const resTxJson = await res[1].json();
    this.setState({ loading: !this.state.loading });
    if (res[0].ok) {
      this.setState({ showMessage: true, success: true });
      this.props.onAddressInfoLoad({ ...resAddressJson, ...resTxJson });
    } else {
      this.setState({ showMessage: true, succes: false, errorMessage: resAddressJson.message });
    }
    
  }

  handleCloseSuccessMessage = () => {
    this.setState({ showMessage: false });
  }

  renderMessage = () => {
    const { showMessage, success, errorMessage } = this.state;
    const variant = success ? 'success' : 'error';
    const message = success ? "Ethereum Address Information Found!" : errorMessage;
    if (showMessage) {
      return (
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={showMessage}
            autoHideDuration={2000}
            onClose={this.handleCloseSuccessMessage}
          >
            <SnackBarContent
              onClose={this.handleCloseSuccessMessage}
              variant={variant}
              message={message}
            />
          </Snackbar>
      );
    }     
  }

  renderLoadingSection = () => {
    const { loading } = this.state;

    return (
      <div>
        <Fade
              in={loading}
              style={{
                transitionDelay: loading ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>Query Ethereum Address Information</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Enter an Ethereum Address:</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {/* <div className={classes.column} /> */}
              <div className={classes.column}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Ethereum Address"
                    fullWidth
                    placeholder="0x00000000000000000000000000000000"
                    value={this.state.address}
                    onChange={this.handleChange('address')}
                  />
              </div>
              <div className={classNames(classes.column, classes.helper)}>
                <Button 
                  variant="contained" 
                  size="large" 
                  color="primary" 
                  className={classes.button}
                  onClick={this.handleButtonClick}
                >
                  Search
                </Button>
              </div>
              <div className={classNames(classes.column, classes.helper)}>
                {this.renderLoadingSection()}
              </div>
          </ExpansionPanelDetails>
          {this.renderMessage()}
        </ExpansionPanel>
      </div>
    );
  }

}

GetAddressInfoPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetAddressInfoPanel);