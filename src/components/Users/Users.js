import React, { Component} from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getUsersList, editUser, deleteUser } from '../../actions/index';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
class Users extends Component {
  constructor(props) {
    super(props);
    const teamList = [ 'T1', 'T2','T3','T4','T5' ];
    this.state = {
      columns: [
        { title: 'Username', field: 'userName', editable: 'never' },
        {
          title: 'Role',
          field: 'role',
          lookup: { 'admin': 'Admin', 'TeamMember': 'Team Member' },
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
              {teamList.map(team => (
                <MenuItem key={team} value={team}>
                  <Checkbox checked={props.rowData.teams.indexOf(team) > -1} />
                  <ListItemText primary={team} />
                </MenuItem>
              ))}
            </Select>
          )
       }
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

