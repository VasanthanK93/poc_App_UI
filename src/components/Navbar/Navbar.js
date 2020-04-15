import React, { Component} from 'react';
import { connect } from 'react-redux';
import { addPoc, editPoc, removePoc, getPocList, getPocTeam} from '../../actions/index';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
          value: ''
        }
    }
    handleChange= async(event)=> {
        this.setState({value: event.target.value});
        var selectedValue = event.target.value;
        if(selectedValue==="All"){
            this.props.getPocList();
        }else{
          this.props.getPocTeam(selectedValue);
        }
    } 
    render(){
        return (
            <div className = "col-md-3 select">
                <span>Task List :    </span>
                <select value={this.state.value} onChange={this.handleChange} placeholder="Select">
                    <option value="All">All</option>
                    <option value="T1">Team 1</option>
                    <option value="T2">Team 2</option>
                    <option value="T3">Team 3</option>
                    <option value="T4">Team 4</option>
                    <option value="T5">Team 5</option>
                </select>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPoc: (pers) => dispatch(addPoc(pers)),
        removePoc: (pers) => dispatch(removePoc(pers)),
        editPoc: (id,history) => dispatch(editPoc(id,history)),
        getPocList: () => dispatch(getPocList()),
        getPocTeam: (team) => dispatch(getPocTeam(team))
    }
  }

  export default connect(null,mapDispatchToProps)(Navbar);
  
  