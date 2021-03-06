import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProfile } from '../../actions/index';
class Navbar extends Component {
    
    componentDidMount(){
        this.props.getProfile()
    }

    render(){
        return (
            <nav className="navBar">
                <h4>POC FORUM
                  {this.props.user && this.props.user.userName && 
                   <p className=" pull-right"> Hi    {this.props.user.userName} </p>}
                </h4>
                {this.props.user && this.props.user.userName && 
                    <ul>   
                        <li><NavLink to="/login">Logout</NavLink></li>
                        <li><NavLink to="/reset">Reset Password</NavLink></li>
                        { this.props.user.role === "admin" &&
                        <li><NavLink to="/users">Users</NavLink></li>
                        }
                        <li><NavLink exact to="/">Home</NavLink></li>
                    </ul>
                }
           </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(getProfile())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);