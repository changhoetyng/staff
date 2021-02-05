import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import Button from "react-bootstrap/Button";
import FullPageLoader from "../hooks/FullPageLoader";
import "../css/Setting.css";
import Card from "react-bootstrap/Card";
import {api} from "../api/api" 
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";

class AddSubcategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
          history: this.props.history,
          facilityId: "601d1e8ea8f1461ec0ced6a6",
          subCategory: "",
          facilityname: "",
          data:[],
          loading: false,
        };
    }

    /*async componentDidMount() {
      this.setState({ loading: true });
      await api
      .get("/sportComplex/getSub")
      .then((res)=> {
        console.log(res.data)
        this.setState({data: res.data})
      })
      .catch((err)=> {
        console.log(err)
      })
      this.setState({ loading: false });
    }*/
    async componentDidMount() {
      this.setState({ loading: true });
      await api
        .get("/sportComplex/getFacility")
        .then((res) => {
          console.log(res.data.data)
          this.setState({ data: res.data.data});
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ loading: false });
    }
    /*async addfacility(){
      await api
      .post("/sportComplex/addFacility",{
        name: this.state.facilityname,
      })
      .then((res)=> {
        alert("YES!");
        this.setState({data: [res.data, ...this.state.data.data]})
      })
      .catch((err)=> {
        console.log(err)
      })
    }*/

    async addsubcategory(){
      this.setState({loading:true});
      
      await api
      .patch("/sportComplex/addSub",{
        facilityId: this.state.facilityId,
        subCategory: this.state.subCategory,       
      })
      .then((res)=> {
        alert("Successful!");
        this.setState({data: [res.data, ...this.state.data]});
      })
      .catch((err)=> {
        alert(err);
        console.log(err);
      })
      //this.componentDidMount();
      this.setState({loading:false});
    }

    render() {
        return (
          <div>
            {this.state.loading && <FullPageLoader />}
            <Header history={this.state.history} />
            <div className="container float-left">
              <h2>Add Subcategory</h2>

                <div style={{ marginTop: 20 }}>
                  <h4>Sport Complex</h4>
                  <div className="container float-left">
                    <div className="row">
                      <p className="word">Badminton Court</p>
                    </div>
                    <div className="row" style={{ marginBottom: 20 }}>
                    {this.state.data.map((v,i) => {
                      return(
                      <div className="col" key={i}>
                        {console.log(v)}
                      <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap'}}>
                        <Card.Body>
                          <Card.Title>{v.facilityId}</Card.Title>
                          {v.subCategory && v.subCategory.map((sub,i) => {
                            return(
                            <div>
                            <Card.Text>{sub.subName}</Card.Text>
                            <Card.Text>{sub._id}</Card.Text>
                            </div>
                            )
                          })}
                          <Card.Text>
                            {v.facility}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      </div>
                    )
                    })}
                  </div>
                    <div className="row,container float-left">
                      <div className="row">
                        <p className="word">Add Subcategory:</p>
                        <div className="col">
                          <input 
                            type="text" 
                            value={this.state.subCategory}
                            onChange={(e) => this.setState({ subCategory: e.target.value })}/>
                        </div>
                        <div className="col">
                          <Button onClick={() => this.addsubcategory()}>Add</Button>
                        </div>
                        <div className="col">
                          <input 
                            type="text" 
                            value={this.state.facilityname}
                            onChange={(e) => this.setState({ facilityname: e.target.value })}/>
                            <Button onClick={() => this.addfacility()}>AddF</Button>
                        </div>
                      </div>
                    </div>
                  </div>   
                </div>

            </div>            
          </div>
        );
      }
}

export default AddSubcategory;