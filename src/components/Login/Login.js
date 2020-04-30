import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, clearAction} from '../../actions/index';
import { history } from '../../helpers/history';
class Login extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logoutUser();

        this.state = {
            userName: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { userName, password } = this.state;
        if (userName && password) {
            this.props.loginUser({userName, password});
        }
    }

    componentDidUpdate(){
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { userName, password, submitted } = this.state;
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <div className="col-sm-8 col-sm-offset-2">
                        {this.props.alertType &&
                            <div className={`alert ${this.props.alertType}`}>{this.props.alertMessage}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Login</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                                    <label htmlFor="userName">Username</label>
                                    <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                                    {submitted && !userName &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Login</button>
                                    <Link to="/register" className="btn btn-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user.user,
        alertType: state.common.type,
        alertMessage: state.common.message
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
        logoutUser: (user) => dispatch(logoutUser(user)),
        clearAlerts: () => dispatch(clearAction())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
  
  