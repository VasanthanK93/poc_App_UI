import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getUsersList, editUser, deleteUser, getRoles, getTeams } from '../../actions/index';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsList: [],
      rolesList: [],
      columns: [
        { title: 'Username', field: 'userName', editable: 'never' },
        {
          title: 'Role',
          field: 'role',
          //lookup: { 'admin': 'Admin', 'TeamMember': 'Team Member' },
          editComponent: props => (
            <Select
            value={props.rowData.role}
            onChange={(e)=> props.onChange(e.target.value)}>
            {this.state.rolesList.map(role => (
              <MenuItem key={role.roleId} value={role.role}>
                {role.role}
              </MenuItem>
            ))}
            </Select>
          )
        },
        { title: 'Teams',
          field: 'teams',
          //lookup: { 'T1': 'T1', 'T2': 'T2', 'T3': 'T3','T4': 'T4','T5': 'T5' },
          render: rowData => (
            rowData.teams.join(', ')
          ),
          editComponent: props => (
            <Select
              multiple
              value={props.rowData.teams}
              onChange={(e)=> props.onChange(e.target.value)}
              renderValue={selected => selected.join(', ')}
            >
              {this.state.teamsList.map(team => (
                <MenuItem key={team.teamId} value={team.teamName}>
                  <Checkbox checked={props.rowData.teams.indexOf(team.teamName) > -1} />
                  <ListItemText primary={team.teamName} />
                </MenuItem>
              ))}
            </Select>
          )
       },
       { title: 'User Approval',
         field: 'isUserApproved',
         type: 'boolean',
         render: rowData => (
          <Switch
            checked={rowData.isUserApproved}
          />
        ),
         editComponent: props => (
          <Switch
            checked={props.rowData.isUserApproved}
            onChange={(e)=> props.onChange(e.target.checked)} 
          />
         )
        },
      ],
      data: [],
      loading: false
    }
  }

  componentDidMount(){
    this.props.getUsersList();
    this.props.getRoles();
    this.props.getTeams();
  }

  static getDerivedStateFromProps(nextProps){
    return { 
      data: nextProps.usersList ,
      loading: nextProps.loading ,
      teamsList: nextProps.teamsList,
      rolesList: nextProps.rolesList
    }
  }

  render(){
    return (
      <div className="container">
        <MaterialTable
          title="Registered Users"
          columns={this.state.columns}
          data={this.state.data}
          isLoading={this.state.loading}
          options={{headerStyle: {'fontWeight': 'bold'}}}
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
      loading: state.users.loading,
      rolesList: state.common.roles,
      teamsList: state.common.teams
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getUsersList: () => dispatch(getUsersList()),
      editUser: (newData,oldData) => dispatch(editUser(newData,oldData)),
      deleteUser: (oldData) => dispatch(deleteUser(oldData)),
      getRoles: () => dispatch(getRoles()),
      getTeams: () => dispatch(getTeams())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);

