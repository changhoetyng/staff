import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FullPageLoader from "../hooks/FullPageLoader";
import Header from "../sharedComponent/Header";
import "../css/Setting.css";
import {api} from "../api/api" 

class AddSubcategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
          history: this.props.history,
          currentSelection: null,
          currentFacilityId: null,
          subCategory: "",
          data:[],
          loading: false,
        };
    }

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

    dropdownSelection(selected, id) {
      this.setState({ currentSelection: selected, currentFacilityId: id });
    }

    renderFacilityButton() {
      return (
        <DropdownButton
          id="dropdown-item-button"
          title={
            this.state.currentSelection
              ? this.state.currentSelection
              : "Select a facility"
          }
        >
          {this.state.data.map((v, i) => {
            return (
              <Dropdown.Item
                key={i}
                as="button"
                onSelect={() => this.dropdownSelection(v.facility, v.facilityId)}
              >
                {v.facility}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      );
    }

    renderTableContent() {
      let selectedFacility = this.state.data.find(
        (v) => v.facilityId === this.state.currentFacilityId 
      );
      let subCategory = selectedFacility ? selectedFacility.subCategory : [];
      return (
        <div className="row">
        {subCategory && subCategory.map((sub,i) => {
          return(
            <div className="col" key={i}>             
              <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap'}}>
                <Card.Body>
                  <Card.Text>{sub.subName}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        })} 
        </div>    
        );       
    }

    async addsubcategory(){
      this.setState({loading:true});

      await api
      .patch("/sportComplex/addSub",{
        facilityId: this.state.currentFacilityId,
        subCategory: this.state.subCategory,       
      })
      .then((res)=> {
        this.setState({data: [res.data, ...this.state.data]});
      })
      .catch((err)=> {
        alert(err);
        console.log(err);
      })
      this.componentDidMount();
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
                      {this.renderFacilityButton()}
                      <p className="word">Badminton Court</p>
                    </div>
                    <div className="row" style={{ marginBottom: 20 }}>
                    {this.renderTableContent()}
                    {/* {this.state.data.map((v,i) => {
                      return(
                      <div className="col" key={i}>
                        {console.log(v)}
                      <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap'}}>
                        <Card.Body>
                          <Card.Title>{v.facility}</Card.Title>
                          {v.subCategory && v.subCategory.map((sub,i) => {
                            return(
                            <div>
                            <Card.Text>{sub.subName}</Card.Text>
                            </div>
                            )
                          })}
                        </Card.Body>
                      </Card>
                      </div>
                    )
                    })} */}
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