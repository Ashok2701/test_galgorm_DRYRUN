import React, { Component } from "react";
import Select from "react-select";
import Alert from '../Panel/Alert';
import "flatpickr/dist/themes/material_green.css";
import MultiSelect from './MultiSelect';
import MultiRouteCode from './MultiRouteCode';
import { withNamespaces } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RouteScheduler from './RouteScheduler';
	import "../dashboard.scss";
import moment from 'moment';
import Confirm from './Confirm_Nav';
import {
  Container,
  Row,
  FormGroup,Input,
  Form
} from "reactstrap";
//import Info from './Info';


class SideNav extends React.Component {

    constructor(props) {
        super(props);
		  this.state = {
                 addvalidateconfirmShow: false,
                 addConfirmShow: false,
				   addAlertShow: false,
                             errorMessage: '',
                 msgtype : '',
                 ShowSelectionList : false,
                 confirmMessage: '',
                 documents : this.props.defaultprocessDocs,
                 sameVehicles : this.props.samevehicleChecked
                }
        this.onTagsChange = this.onTagsChange.bind(this);
    }
	
	 setSelectedRouteCodes = (val) => {
                 this.props.handleRouteCodeChange(val);
             }

               selectedRouteCodeArr = (val) => {
                             this.props.RouteCodeArr(val);
                         }

   setSelectedSites = (val) => {
          this.props.handleSiteChange(val);
      }

      selectedSitesArr = (val) => {
          this.props.sitesArr(val);
      }

    onTagsChange = (event, value) => {
        //this.props.handleSiteChange(value);
    }
    getRouteScheduler = (routesSchedule) => {
        this.props.getValuestoApp(routesSchedule)
    }


    onDateselection = (date) => {
     console.log("T11 inside dateselection",date);
     const Seldate = moment(date[0]).format('YYYY-MM-DD');
     console.log("T11 inside dateselection",Seldate);
         this.props.handleDateChange(Seldate);
    }


// Auto

 autoGeneratedRouteClick = ()=>{
      this.props.autoGenerateTrips();
  }


   OnSameVehcheckBoxChange = () => {
             console.log("T222 docpanel - to plan change");
                        this.setState({ sameVehicles: !this.state.sameVehicles });
                        this.props.OncheckedSameVehicles(!this.state.sameVehicles)
                    }



  autoResetRoutes = () => {
      this.props.autoResetTrips();
  }


 OnGroupLockingTrips = () => {
    this.props.grouplockTrips();

 }

   onConfirmNo = () => {
         console.log("inside confirm No");
        this.setState({
            addConfirmShow: false,
            msgtype : ''
        })
    }


    onConfirmClick = (type) => {
		 let tripsList = this.props.tripsPanel;

       var Validatecount = 0;
       var Lockcount = 0;
       var OptimisedTrips = 0;
       var DeletedCount = 0;
         var DocCount = 0;
     for(let jj=0 ; jj<this.props.dropsPanel.drops.length ; jj++) {
             let doc = this.props.dropsPanel.drops[jj];
             if((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8'))
             {
               DocCount = DocCount + 1;
             }
             }

        for(let jk=0 ; jk<this.props.dropsPanel.pickUps.length ; jk++) {
                let doc = this.props.dropsPanel.pickUps[jk];
                if((doc.type === 'open') && (doc.dlvystatus === '0' || doc.dlvystatus === '8'))
                {
                  DocCount = DocCount + 1;
                }
                }

       for(let i=0; i < tripsList.length ; i++) {
               var trip = tripsList[i];
                   if(trip.lock && !trip.tmsValidated) {
                     Validatecount = Validatecount + 1;
                   }
                    if(!trip.lock) {
                             Lockcount = Lockcount + 1;
                             DeletedCount  =DeletedCount + 1;
                            }
                 }

       console.log("T333 tripsList =", tripsList);
     
       let mess = "";
    if(type === '1') {

       if(DocCount > 0) {
       mess = 'Are you sure you want to confirm the Auto-Generate the Trips';
   this.setState({
                        addConfirmShow: true,
                        confirmMessage: mess,
                        msgtype : type,

                    })
       }
       else {
       this.setState({

                                                                                                                                errorMessage: 'No Documents are available for Trip Creation',
                                                                                                                                addAlertShow: true,
                                                                                                                                 })

       }
       }
      else if(type === '2') {

           if(Lockcount > 0)
           {
           mess = 'Are you sure you want to Lock all the unlocked Trips';
              this.setState({
                                   addConfirmShow: true,
                                   confirmMessage: mess,
                                   msgtype : type,

                               })
           }else {
  this.setState({

                                                                                                                         errorMessage: 'No Trips are available for Locking',
                                                                                                                         addAlertShow: true,
                                                                                                                          })
           }
           }

       else if(type === '3') {
          if(Validatecount > 0) {
           mess = 'Are you sure you want to Validate all the Non-Validated Trips.';
              this.setState({
                                   addConfirmShow: true,
                                   confirmMessage: mess,
                                   msgtype : type,

                               })
           }else {
  this.setState({

                                                                                                                         errorMessage: 'No Trips are available for Validation',
                                                                                                                         addAlertShow: true,
                                                                                                                          })
           }

              }
       else if(type === '4') {
                if(DeletedCount > 0) {
                         mess = 'Are you sure you want to Delete all the unlocked Trips';
                            this.setState({
                                                 addConfirmShow: true,
                                                 confirmMessage: mess,
                                                 msgtype : type,

                                             })
                         }
                 else {
                   this.setState({

                                                                                                                                          errorMessage: 'No Trips are available for Deletion',
                                                                                                                                          addAlertShow: true,
                                                                                                                                           })
                            }

                     }

    }



    onConfirmYes = (type) => {
       console.log("inside confirm YEs",type);
       if(type === '1') {
          this.autoGeneratedRouteClick();
       }
       else if(type === '2') {
          this.OnGroupLockingTrips();
       }
       else if(type === '3') {
           this.OnGroupValidateTrips();
       }
       else if(type === '4') {
         this.autoResetRoutes();
       }


     //   this.props.confirmTrip(this.state.currentTrip, 'Open');
        this.setState({
            addConfirmShow: false,
            msgtype : '',
        })
    }


 OnGroupValidateTrips = () => {

 this.props.onValidateAll();
/*
          this.setState({
              confirmMessage: this.props.t('AllValidate'),
              addvalidateconfirmShow: true,
          });
*/

      }
 onGroupValidateNo = () => {
         this.setState({
             addvalidateconfirmShow: false
         })
     }

 onGroupValidateYes = () => {

       this.props.onValidateAll();
       console.log("GV - Yes confirm for group Valdiation");
         this.setState({
             addvalidateconfirmShow: false
         })
     }

  handleDocProcessChange = (event) => {
    console.log("Changed Value =",event.target.value);
    this.props.onDocProcessChange(event.target.value);
    this.setState({
      documents : event.target.value
    })
  }




    render() {
        let optionItems = [];
        var optionSelected = {};
        var selectedSite = {};
		 let addAlertClose = () => this.setState({ addAlertShow: false });
        let optionRouteCodeItems = [];
        var optionSelectedRouteCode = {};
        var selectedRouteCode = {};
        var placeHolder = "All";
        this.props.sites && this.props.sites.length > 0 && this.props.sites.map((site) => {
            if (site.id == this.props.selectedSite) {
                selectedSite = site;
                placeHolder = site.value;
                optionSelected.value = site.id;
                optionSelected.label = (site.value + "(" + site.id + ")");
            }
            optionItems.push({ value: site.id, label: (site.value + "(" + site.id + ")") })
        });
		  this.props.routecodes && this.props.routecodes.length > 0 && this.props.routecodes.map((routecode) => {
                                    if (routecode.routeNo == this.props.selectedRouteCode) {
                                        selectedRouteCode = routecode;
                                        placeHolder = routecode.routeDesc;
                                        optionSelected.value = routecode.routeNo;
                                        optionSelected.label = (routecode.routeDesc);
                                    }
                                    optionRouteCodeItems.push({ value: routecode.routeNo, label: (routecode.routeDesc) })
                                });

        return (
             <>
                <Form className="row_nav" >
                              <FormGroup className="select2-container mb-0 col-md-2 col-lg-2 col-xl-2">
                              <MultiSelect
                                 setSelectedSites={this.setSelectedSites}
                                 selectedSitesArr={this.selectedSitesArr}
                                 options={optionItems} />

                              </FormGroup>

                              <FormGroup className="Select2-date p-3 ml-5 col-md-2 col-lg-2 col-xl-2">
                                <span>Date </span>

                                <Flatpickr
                                  className="form-control"
                                  dateformat= "Y-m-d"
                                  value={this.props.selectedDate}
                                  onChange={this.onDateselection}
                                />
                              </FormGroup>
                              &emsp;
                              <div className="refreshbtn">

                              <Tooltip title="Refresh">
                               <SyncRoundedIcon color="primary" style={{fontSize:"28"}} onClick = {() => this.props.refreshAllPanels() }/>
                              </Tooltip>
                              </div>
                              <div style={{ display: this.props.vehicleShow}} >
							   <FormGroup className="select2-container mb-0 col-md-2 col-lg-2 col-xl-2">
                                                                                          <MultiRouteCode
                                                                                             setSelectedRouteCodes={this.setSelectedRouteCodes}
                                                                                             selectedRouteCodeArr={this.selectedRouteCodeArr}
                                                                                             options={optionRouteCodeItems} />
                                                                                          </FormGroup>
                               </div>
						{this.props.autoflg &&	   
							   <div className="SideNav_Btns"
                                                                          style={{
                                                                            alignSelf:"center",
                                                                            justifyContent: "space-between",
                                                                            display: this.props.vehicleShow
                                                                         }}
                                                                        >
                              <button type="button" class="btn btn-success"  onClick={() => this.onConfirmClick('2')}>{this.props.t('GROUP LOCK')}</button>
                                                                         <button type="button" class="btn btn-primary" onClick={() => this.onConfirmClick('3')}>{this.props.t('GROUP VALIDATE')}</button>


                                                                        <button type="button" class="btn btn-info " onClick={() => this.onConfirmClick('1')}>{this.props.t('AUTO - GENERATE ROUTE')}</button>
                                                                         <button type="button" class="btn btn-dark " onClick={() => this.onConfirmClick('4')}>{this.props.t('RTZ')}</button>

                                                                         <>  <span style={{fontSize : '16px', fontWeight: 'bold'}}>Max Stops : </span>  <input style={{width: 50,height: '40px',fontSize :"16px", fontWeight: 'bolder' }} type="text" onChange={this.handleDocProcessChange} value={this.state.documents} /> </>
                                                                           <Input style={{width: 100,height: '30px'}}
                                                                                              type="checkbox"
                                                                                               onChange = {()=>this.OnSameVehcheckBoxChange()}
                                                                                               checked={this.state.sameVehicles}

                                                                                            />&emsp;  &emsp; &emsp;
                                                                            <span style={{fontSize : '16px', fontWeight: 'bold'}}>Incremental Routes </span>
                               </div>
						}
                              <div style={{ display: this.props.vrShow, width:"60%" , alignSelf:"center"}}  >
                              <ul className="list-unstyled CTAs" style={{float:"center"}} >
                                                      <li>
                                                          <button type="button"
                                                             class="btn btn-primary"
                                                              style={{ display: this.props.vrShow }}
                                                              onClick={() => this.props.onVRhide()}>
                                                              <span>{this.props.t('Back')}</span>
                                                          </button>
                                                      </li>
                                                  </ul>
                              </div>
                            </Form>
							 <Confirm
                                        show={this.state.addConfirmShow}
                                        onHide={this.onConfirmNo}
                                        confirmMessage={this.state.confirmMessage}
                                        confirmYes = {this.onConfirmYes}
                                        messageType = {this.state.msgtype}
                                    ></Confirm>
							 <Alert
                                                  show={this.state.addAlertShow}
                                                  onHide={addAlertClose}
                                                  errorMessage={this.state.errorMessage}
                                              ></Alert>

            </>
        );
    }
}

export default  withNamespaces()(SideNav);