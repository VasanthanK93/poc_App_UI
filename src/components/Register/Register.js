import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/index';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: '',
                password: ''
            },
            submitted: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.userName && user.password ) {
            this.props.registerUser(user);
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Register</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !user.userName ? ' has-error' : '')}>
                                    <label htmlFor="userName">Username</label>
                                    <input type="text" className="form-control" name="userName" value={user.userName} onChange={this.handleChange} />
                                    {submitted && !user.userName &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Register</button>
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(registerUser(user))
    }
}
  
export default connect(null,mapDispatchToProps)(Register);
  