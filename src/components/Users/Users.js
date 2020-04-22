import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getUsersList, editUser } from '../../actions/index';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Username', field: 'userName', editable: 'never' },
        {
          title: 'Role',
          field: 'role',
          lookup: { 'DM': 'DM', 'TeamMember': 'Team Member', 'TeamLead': 'TeamLead' },
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
      editUser: (newData,oldData) => dispatch(editUser(newData,oldData)),
      getUsersList: () => dispatch(getUsersList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);

