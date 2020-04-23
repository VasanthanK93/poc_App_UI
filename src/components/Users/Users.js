import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getUsersList, editUser, deleteUser } from '../../actions/index';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Username', field: 'userName', editable: 'never' },
        {
          title: 'Role',
          field: 'role',
          lookup: { 'DM': 'DM', 'TeamMember': 'Team Member' },
        },
        { title: 'Teams', field: 'teams' }
      ],
      data: [],
      loading: false
    }
  }

  componentDidMount(){
    this.props.getUsersList();
  }

  static getDerivedStateFromProps(nextProps){
    return { data: nextProps.usersList , loading: nextProps.loading}
  }

  render(){
    return (
      <div className="container">
        <MaterialTable
          title="Registered Users"
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          options={{headerStyle: {'font-weight': 'bold'}}}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {  
                if(newData && newData.userName.trim()){
                  this.props.editUser(newData,oldData)  
                  resolve();   
                }else{
                  reject()
                }
              }),
              onRowDelete: (oldData) =>
              new Promise((resolve) => {
                this.props.deleteUser(oldData)  
                resolve();  
              })
          }}
        />
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      usersList: state.users.users,
      loading: state.users.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getUsersList: () => dispatch(getUsersList()),
      editUser: (newData,oldData) => dispatch(editUser(newData,oldData)),
      deleteUser: (oldData) => dispatch(deleteUser(oldData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);

