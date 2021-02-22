import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FullPageLoader from "../../hooks/FullPageLoader";
import Header from "../../sharedComponent/Header";
import "../../css/Setting.css";
import {api} from "../../api/api" 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class AddSubcategory extends Component{
    constructor(props) {
        super(props);
        this.state = {
          history: this.props.history,
          currentSelection: null,
          currentRoomId: null,
          subCategory: "",
          data:[],
          loading: false,
        };
    }

    async componentDidMount() {
      this.setState({ loading: true });
      await api
        .get("/room/getRoom")
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
      this.setState({ currentSelection: selected, currentRoomId: id });
    }

    renderRoomButton() {
      return (
        <DropdownButton
          id="dropdown-item-button"
          title={
            this.state.currentSelection
              ? this.state.currentSelection
              : "Select a Room"
          }
        >
          {this.state.data.map((v, i) => {
            return (
              <Dropdown.Item
                key={i}
                as="button"
                onSelect={() => this.dropdownSelection(v.room, v.roomId)}
              >
                {v.room}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      );
    }

    renderTableContent() {
      let selectedRoom = this.state.data.find(
        (v) => v.roomId === this.state.currentRoomId 
      );
      let subCategory = selectedRoom ? selectedRoom.subCategory : [];
      return (
        <div className="row">
        {subCategory && subCategory.map((sub,i) => {
          return(
            <div className="col" key={i}>             
              <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap', paddingRight: 0}}>
                <Card.Body>
                  <Row>
                    <Col sm={8}><Card.Text>{sub.subName}</Card.Text></Col>
                    <Col><Card.Link style={{cursor: 'pointer'}} onClick = {() =>{this.removesubcategory(sub._id)} } >Remove</Card.Link></Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          )
        })} 
        </div>    
        );       
    }

    async removesubcategory(subId){
      this.setState({loading:true});

      await api
      .patch("/room/deletesub",{
        roomId: this.state.currentRoomId,
        subCategoryId: subId      
      })
      .catch((err)=> {
        alert(err);
        console.log(err);
      }) 
      this.componentDidMount();
      this.setState({loading:false});
    }

    async addsubcategory(){
      this.setState({loading:true});

      await api
      .patch("/room/addSub",{
        roomId: this.state.currentRoomId,
        subCategory: this.state.subCategory,       
      })
      .catch((err)=> {
        alert(err);
        console.log(err);
      })
      this.componentDidMount();
      this.setState({loading:false, subCategory: ""});
    }

    render() {
        return (
          <div>
            {this.state.loading && <FullPageLoader />}
            <Header history={this.state.history} />
            <div className="container float-left">
              <h2>Add Subcategory</h2>

                <div style={{ marginTop: 20 }}>
                  <h4>Room</h4>
                  <div className="container float-left">
                    <div className="row" style={{marginTop: 20}}>
                      {this.renderRoomButton()}
                    </div>
                    <div className="row" style={{ marginBottom: 20, marginTop: 20 }}>
                    {this.renderTableContent()}
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