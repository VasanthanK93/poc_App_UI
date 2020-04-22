import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
class Navbar extends Component {
    render(){
        return (
            <nav className="navBar">
                <h1>POC FORUM</h1>
                {this.props.user && this.props.user.userName && 
                    <ul> 
                        <h4> Hi    {this.props.user.userName} </h4>
                        <li><NavLink to="/login">Logout</NavLink></li>
                        { this.props.user.role === "DM" &&
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
        user: state.users.user
    }
}

export default connect(mapStateToProps)(Navbar);