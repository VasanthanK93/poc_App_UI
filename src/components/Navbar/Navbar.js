import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render(){
        return (
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">POC FORUM
                {this.props.user && this.props.user.userName && 
                    <div className="user pull-right" >
                        <div>Hi    {this.props.user.userName}</div>
                        <Link to="/login" >Logout</Link>
                    </div>
                }
                </h1>
                
              </header>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Navbar);
  
  