import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import DoneAll from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';

import CountUp from 'react-countup';

const styles = theme => ({
    root: {
        width: '100%',
    },
    listItem: {
        padding: `${theme.spacing.unit} ${theme.spacing.unit * 2}`,
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    coinName: {
        flexGrow: 1
    },
    primaryText: {
        display: 'flex'
    },
    inlineTitle: {
        display: 'inline',
    },
    textPrice: {
        display: 'inline',
        paddingRight: theme.spacing.unit * 2,
    },
    textPercentPos: {
        display: 'inline',
        color: green[400],
    },
    textPercentNeg: {
        display: 'inline',
        color: red[400],
    },
    button: {
        color: 'rgba(255, 255, 255, 0.4)',
        padding: theme.spacing.unit,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    centerButtons: {
        display: 'flex',
        alignItems: 'center'
    },
    chip: {
        color: theme.palette.text.disabled,
        marginLeft: theme.spacing.unit * 2,
    },
    chipIcon: {
        color: theme.palette.text.disabled,
    },
    countup: {
        ...theme.typography.h5,
        paddingRight: theme.spacing.unit * 2,
    },

});

class HomeListItem extends Component {

    // add coin to active portfolio
    addCoin = ({ id, symbol_name }) => {
        const { portfolioSymbols } = this.props;
        let match = portfolioSymbols.filter(item => {
            return item.id === id
        })
        if(match.length === 0) {
            this.props.dispatch({
                type: 'ADD_COIN',
                payload: {
                    portfolio: this.props.portfolios.activePortfolio[0].id,
                    coin: id
                }
            })
            this.props.snackbarControl(symbol_name, 'success');
        }
        else {
            this.props.snackbarControl(symbol_name, 'error');
        }
    }


    render() {
        const { classes, coin, portfolioSymbols } = this.props;
        let addedChip = '';
        if (portfolioSymbols.length > 0) {
            let match = portfolioSymbols.filter(item => {
                return item.id === coin.id
            })
            if (match.length === 1) {
                addedChip = (<Chip
                    key={match.id}
                    icon={<DoneAll className={classes.chipIcon} />}
                    label="Added to Portfolio"
                    className={classes.chip}
                    variant="outlined"
                />)
            }
        }
        return (
            <ListItem button className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar
                        alt={`cryptocurrency logo`}
                        src={coin.logo}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className={classes.primaryText}>
                            <span className={classes.coinName}>
                                <Typography component="span" className={classes.inlineTitle} variant='h6' color="textPrimary">
                                    {coin.symbol_name}
                                </Typography>
                                {addedChip}
                            </span>
                            <React.Fragment>
                                {/* <CountUp
                                    start={Number(coin.previous_price)}
                                    end={Number(coin.usd_price)}
                                    delay={0}
                                    decimals={2}
                                    prefix={'$'}
                                >
                                    {({ countUpRef }) => (
                                        <div className={classes.countup}>
                                            <span ref={countUpRef} />
                                        </div>
                                    )}
                                </CountUp> */}
                                <Typography component="span" variant='h5' className={classes.textPrice}>${Number(coin.usd_price).toFixed(2)}</Typography>
                                <Typography component="span" variant='overline' className={coin.price_change > 0 ? classes.textPercentPos : classes.textPercentNeg}>{Number(coin.price_change).toFixed(2)}%</Typography>
                            </React.Fragment>
                            
                        </div>
                    }
                />
                <ListItemSecondaryAction className={classes.centerButtons}>
                    <IconButton
                        size='small'
                        className={classes.button}
                        onClick={() => this.addCoin(coin)}
                    >
                        <AddCircle fontSize='small' />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

const mapStateToProps = store => ({
    portfolios: store.portfolios,
    portfolioSymbols: store.portfolioSymbols,
    user: store.user,
})

export default connect(mapStateToProps)(withStyles(styles)(HomeListItem));