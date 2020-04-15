import './Teamtable.css';
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

class Teamtable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'POC ID', field: 'pocId' },
          { title: 'Team', field: 'team' },
          { title: 'POC Description', field: 'pocDesc' },
          { title: 'Wiki Link', field: 'wikiLink' },
          {
            title: 'Status',
            field: 'status',
            lookup: { 'New Idea': 'New Idea', 'Shortlisted': 'Shortlisted', 'InProgress': 'In Progress', 'Blocked': 'Blocked', 'Completed': 'Completed', 'Demo Shown to Customer': 'Demo Shown to Customer' },
          },
          { title: 'Remarks', field: 'remarks' }
        ],
        data: []
        }
    }
    
    static getDerivedStateFromProps(nextProps){
      let teamdata = []
      nextProps.data.forEach((teams) => {
                 teamdata.push(teams)  
               })      
      return {data:teamdata}
    }

// onRowAdd = async(newData) =>{
//     console.log(newData)
//     console.log("data1"+JSON.stringify(this.state.data))
//         await this.addData(newData)
//         console.log("inside1");
//         let url = "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+this.props.value
//         let dataRes =await this.getData(url)
//         console.log("inside2");
//         this.setState({ data: dataRes })
//         this.setState((prevState) => {
//             const data = [...prevState.data];
//             data.push(newData);
//             return { ...prevState, data };
//         });
//     console.log("datares"+JSON.stringify(newData))
//     // console.log("datares"+JSON.stringify(dataRes))
//     console.log("datares"+JSON.stringify(this.state.data))

// }
    addData = (data)=>{  
        let formData = {...data,team:this.props.value}
       let url = "https://pocnodebby.herokuapp.com/poc/v1/addPoc/"+this.props.value
      return axios.post(url,formData)    
}
    render(){
        return (
            <MaterialTable
            title=""
            columns={this.state.columns}
            data={this.state.data}
            editable={{ 

                onRowAdd: (newData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    console.log(newData)
                    this.addData(newData)
                    this.setState((prevState) => {
                        const data = [...prevState.data];
                        console.log("1",data)
                        data.push(newData);
                        console.log("1",data)
                        return { ...prevState, data };
                    });
                    }, 600);
                }),

               // onRowAdd:  this.onRowAdd,
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    if (oldData) {
                        this.setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                        });
                    }
                    }, 600);
                }),
                onRowDelete: (oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                    }, 600);
                }),
            }}
            />
        );
    }
}
  
export default Teamtable