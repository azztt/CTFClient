import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography, Container, Box } from '@material-ui/core'
import { connect } from 'react-redux'
import classes from './competition.module.css'
import CompLeaderboard from '../../../components/Table/CompLeaderboard/CompLeaderboard'
import CompProblems from '../../../components/Problem/CompProblems/CompProblems'
import * as CompetitionActions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner'

class competition extends Component {
  componentDidMount () {
    const { onInitCompetition, location, token } = this.props
    const { _id } = location.state
    console.log('sdasdsa')
    console.log(_id, token)
    onInitCompetition(_id, token)
  }

  render () {
    const { compDetails } = this.props
    let data = <Spinner />
    if (compDetails) {
      data = (
        <div>
          <div className={classes.title}>
            {compDetails.name}
          </div>
          <div className={classes.miniLineCol} />
          <div className={classes.details}>
            {compDetails.details}
          </div>

          <div className={classes.ruleCont}>
            <div className={classes.subTitle}>Rules and Regulations:</div>
            <div className={classes.miniLine} />
            <div className={classes.ruleDetails}>
              Rule Details
            </div>
          </div>
          <div className={classes.challengesCont}>
            <div className={classes.subTitle}>Challenges:</div>
            <div className={classes.miniLine} />
            <div>
              <Box p={3}><CompProblems challenges={compDetails.challenges} /></Box>
            </div>
          </div>
          <div className={classes.rankingCont}>
            <div className={classes.subTitle}>User Ranking:</div>
            <div className={classes.miniLine} />
            <CompLeaderboard leaderboard={compDetails.leaderboard} key={compDetails.id} />
          </div>
        </div>
      )
    }
    return (
      <Container>
        <div className={classes.mainCont}>
          {data}
        </div>
      </Container>

    )
  }
}

competition.propTypes = {
  onInitCompetition: PropTypes.node.isRequired,
  compDetails: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
  location: PropTypes.node.isRequired
}

const mapStateToProps = state => ({
  compDetails: state.competition,
  token: state.token
})
const mapDispatchToProps = dispatch => ({
  onInitCompetition: (id, token) => dispatch(CompetitionActions.initCompetition(id, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(competition)
