import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPocList, getPocTeam, getTeams} from '../../actions/index';
import TeamTable from './TeamTable';
class Team extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: ''
        }
    }

    componentDidMount(){
        this.props.getTeams();
    }

    handleChange= async(event)=> {
        this.setState({value: event.target.value});
        var selectedValue = event.target.value;
        if( selectedValue === "All" ){
            this.props.getPocList();
        }else{
          this.props.getPocTeam(selectedValue);
        }
    } 
    render(){
        return (
            <div className="container">
                <div className = "col-md-3 select">
                    <span>Team :    </span>
                    <select value={this.state.value} onChange={this.handleChange} placeholder="Select">
                        <option value="All">All</option>
                        {/* <option value="T1">Team 1</option>
                        <option value="T2">Team 2</option>
                        <option value="T3">Team 3</option>
                        <option value="T4">Team 4</option>
                        <option value="T5">Team 5</option> */}
                        { this.props.teamsList && this.props.teamsList.map(team =>
                                <option key={team.teamId} value={team.teamName}>{team.teamName}</option>
                            )
                        }
                    </select>
                </div>
                <TeamTable/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamsList: state.common.teams
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        getPocList: () => dispatch(getPocList()),
        getPocTeam: (team) => dispatch(getPocTeam(team)),
        getTeams: () => dispatch(getTeams())
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Team);
  
  