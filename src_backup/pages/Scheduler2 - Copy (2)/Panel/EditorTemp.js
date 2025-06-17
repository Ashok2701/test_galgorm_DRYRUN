import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

import DisplayProducts from './DisplayProducts';

class EditorTemp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addProductShow: false,
      addInfoShow: false,
      products: [],
      docNumber: "",
      doctype: "",
      logisticDetails: '',
    };
  }


  displayDropStatus = (x) => {
    const dlvyStatus = x

    if (dlvyStatus == '1') {
      return (
        <h6>
          <span class='badge badge-success text-uppercase'>Scheduled</span>
        </h6>
      );
    }
    if (dlvyStatus == '2') {
      return (
        <h6>
          <span class='badge badge-primary text-uppercase'>OntheWay</span>
        </h6>
      );
    }
    if (dlvyStatus == '3') {
      return (
        <h6>
          <span class='badge badge-warning text-uppercase'>InProgress</span>
        </h6>
      );
    }
    if (dlvyStatus == '4') {
      return (
        <h6>
          <span class='badge badge-success text-uppercase'>Completed</span>
        </h6>
      );
    }
    if (dlvyStatus == '5') {
      return (
        <h6>
          <span class='badge badge-danger text-uppercase'>Skipped</span>
        </h6>
      );
    }
    if (dlvyStatus == '6') {
      return (
        <h6>
          <span class='badge badge-dark text-uppercase'>Rescheduled</span>
        </h6>
      );
    }
    if (dlvyStatus == '7') {
      return (
        <h6>
          <span class='badge badge-danger text-uppercase'>Canceled</span>
        </h6>
      );
    }
  }


  GetDeliveryStatus = (x) => {


    switch (x) {
      case '1':
        return ("Scheduled");
      case '2':
        return ("On the Way");
      case '3':
        return ("In-progress");
      case '4':
        return ("Completed");
      case '5':
        return ("Skipped");
      case '6':
        return ("Re-Scheduled");
      case '7':
        return ("Cancelled");
      case '8':
        return ("To-Plan");
      default:
        return ("To-Plan");
    }


  }

  getDocink = (tripData) => {
    console.log("getDoclink = ", tripData);
    var url = "";
    var content;
    if (tripData.doctype == 'PRECEIPT') {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESXX10CPTH/2//M/` + tripData.docnum;
      return (<a name="Subject" className="e-field e-input" target="_blank" href={url}><span style={{ color: 'black', fontSize: '14px' }}>{tripData.docnum}</span></a>
      );
    }
    else if (tripData.doctype == 'DLV') {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESSDH/2//M/` + tripData.docnum;
      return (<a name="Subject" className="e-field e-input" target="_blank" href={url}><span style={{ color: 'black', fontSize: '14px' }}>{tripData.docnum}</span></a>
      );
    }
    else if (tripData.doctype == 'PICK') {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESPRH2/2//M/` + tripData.docnum;
      return (<a name="Subject" className="e-field e-input" target="_blank" href={url}><span style={{ color: 'black', fontSize: '14px' }}>{tripData.docnum}</span></a>
      );
    }
    else if (tripData.doctype == 'MISCPICK') {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESXX10CMIS/2//M/` + tripData.docnum;
      return (<a name="Subject" className="e-field e-input" target="_blank" href={url}><span style={{ color: 'black', fontSize: '14px' }}>{tripData.docnum}</span></a>
      );
    }
    else {
      url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESFCY/2//M/` + tripData.docnum;
      return '';
    }

  }

  onDocClick = (product, docNum, doctype) => {
    const products = product;
    // setTomTomNotification(true)
    this.setState({
      addProductShow: true,
      products: products,
      docNumber: docNum,
      doctype: doctype
    });
  }


  render() {
    let addProductsClose = () => this.setState({ addProductShow: false });

    var tripData = this.props.SelectedDocData;
    console.log("data inside edtiort = ", this.props.SelectedTripData);
    const vr_url = `${process.env.REACT_APP_X3_URL}/$sessions?f=GESXX10CPLC/2//M/` + tripData.vrcode;


    return (
      <div className="EditTemp-main">

        <table
          className="custom-event-editor"
          style={{ width: '100%', cellpadding: '5' }}
        >
          <tbody>
            <tr>
              <td className="e-textlabel">Document Number</td>
              <td style={{ colspan: '4' }}>
                {this.getDocink(tripData)}
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Route Number</td>
              <td style={{ colspan: '4' }}>
                <a name="Subject" className="e-field e-input" target="_blank" href={vr_url}><span style={{ color: 'black', fontSize: '14px' }}>{tripData.vrcode}</span></a>

              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Client</td>
              <td style={{ colspan: '4' }}>
                <span style={{ color: 'black', fontSize: '14px' }}>{tripData.bpcode} - {tripData.bpname}</span>
              </td>
            </tr>

            <tr>
              <td className="e-textlabel">Client Address</td>
              <td style={{ colspan: '4' }}>
                <input
                  id="routeid"
                  className="e-field e-input"
                  type="text"
                  value={tripData.city}
                  name="Subject"
                  style={{ width: '100%' }}

                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Vehicle</td>
              <td style={{ colspan: '4' }}>
                <input
                  id="vehicle"
                  className="e-field e-input"
                  type="text"
                  value={tripData.vehicleCode}
                  name="Subject"
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Driver</td>
              <td style={{ colspan: '4' }}>
                <input
                  id="driver"
                  className="e-field e-input"
                  type="text"
                  value={tripData.drivercode}
                  name="Subject"
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td className="e-textlabel">Status</td>
              <td style={{ colspan: '4' }}>
                {this.displayDropStatus(tripData.dlvystatus)}

              </td>
            </tr>
            <tr>
              <td className="e-textlabel">StartTime - EndTime</td>
              <td style={{ colspan: '4' }}>
                <span style={{ color: 'black', fontSize: '14px' }}>{tripData.arvtime} - {tripData.deptime}</span>

              </td>
            </tr>
            <tr>
              <td className="e-textlabel"></td>
              <td style={{ colspan: '4' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => this.onDocClick(tripData.products, tripData.docnum, tripData.doctype)}><u>Product-Details</u></span>


              </td>
            </tr>
          </tbody>
        </table>
        <div style={{}}>
          <Button className="btn-close" onClick={this.props.onClose}>Close</Button>
        </div>
        <DisplayProducts
          show={this.state.addProductShow}
          onHide={addProductsClose}
          products={this.state.products}
          docNum={this.state.docNumber}
          doctype={this.state.doctype}
        ></DisplayProducts>
      </div>
    );
  }
}
export default EditorTemp;