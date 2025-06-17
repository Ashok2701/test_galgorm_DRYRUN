import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import {withTranslation} from 'react-i18next';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardHeader,
  Form, FormGroup,
  Col,
  Container,
  Input,
  Label,
  Row
} from "reactstrap";


import moment from 'moment';

class LVSAllocationDetail extends React.Component {

constructor(props)
{
  super(props);
}



    render() {
    //   console.log("allocation data", this.props.toAllocationDataList);

    console.log(this.props.toAllocationDataList ,"this is allocaiton list checking here")

           return (
              <Modal className="LvsModalscreen"
                     {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                   <Modal.Header style={{backgroundColor : "currentColor"}}>
                                                   <Modal.Title className="h4 mb-0" style={{ color : "#fff"}} >
                                                        Allocation
                                                   </Modal.Title>
                                               </Modal.Header>
                    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto', backgroundColor : "whitesmoke"}}>
<Row>
        <Col sm='12'>
          <Form >
          <Card>
                      <CardBody className="pt-1">
                                      <Row>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label >Vehicle Routing</Label>
                                           <Input
                                                                                        name='concode'
                                                                                        id='concode'
                                                                                        value={this.props.vrdata && this.props.vrdata.xnumpc}
                                                                                        disabled={true}
                                                                                      />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label>Delivery Date</Label>
                                             <Input
                                                                    name='concode'
                                                                    id='concode'
                                                                    value={this.props.vrdata && moment(this.props.vrdata.datliv).format('YYYY-MM-DD')}
                                                                    disabled={true}
                                                                  />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                                            <FormGroup>
                                                              <Label>Site</Label>
                                                               <Input
                                                                                      name='concode'
                                                                                      id='concode'
                                                                                      value={this.props.vrdata && this.props.vrdata.fcy + "-" + this.props.vrdata.siteName }
                                                                                      disabled={true}
                                                                                    />
                                                            </FormGroup>
                                                          </Col>
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label >Vehicle</Label>
                                            <Input
                                              name='concode'
                                              id='concode'
                                              value={this.props.vrdata && this.props.vrdata.codeyve}
                                              disabled={true}
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col md='4' sm='12'>
                                                                                  <FormGroup>
                                                                                    <Label >Driver</Label>
                                                                                    <Input
                                                                                      name='concode'
                                                                                      id='concode'
                                                                                      value={this.props.vrdata && this.props.vrdata.driverid +'-'+ this.props.vrdata.drivername }
                                                                                      disabled={true}
                                                                                    />
                                                                                  </FormGroup>
                                                                                </Col>
                                         <Col md='4' sm='12'>
                                                                                                                          <FormGroup>
                                                                                                                            <Label >Status</Label>
                                                                                                                            <Input
                                                                                                                              name='concode'
                                                                                                                              id='concode'
                                                                                                                              value={this.props.vrdata && this.props.vrdata.allocationflg === 2 ? 'ALLOCATED' : 'NOT ALLOCATED' }
                                                                                                                              disabled={true}
                                                                                                                           //  style = {{ backgroundColor = {this.props.vrdata && this.props.vrdata.allocationflg === 2 ? 'green' : 'lightgrey'}  }}
                                                                                                                            />
                                                                                                                          </FormGroup>
                                                                                                                        </Col>
                                      </Row>
                                              <Row>
                                                           <Col md="6" className="d-flex align-items-center">
                                                             <CardTitle className="h4 mb-0 text-primary">
                                                               Route Details
                                                             </CardTitle>
                                                           </Col>
                                </Row>
                                <br />
                                <Row>
                                   <div className="tablheight" style={{ width : "-webkit-fill-available"}}>
                                                              <table className="table table-striped m-0 tablewidth1200">
                                                                  <thead style={{backgroundColor : "currentColor"}}>
                                                                      <tr className="">
<th className="mb-0 h6 " style={{color : "white"}}>PickTicket Number</th>
<th className="mb-0 h6 " style={{color : "white"}}>Customer</th>
<th className="mb-0 h6 " style={{color : "white"}}>Customer Name</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Product</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Description</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Lot Number</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>PickTicket Quantity </th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>To Allocate Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Available Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Shortage Quantity</th>
                                                                          <th className="mb-0 h6 " style={{color : "white"}}>Allocation Status</th>
                                                                           <th style={{width : "10px"}}>Add Lot</th>
                                                                      </tr>
                                                                  </thead>
                                                                    <tbody>
                                                                           {(this.props.toAllocationDataList && this.props.toAllocationDataList.length > 0  &&this.props.toAllocationDataList || []).map((doc, i) => (

                                                                       <tr>
                                                                       <td>{doc.children[0].value}</td>
                                                                       <td>{doc.children[2].value}</td>
                                                                       <td>{doc.children[10].value}</td>
                                                                       <td>{doc.children[3].value}</td>
                                                                                                                                              <td>{doc.children[4].value}</td>
                                                                                                                                              <td></td>
                                                                                                                                              <td>{doc.children[5].value}</td>
                                                                                                                                              <td>{doc.children[5].value}</td>
                                                                                                                                              <td>{doc.children[6].value}</td>
                                                                                                                                           <td>{doc.children[8].value}</td>
                                                                                                                                           <td>{doc.children[9].value}</td>
                                                                        <td ><Button style={{width : "80px"}}>Add Lot</Button></td>

                                                                      </tr>
                                                                      ))}
                                                                    </tbody>
                                                              </table>
                                   </div>
                                </Row>

                                          </CardBody>
                      </Card>
                      </Form>
                                          </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor : "whitesmoke"}}>
                     { this.props.vrdata.allocationflg === 0 &&
                     <Button onClick={this.props.SubmitforAllocation}>Allocate</Button>
                     }
                      <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                );
        }

}
export default LVSAllocationDetail;