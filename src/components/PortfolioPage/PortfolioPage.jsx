import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CoinExpansionItem from '../CoinExpansionPanel/CoinExpansionItem';
import CoinExpansionPanel from '../CoinExpansionPanel/CoinExpansionPanels';
import PortfolioSelect from './PortfolioSelect';

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
    },
});

class PortfolioPage extends Component {

    componentDidMount() {
        if (this.props.portfolios.activePortfolio && this.props.portfolios.activePortfolio[0]) {
            this.props.dispatch({ type: 'FETCH_PORTFOLIO_SYMBOLS', payload: this.props.portfolios.activePortfolio[0].id })
        }
    }

    render() {
        const { classes, portfolioSymbols } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify='center' spacing={16}>
                    <PortfolioSelect />
                    <Grid item xs={11} md={9} lg={7}>
                        {portfolioSymbols.map(item => {
                            return (
                                <CoinExpansionItem key={item.id} coin={item} />
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    portfolios: store.portfolios,
    portfolioSymbols: store.portfolioSymbols
})

export default connect(mapStateToProps)(withStyles(styles)(PortfolioPage));