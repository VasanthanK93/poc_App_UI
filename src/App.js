import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Teamtable from './Teamtable/Teamtable';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dropValue : '',
      teamList: 
    [],
    propTeam : [],
    items: [],
    id : '',
    pocDesc : '',
    wikiLink : '',
    statusFull:["New Idea","Shortlisted","InProgress","Blocked","Completed","Demo Shown to Customer"],
    status : [],
    remarks : '',
    deleteStatus : false,
    tableSee : false,
    addFormSee : false,
    showForm: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  getData = async(url)=>{
    let response = await axios.get(url)
      let dataRes = response.data
      return dataRes
  }

  componentDidMount = async()=>{
    let url = "https://pocnodebby.herokuapp.com/poc/v1/getPocList"
    let dataRes = await this.getData(url)
    await this.setState({propTeam:dataRes,tableSee:true})

  }

  addNewRow = () => {
     this.setState({showForm: true})
  }

  addData = (data)=>{  
        let formData = {...data,team:this.state.value,deleteStatus: false}
       let url = "https://pocnodebby.herokuapp.com/poc/v1/addPoc/"+this.state.value
      return axios.post(url,formData)    
}


handleFormSubmit = async e => {
  e.preventDefault();
  let items = {
    id : this.state.id,
    pocDesc : this.state.pocDesc,
    wikiLink : this.state.wikiLink,
    status : this.state.status,
    remarks : this.state.remarks,
  deleteStatus : false
  }
await this.addData(items)
  let url = "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+this.state.value
  let dataRes =await this.getData(url)
  await this.setState({propTeam:dataRes,tableSee:true,addFormSee:true})
  this.setState({
    id : '',
  pocDesc : '',
  wikiLink : '',
  status : [],
  remarks : '',
  deleteStatus : false
  });
};

  handleChange= async(event)=> {
    this.setState({value: event.target.value});
    var searchValue = event.target.value;
    if(searchValue==="All"){
      let url = "https://pocnodebby.herokuapp.com/poc/v1/getPocList"
      let dataRes = await this.getData(url)
      await this.setState({propTeam:dataRes,tableSee:true})
    }else{
      let url = "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+searchValue
      let dataRes =await this.getData(url)
      await this.setState({propTeam:dataRes,tableSee:true,addFormSee:true,showForm:false})
      this.setState({items : this.state.propTeam})
    }
  
  } 

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };

  // deleteRow = (index) => {
  //   var propTeam = [...this.state.propTeam];
  //   propTeam.splice(index, 1);
  //   this.setState({propTeam});
  // }


  handleDropChange = (event) => {
    this.setState({dropValue: event.target.value});
    var searchValue = event.target.value;
    var updatedList = [];
  {this.state.statusFull.filter(name => name.includes(searchValue)).map(filteredName => (
    updatedList = filteredName
  ))}

  this.setState({ status: updatedList})
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">POC FORUM</h1>
        </header>
        <div className = "container">
        <form>
         
          <div className = "col-md-3" style={{marginLeft: '25em', marginTop:'3em'}}>
            <span>Task List :    </span>
          <select value={this.state.value} onChange={this.handleChange} placeholder="Select">
          <option value="All">All</option>
            <option value="T1">Team 1</option>
            <option value="T2">Team 2</option>
            <option value="T3">Team 3</option>
            <option value="T4">Team 4</option>
            <option value="T5">Team 5</option>
          </select>
        </div>

        {/* {this.state.addFormSee ?( <button style = {{marginTop:'3em'}} onClick={this.addNewRow} type="button" className="btn btn-primary text-center"> 
      <i className="fa fa-plus-circle" aria-hidden="true"></i>
      </button>):null}
      {this.state.showForm ? ( <Form handleFormSubmit={ this.handleFormSubmit } 
      handleInputChange={ this.handleInputChange } handleDropChange = {this.handleDropChange}
      data ={this.state.propTeam}
      newId={ this.state.id }
      newDesc={ this.state.pocDesc } 
      newLink={ this.state.wikiLink }
      newStatus={ this.state.status }
      newRemark={ this.state.remarks }
      addData = {this.addData}/>):null}  */}

      {this.state.tableSee ? (<Teamtable value={this.state.value} data ={this.state.propTeam} items={ this.state.items } deleteRow={this.deleteRow} handleFormSubmit={this.handleFormSubmit}/>):null}  
    
     </form>
      </div>
    </div>
     
    );
  }
}

export default App;
