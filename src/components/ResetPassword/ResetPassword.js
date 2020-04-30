import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAction, resetPassword} from '../../actions/index';
import { history } from '../../helpers/history';
class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            newPassword:'',
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
        const { userName, newPassword} = this.state;
        if (userName && newPassword) {
            this.props.resetPassword({userName, newPassword});
        }
    }

    componentDidUpdate(){
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { userName, newPassword, submitted } = this.state;
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <div className="col-sm-8 col-sm-offset-2">
                        {this.props.alertType &&
                            <div className={`alert ${this.props.alertType}`}>{this.props.alertMessage}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Reset Password</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                                    <label htmlFor="userName">Username</label>
                                    <input type="text" className="form-control" name="userName" value={userName} onChange={this.handleChange} />
                                    {submitted && !userName &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !newPassword ? ' has-error' : '')}>
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChange} />
                                    {submitted && !newPassword &&
                                        <div className="help-block">New Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Reset</button>
                                    <Link to="/" className="btn btn-link">Cancel</Link>
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
        resetPassword: (user) => dispatch(resetPassword(user)),
        clearAlerts: () => dispatch(clearAction())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);
  
  