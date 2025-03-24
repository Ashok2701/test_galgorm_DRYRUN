import React from 'react';
import moment from 'moment';
import Alert from './Alert';
import LockConfirm from './LockConfirm';
import UnlockConfirm from './UnlockConfirm';
import OptimiseConfirm from './OptimiseConfirm';
import InfoIcon from '@mui/icons-material/Info';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DeleteConfirm from './DeleteConfirm';
import ConfirmWarningText from './ConfirmWarningText';
import ValidateConfirm from './ValidateConfirm';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import RouteIcon from '@mui/icons-material/Route';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import StartIcon from '@mui/icons-material/Start';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import '../dashboard.scss';
import WarningIcon from '@mui/icons-material/Warning';
import NonValidateConfirm from './NonValidateConfirm';
import DisplayLoaderNotes from './DisplayLoaderNotes'
import GroupValidateConfirm from './GroupValidateConfirm';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Checkbox from "@material-ui/core/Checkbox";
import LockRounded from '@material-ui/icons/LockRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import DisplayEquipments from './DisplayEquipments';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DisplayTripLogs from './DisplayTripLogs';
import DisplayTrailers from './DisplayTrailers';
import { withNamespaces } from 'react-i18next';
import SvgIcon from '@material-ui/core/SvgIcon';
import { convertHrToSec, convertSecToHr, convertMinToSec, formatTime, nullAndNanChecking, splitTime, formatHrMin, convertMinToHr, } from '../converterFunctions/converterFunctions';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    ButtonGroup,
    Button,
    Input,
    Label,
    FormGroup,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
} from "reactstrap";

class TripsList3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addConfirmShow: false,
            addEquipmentShow: false,
            showLogs: false,
            addTrailShow: false,
            addAlertShow: false,
            errorMessage: '',
            loader: false,
            setOptimizationFailedStatus: false,
            setHr: 0,
            setMin: 0,
            setLoadHrs: '',
            setUnLoadHrs: '',
            setCurrency: '',
            setDistunts: '',
            setVolunits: '',
            setMassunit: '',
            setDistErrorMessage: '',
            setTimeErrorMessage: '',
            setTripsClosedErrorMessage: '',
            setTripClosedError: false,
            setDistError: false,
            setTimeError: false,
            setOptimizationMessage: '',
            setOptiStatusError: false,

            error: false,
            index: -1,
            docnum: '',
            warningText: '',
            tripcode: '',
            confirmMessage: '',
            addWarningAlertShow: false,
            equipments: [],
            logs: [],
            trailers: [],
            lockButton: false,
            addunlockconfirmShow: false,
            addoptimiseconfirmShow: false,
            addvalidateconfirmShow: false,
            addNonvalidateconfirmShow: false,

            addDeleteconfirmShow: false,
            enableValidateAll: false,
            anchorEl: null,
            enableDocumnetMsgWindow: false,
            Seletedtripindex: '',
            loaderMessage: '',


        };
    }


    OnDisputeValidateTrip = (index) => {
        this.setState({
            confirmMessage: this.props.t('Confirm_validation_rollback'),
            addNonvalidateconfirmShow: true,
            index: index,
        });
    }

    onNonValidateNo = () => {
        this.setState({
            addNonvalidateconfirmShow: false
        })
    }

    onNonValidateYes = (index) => {
        this.props.Nonvalidate(index)
        this.setState({
            addNonvalidateconfirmShow: false
        })
    }

    OnValidateTrip = (index) => {
        this.setState({
            confirmMessage: this.props.t('Validconfirm'),
            addvalidateconfirmShow: true,
            index: index,
        });
    }

    onValidateNo = () => {
        this.setState({
            addvalidateconfirmShow: false
        })
    }

    onValidateYes = (index) => {
        this.props.validate(index)
        this.setState({
            addvalidateconfirmShow: false
        })
    }

    OnGroupValidateTrips = () => {
        this.setState({
            confirmMessage: this.props.t('AllValidate'),
            addvalidateconfirmShow: true,

        });
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


    onWaringAlertClick = (tripcode, i, warningnotes) => {
        this.setState({
            confirmMessage: 'Can we Turn off the Alert Warning',
            addWarningAlertShow: true,
            tripcode: tripcode,
            index: i,
            warningText: warningnotes,
        });

    }


    onConfirmWarningClose = (i, tripnum) => {
        this.props.onWarningAlertOff(i, tripnum);
        console.log("Warning alert close confirmed");
        this.setState({
            addWarningAlertShow: false
        })
    }


    onOptimiseConfirm = (trip, index, opti, lock) => {
        console.log("T000 trip =", trip);
        console.log("T000 index =", index);
        console.log("T000 opti =", opti);
        console.log("T000 lock =", lock);

        if (trip.driverId.length > 1) {

            if (lock) {

                this.setState({
                    errorMessage: 'Trip is Locked, cant optmise',
                    addAlertShow: true
                });
            }
            else {

                if (opti === 'Optimized') {
                    this.setState({
                        confirmMessage: 'Already Trip is Optimised. Do you want to Optimise Again ?',
                        addoptimiseconfirmShow: true,
                        index: index,
                    });

                }

                else {
                    this.setState({
                        confirmMessage: 'Confirm, Do you want to optimise the trip ?',
                        addoptimiseconfirmShow: true,
                        index: index,
                    });
                }
            }
        }
        else {
            this.setState({
                errorMessage: 'Driver is Empty, Please add Driver to the trip',
                addAlertShow: true
            });
        }
    }

    onOptimiseNo = () => {
        console.log("TSSS at Trips - optimise confirm No");
        this.setState({
            addoptimiseconfirmShow: false
        })
    }

    onOptimiseYes = (index) => {
        console.log("TSSS at Trips - optimise confirm Yes");
        var trips = this.props.tripsList;
        var clickedTrip = trips[index];
        //clickedTrip.timelineInterval = trips[index].totalObject.timelineInterval;
        this.tempOptimizeRoute(clickedTrip, index);
        this.setState({
            addoptimiseconfirmShow: false
        })
    }


    loadingSecs = (hr, min, loadingHrs) => {
        if (loadingHrs) {
            return formatTime(convertHrToSec(hr) + convertMinToSec(min) + convertHrToSec(loadingHrs));
        } else {
            return formatTime(convertHrToSec(hr) + convertMinToSec(min));
        }
    }

    optimizeRoute = (data, SeletedI) => {

        console.log("T6565 data =", data);

        console.log("T000 props data", data);
        let siteLat;
        let siteLang;
        let distanceCost = 0;
        let timeCost = 0;
        let totalCost = 0;
        let Regularcost = 0;
        let overtimecost = 0;
        let c, d, m, v;
        let arrSiteLat, setHandleDateChange;
        let arrSiteLang, setEndTime, setTotalTime, setTotalDistance, unLoadHrs, loadHrs;
        let setHr = 0, setMin = 0, setLoadHrs = '', setUnLoadHrs = '', setCurrency = '', setDistunts = '';
        let setVolunits = '', setMassunit = '', setDistErrorMessage = '', setTimeErrorMessage = '', setTripsClosedErrorMessage = '', setTripClosedError = false;
        let setDistError = false, setTimeError = false, setOptimizationMessage = '', setOptiStatusError = false;

        this.props.sites.map((site) => {
            if (data.depSite === site.id) {
                siteLat = site.lat;
                siteLang = site.lng;
            }
            if (data.arrSite === site.id) {
                arrSiteLat = site.lat;
                arrSiteLang = site.lng;
            }
        })


        let apiurl;
        let jsonUrl;
        apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
        jsonUrl = `/json?computeBestOrder=false&routeRepresentation=summaryOnly&computeTravelTimeFor=all&routeType=shortest&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${data.vehicleObject.maxspeed}&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${((data.vehicleObject.length) / 100)}&vehicleWidth=${((data.vehicleObject.width) / 100)}&vehicleHeight=${((data.vehicleObject.heigth) / 100)}&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;



        let prevTripsDist = 0;
        let prevTripsTime = 0;
        var summaryData = [];
        var optiindex = [];
        let serviceTime = [];
        let waitingTime = [];
        let lanLat = siteLat + ',' + siteLang;
        data.totalObject.selectedTripData.map((tripData) => {
            if (Object.keys(tripData).length > 0) {
                serviceTime.push(tripData.serviceTime);
                waitingTime.push(tripData.waitingTime);
                lanLat = lanLat + ':' + tripData.lat + ',' + tripData.lng;
            }
        });
        //change end depo lan n lat below siteLat + ',' + siteLang
        lanLat = lanLat + ':' + arrSiteLat + ',' + arrSiteLang
        let url = apiurl + encodeURIComponent(lanLat) + jsonUrl;

        console.log("T6565 URL after sites setting =", url);

        return fetch(url)
            .then(function (response) {
                if (response.status === 200) {
                    // this.setState({ loader: false });
                    return response.json()
                } else {
                    this.setState({ loader: false, setOptimizationFailedStatus: true });
                }
            }).then((res) => {
                console.log("T6565 auto - opti result", res);
                if (res && res.optimizedWaypoints) {
                    optiindex.push(res.optimizedWaypoints);
                }

                if (res && res.routes) {
                    summaryData.push(res.routes);
                }
                console.log("T6565  - opti result summary Data", summaryData);
                let summaryResult = { "summarydata": [...summaryData], "serviceTime": serviceTime, "waitingTime": waitingTime }
                if (summaryResult && summaryResult.summarydata && summaryResult.serviceTime && summaryResult.waitingTime) {
                    let summaryData = summaryResult.summarydata;
                    let serviceTime = summaryResult.serviceTime;
                    let waitingTime = summaryResult.waitingTime;
                    let results = summaryData[0];
                    console.log("T6565 after process  results =", results);
                    if (results) {
                        let legs = results[0].legs;
                        if (data && legs && data.stops < results[0].legs.length) {
                            let dateformatter = (date, index) => {
                                let d = date.toDateString()
                                let t = date.toTimeString()
                                t = t.split(" ")[0]
                                return d + " " + t;
                            }
                            let resultsData = [];
                            var departure = new Date();
                            let optimisedTrips = [];
                            this.props.tripsList.map((tripData) => {
                                if ((tripData.optistatus === 'Optimized' || tripData.optistatus === 'optimized') && tripData.itemCode !== data.itemCode) {
                                    optimisedTrips.push(tripData);
                                }
                            });
                            let currTripTimeHr = setHr;
                            let currTripTimeMin = setMin;
                            departure.setHours(Number(currTripTimeHr));
                            departure.setMinutes(Number(currTripTimeMin));
                            let sameTrips = [];
                            let startTimeInSec;
                            if (optimisedTrips.length > 0) {
                                optimisedTrips.map((optiTrip) => {
                                    if (optiTrip.code === data.code && optiTrip.docdate === data.docdate) {
                                        sameTrips.push(optiTrip);
                                    }
                                })
                            };
                            let previousCheck = [];
                            this.props.tripsList.map((tripPanel) => {
                                if (tripPanel.code === data.code && tripPanel.docdate === data.docdate) {
                                    if (tripPanel.trips === data.trips - 1) {
                                        previousCheck.push(tripPanel)
                                    }
                                }
                            })
                            let optimizationStatus = false;
                            if (previousCheck.length > 0) {
                                if (previousCheck[0].optistatus === 'Optimized') {
                                    optimizationStatus = false;
                                } else {
                                    optimizationStatus = true;
                                }

                            }

                        }
                    }
                }
            });

    }





    tempOptimizeRoute = (data, SeletedI) => {

        let passedData = data;
        this.setState({ loader: true });

        // pre process data before using in Optimisation
        let hr;
        let min;
        let loadingHrs;
        let unloadHrs;
        let loadingTime;
        let tripEndTime = [];
        let c, d, m, v;
        let date = new Date();
        console.log("T223 inside loading - vehiclepanel", this.props.vehiclePanel);
        this.props.vehiclePanel && this.props.vehiclePanel.vehicles.length > 0 && this.props.vehiclePanel.vehicles.map((vehicle) => {
            if (vehicle.codeyve === data.code) {
                console.log("T223 inside loading - vehiclepanel - matched", vehicle.codeyve);
                if (vehicle.starttime.includes(':')) {
                    hr = vehicle.starttime.split(':')[0];
                    min = vehicle.starttime.split(':')[1];
                } else if (vehicle.starttime.length === 4) {
                    hr = vehicle.starttime.substring(0, 2);
                    min = vehicle.starttime.substring(2, 4);
                }
                console.log("T223 inside use effct", hr + ' -' + min);
                loadingHrs = vehicle.startdepots;
                unloadHrs = vehicle.enddepotserv;
            }
        });
        hr = formatHrMin(parseInt(hr));
        min = formatHrMin(parseInt(min));
        if (data.optistatus === "Optimized" || data.optistatus === "optimized") {
            hr = data.startTime.split(':')[0];
            min = data.startTime.split(':')[1];
            loadingTime = this.loadingSecs(hr, min)
            console.log("T223 inside loading use effct not opti", loadingTime);
        } else {
            loadingTime = this.loadingSecs(hr, min, loadingHrs);
            console.log("T223 inside loading use effct opti", loadingTime);
        }

        //unit setting
        this.props.sites && this.props.sites.length > 0 && this.props.sites.map((site) => {
            console.log("2 set sites", site);
            if (data.depSite === site.id) {
                console.log("T223 inside loading site match")


                m = site.massunit;
                v = site.volunit;
                d = site.distunit;
                c = site.cur;

            }
        })

        let siteLat;
        let siteLang;
        let distanceCost = 0;
        let timeCost = 0;
        let totalCost = 0;
        let Regularcost = 0;
        let overtimecost = 0;

        let arrSiteLat, setHandleDateChange;
        let arrSiteLang, setEndTime, setTotalTime, setTotalDistance, loadHrs = loadingHrs;
        let setHr = hr, setMin = min, setCurrency = c, setDistunts = d;
        let setVolunits = v, setMassunit = m, setDistErrorMessage = '', setTimeErrorMessage = '', setTripsClosedErrorMessage = '', setTripClosedError = false;
        let setDistError = false, setTimeError = false, setOptimizationMessage = '', setOptiStatusError = false;

        this.props.sites.map((site) => {
            if (data.depSite === site.id) {
                siteLat = site.lat;
                siteLang = site.lng;
            }
            if (data.arrSite === site.id) {
                arrSiteLat = site.lat;
                arrSiteLang = site.lng;
            }
        })

        let apiurl;
        let jsonUrl;
        apiurl = 'https://api.tomtom.com/routing/1/calculateRoute/';
        jsonUrl = `/json?computeBestOrder=false&routeRepresentation=summaryOnly&computeTravelTimeFor=all&routeType=shortest&avoid=unpavedRoads&travelMode=truck&vehicleMaxSpeed=${data.vehicleObject.maxspeed}&vehicleWeight=${data.vehicleObject.capacities}&vehicleLength=${((data.vehicleObject.length) / 100)}&vehicleWidth=${((data.vehicleObject.width) / 100)}&vehicleHeight=${((data.vehicleObject.heigth) / 100)}&vehicleCommercial=true&vehicleLoadType=otherHazmatGeneral&vehicleEngineType=combustion&key=ctZzLlfGUpaNdfHiIobOeub8NBzzGkNG`;



        let prevTripsDist = 0;
        let prevTripsTime = 0;
        var summaryData = [];
        var optiindex = [];
        let serviceTime = [];
        let waitingTime = [];
        let lanLat = siteLat + ',' + siteLang;
        data.totalObject.selectedTripData.map((tripData) => {
            if (Object.keys(tripData).length > 0) {
                serviceTime.push(tripData.serviceTime);
                waitingTime.push(tripData.waitingTime);
                lanLat = lanLat + ':' + tripData.lat + ',' + tripData.lng;
            }
        });
        //change end depo lan n lat below siteLat + ',' + siteLang
        lanLat = lanLat + ':' + arrSiteLat + ',' + arrSiteLang
        let url = apiurl + encodeURIComponent(lanLat) + jsonUrl;
        return fetch(url)
            .then(function (response) {
                if (response.status === 200) {
                    // this.setState({ loader: false });
                    return response.json()
                } else {
                    this.setState({ loader: false, setOptimizationFailedStatus: true });
                }
            }).then((res) => {
                console.log("auto - opti result", res);
                if (res && res.optimizedWaypoints) {
                    optiindex.push(res.optimizedWaypoints);
                }

                if (res && res.routes) {
                    summaryData.push(res.routes);
                }
                console.log("T6565 1");
                let summaryResult = { "summarydata": [...summaryData], "serviceTime": serviceTime, "waitingTime": waitingTime }
                if (summaryResult && summaryResult.summarydata && summaryResult.serviceTime && summaryResult.waitingTime) {
                    let summaryData = summaryResult.summarydata;
                    let serviceTime = summaryResult.serviceTime;
                    let waitingTime = summaryResult.waitingTime;
                    let results = summaryData[0];
                    console.log("T6565 2");
                    if (results) {
                        let legs = results[0].legs;
                        if (data && legs && data.stops < results[0].legs.length) {
                            let dateformatter = (date, index) => {
                                let d = date.toDateString()
                                let t = date.toTimeString()
                                t = t.split(" ")[0]
                                return d + " " + t;
                            }
                            console.log("T6565 3");
                            let resultsData = [];
                            var departure = new Date();
                            let depsetHrs, depsetMin;
                            let optimisedTrips = [];
                            this.props.tripsList.map((tripData) => {
                                if ((tripData.optistatus === 'Optimized' || tripData.optistatus === 'optimized') && tripData.itemCode !== data.itemCode) {
                                    optimisedTrips.push(tripData);
                                }
                            });
                            let currTripTimeHr = setHr;
                            let currTripTimeMin = setMin;
                            console.log("T6565 setHr", setHr);
                            console.log("T6565 setMin", setMin);
                            departure.setHours(Number(currTripTimeHr));
                            departure.setMinutes(Number(currTripTimeMin));
                            let sameTrips = [];
                            let startTimeInSec;
                            if (optimisedTrips.length > 0) {
                                console.log("T6565 4");
                                optimisedTrips.map((optiTrip) => {
                                    if (optiTrip.code === data.code && optiTrip.docdate === data.docdate) {
                                        sameTrips.push(optiTrip);
                                    }
                                })
                            };
                            let previousCheck = [];
                            this.props.tripsList.map((tripPanel) => {
                                console.log("T6565 5");
                                if (tripPanel.code === data.code && tripPanel.docdate === data.docdate) {
                                    if (tripPanel.trips === data.trips - 1) {
                                        previousCheck.push(tripPanel)
                                    }
                                }
                            })
                            let optimizationStatus = false;
                            if (previousCheck.length > 0) {
                                console.log("T6565 6");
                                if (previousCheck[0].optistatus === 'Optimized') {
                                    optimizationStatus = false;
                                } else {
                                    optimizationStatus = true;
                                }
                            }

                            if (sameTrips.length > 0) {
                                console.log("T6565 7");
                                let sameTripTime = []
                                sameTrips.map((times, index) => {
                                    sameTripTime.push({ hr: times.endTime.split(":")[0], min: times.endTime.split(":")[1] })
                                });
                                sameTripTime.sort((a, b) => {
                                    return Number(b.hr) - Number(a.hr)
                                })
                                if (sameTripTime.length > 0) {
                                    currTripTimeHr = sameTripTime[0].hr;
                                    currTripTimeMin = sameTripTime[0].min;
                                    setHr = currTripTimeHr;
                                    setMin = currTripTimeMin;

                                    let sametripTime = formatTime(convertHrToSec(currTripTimeHr) + convertMinToSec(currTripTimeMin) + convertHrToSec(unloadHrs) + convertHrToSec(loadHrs))
                                    //departure.setHours(Number(currTripTimeHr) + 1);
                                    let sametripHrs = sametripTime.split(':')[0];
                                    let sametripMin = sametripTime.split(':')[1];
                                    if (Number(setHr) >= Number(sametripHrs)) {
                                        if (Number(setHr) == Number(sametripHrs) && Number(setMin) > Number(sametripMin)) {
                                            sametripHrs = setHr;
                                            sametripMin = setMin;
                                        } else if (setHr > sametripHrs) {
                                            sametripHrs = setHr;
                                            sametripMin = setMin;
                                        }
                                    }
                                    departure.setHours(Number(sametripHrs));
                                    departure.setMinutes(Number(sametripMin));
                                }
                                //need to check
                                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());

                            } else {
                                console.log("T6565 8");
                                startTimeInSec = convertMinToSec(departure.getMinutes()) + convertHrToSec(departure.getHours());
                            }
                            startTimeInSec = formatTime(startTimeInSec);
                            let startTimeHrs = startTimeInSec.split(':')[0];
                            let startTimeMins = startTimeInSec.split(':')[1];
                            departure.setHours(startTimeHrs);
                            departure.setMinutes(startTimeMins);


                            //  setHandleDateChange = departure;

                            let startTimeHr = departure.getHours();
                            let startTimeMin = departure.getMinutes();
                            let startTimeLocal = formatHrMin(startTimeHr) + ":" + formatHrMin(startTimeMin);
                            let prevDate = data.docdate;
                            let prevDocTime = '00:00';

                            legs.forEach((data_inside, index) => {
                                let time = data_inside.summary.travelTimeInSeconds
                                let length = data_inside.summary.lengthInMeters;
                                let sec = 0;
                                let waitSec = 0;
                                if (Number(serviceTime[index])) {
                                    sec = sec + convertHrToSec(Number(serviceTime[index]))
                                } else {
                                    sec = sec + 0;
                                }
                                if (Number(waitingTime[index])) {
                                    waitSec = waitSec + convertHrToSec(Number(waitingTime[index]))
                                } else {
                                    waitSec = waitSec + 0;
                                }
                                let serTime = formatTime(convertHrToSec(Number(serviceTime[index])));
                                let waitTime = formatTime(convertHrToSec(Number(waitingTime[index])));
                                serTime = serTime.split(':');
                                let serTimeHr = serTime[0];
                                let serTimeMin = serTime[1];
                                serTime = formatHrMin(serTimeHr) + ":" + formatHrMin(serTimeMin);

                                waitTime = waitTime.split(':');
                                let waitTimeHr = waitTime[0];
                                let waitTimeMin = waitTime[1];
                                waitTime = formatHrMin(waitTimeHr) + ":" + formatHrMin(waitTimeMin);

                                let res = {
                                    start: dateformatter(departure, index),
                                    distance: length / 1000,
                                    time: convertSecToHr(time).toFixed(3),
                                    serviceTime: serviceTime[index],
                                    serTime: splitTime(serTime),
                                    tTime: time,
                                    tDistance: length
                                };
                                departure.setSeconds(departure.getSeconds() + time + sec + waitSec);
                                //added sersec+wait sec+time
                                let endTimeRoute = dateformatter(departure);
                                endTimeRoute = new Date(endTimeRoute);
                                let endTimeHr = endTimeRoute.getHours();
                                let endTimeMin = endTimeRoute.getMinutes();
                                endTimeRoute = (endTimeHr) + ':' + endTimeMin;
                                var a = endTimeRoute.split(':');
                                var endTimeSec = (+a[0]) * 60 * 60 + (+a[1]) * 60;
                                var arrivalTime = endTimeSec -
                                    (Number(serviceTime[index]) * 60 * 60) - (Number(waitingTime[index]) * 60 * 60);
                                arrivalTime = formatTime(arrivalTime);
                                res.end = splitTime(endTimeRoute);
                                res.arrival = splitTime(arrivalTime);

                                res.startDate = prevDate;
                                res.endDate = prevDate
                                let latestEndDate = prevDate
                                let latestStartDate = prevDate
                                let prevdocsplittime = prevDocTime.split(':');
                                //  console.log("T2222 11 arrive time ", curtime);
                                console.log("T2222 11 prev time", prevdocsplittime);

                                let currartsec = time;
                                console.log("T2222 11 travel time ", currartsec);
                                let prevdocsec = (+prevdocsplittime[0]) * 60 * 60 + (+prevdocsplittime[1]) * 60;
                                let temptotsec = currartsec + prevdocsec;
                                let temptothrs = convertSecToHr(temptotsec);
                                let daysfromtemphrs = temptothrs / 24;
                                console.log("T2222 12 hrs ", temptothrs);
                                console.log("T2222 12 days", daysfromtemphrs);

                                if (daysfromtemphrs > 1) {
                                    let tempdate = moment(prevDate).add(Math.floor(daysfromtemphrs), 'days');
                                    let newStartDate = moment(tempdate).format('YYYY-MM-DD');
                                    latestStartDate = newStartDate;
                                    latestEndDate = newStartDate;
                                    prevDate = newStartDate;

                                }
                                else {

                                    if (prevdocsplittime[0] > endTimeRoute.split(':')[0]) {
                                        let tempdate1 = moment(prevDate).add(1, 'days');
                                        let newStartDate1 = moment(tempdate1).format('YYYY-MM-DD');
                                        latestStartDate = newStartDate1;
                                        latestEndDate = newStartDate1;
                                        prevDate = newStartDate1;
                                    }
                                }








                                res.endDate = latestEndDate;
                                res.startDate = latestStartDate;
                                prevDate = latestEndDate;
                                prevDocTime = splitTime(endTimeRoute);

                                resultsData.push(res);
                            });
                            let totTime = 0;
                            let totDistance = 0;
                            let endTime;
                            console.log("T6565 resultsData =", resultsData);
                            console.log("T6565 data =", data);
                            resultsData.map((tdata, index) => {
                                if (index === data.stops) {
                                    console.log("T6565 data if =");
                                    endTime = tdata.end.split(':');
                                    let endTimeHrs = endTime[0];
                                    let endTimeMins = endTime[1];
                                    let endLoadHrs = this.loadingSecs(Number(endTimeHrs), Number(endTimeMins))
                                    endTime = endLoadHrs;
                                    setEndTime = endTime;
                                }
                                console.log("every step Ttime =", totTime);
                                totTime += tdata.tTime;
                                totDistance += tdata.tDistance;
                            });
                            console.log("T6565 endTime =", endTime);
                            let reducer1 = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
                            let serTime = serviceTime.reduce(reducer1);
                            let waitTime = waitingTime.reduce(reducer1)
                            let tTime = totTime;
                            totTime = formatTime(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime));
                            setTotalTime = totTime;
                            setTotalDistance = totDistance / 1000;
                            console.log("TotalDistaince =", totDistance);
                            console.log("setTotalDistance =", setTotalDistance);
                            let vehicleStartTime = '';
                            if (sameTrips.length > 0) {
                                sameTrips.map((sameTrip) => {
                                    if (sameTrip.trips === 1) {
                                        vehicleStartTime = sameTrip.startTime
                                    }
                                })
                                prevTripsDist = sameTrips.reduce((sum, { totalDistance }) => sum + Number(totalDistance), 0);
                                prevTripsTime = sameTrips.reduce((sum, { totalTime }) => sum + convertHrToSec(Number(totalTime)), 0)
                            }
                            let tripsClosed = false;
                            if (vehicleStartTime.length > 0) {
                                let vehicleStartTimeDate = new Date();
                                vehicleStartTimeDate.setHours(Number(vehicleStartTime.split(':')[0]));
                                vehicleStartTimeDate.setMinutes(Number(vehicleStartTime.split(':')[1]));
                                let currentStartTimeDate = new Date();
                                currentStartTimeDate.setHours(Number(startTimeLocal.split(':')[0]))
                                currentStartTimeDate.setMinutes(Number(startTimeLocal.split(':')[1]))
                                if (vehicleStartTimeDate > currentStartTimeDate) {
                                    tripsClosed = true;
                                } else {
                                    tripsClosed = false;
                                }
                            }
                            prevTripsDist = prevTripsDist + (totDistance / 1000)
                            let totTimeSec = convertHrToSec(Number(totTime.split(':')[0])) + convertMinToSec(Number(totTime.split(':')[1]));
                            let maxTotTimeSec = convertHrToSec(Number(data.vehicleObject.maxtotaltime));
                            if (prevTripsDist >= data.vehicleObject.maxtotaldist
                                || prevTripsTime >= maxTotTimeSec
                                || optimizationStatus
                                || tripsClosed) {
                                if (prevTripsDist >= data.vehicleObject.maxtotaldist) {
                                    setDistErrorMessage(`The vehicle cannot perform trip more than ${data.vehicleObject.maxtotaldist} Miles, please review trip documents.`)
                                    setDistError(true);
                                } else if (prevTripsTime >= maxTotTimeSec) {
                                    setTimeErrorMessage(`The vehicle cannot perform trip more than ${data.vehicleObject.maxtotaltime} Hrs, please review trip documents.`)
                                    setTimeError(true);
                                } else if (tripsClosed) {
                                    setTripsClosedErrorMessage('Today trips was closed.')
                                    setTripClosedError(true);
                                } else if (optimizationStatus) {
                                    setOptimizationMessage('Please optimize previous trip.');
                                    setOptiStatusError(true);
                                }
                                // setHandleDateChange = selectedDate;
                            } else {
                                let loadingHrs = convertHrToSec(loadHrs);
                                let tripData = {
                                    tripCode: data.itemCode,
                                    tripVehicle: data.code,
                                    tripTotalTime: convertSecToHr(tTime + convertHrToSec(serTime) + convertHrToSec(waitTime) + loadingHrs),
                                    tripTravelTime: formatTime(tTime),
                                    tripTotalServiceTime: splitTime(serTime),
                                    totalDistance: totDistance / 1000,
                                    autoOptimised: false,

                                };
                                let routesSchedule = {
                                    startDate: data.docdate,
                                    endDate: data.docdate,
                                    startTime: splitTime(startTimeLocal),
                                    endTime: splitTime(endTime),
                                    routesData: resultsData,
                                    tripData: tripData,
                                    trips: data,
                                    cost: this.costCalculation(this.props.vehiclePanel, totTime, Math.round(totDistance / 1000), data.code)
                                }
                                let latestEndDate = data.docdate
                                let totaltimeforcal = Number(startTimeLocal.split(':')[0]) + tripData.tripTotalTime;
                                console.log("T2222 at last Trip Total time", totaltimeforcal);

                                let dayscal = totaltimeforcal / 24;
                                console.log("T2222 at last cal days", dayscal);
                                let dateNew = new Date(data.docdate);
                                if (dayscal > 0) {

                                    let date1 = new Date(dateNew.setDate(dateNew.getDate() + Math.floor(dayscal)));
                                    latestEndDate = date1;
                                }
                                else {
                                    latestEndDate = dateNew;
                                }

                                routesSchedule.endDate = latestEndDate;
                                console.log("T6565 final data routeScheduler", routesSchedule);
                                this.props.getValues(routesSchedule, optiindex, false, data, SeletedI);
                            }
                        }
                    }
                }
            });
    };


    costCalculation = (vehiclePanel, totalTime, totalDistance, code) => {
        let distanceCost = 0;
        let timeCost = 0;
        let totalCost = 0;
        let Regularcost = 0;
        let overtimecost = 0;
        let hr = Number(totalTime.split(':')[0]);
        let min = Number(totalTime.split(':')[1]);
        totalTime = hr + convertMinToHr(min);
        if (vehiclePanel && code) {
            vehiclePanel.vehicles.map((vehicle) => {
                if (vehicle.codeyve === code) {
                    distanceCost = (vehicle.costperunitd * Number(totalDistance));
                    if (totalTime > vehicle.overtimestar) {
                        overtimecost = (totalTime - vehicle.overtimestar) * vehicle.costperunito;
                        Regularcost = vehicle.overtimestar * vehicle.costperunitt;
                        timeCost = Math.round(overtimecost + Regularcost);
                    }
                    else {
                        Regularcost = (vehicle.costperunitt * totalTime);
                        timeCost = Regularcost;
                    }
                    totalCost = vehicle.fixedcost + distanceCost + timeCost
                }
            })
        }
        return { distanceCost, timeCost, totalCost, overtimecost, Regularcost };
    }



    onConfirmClick = (trip, index, opti, lock) => {
        if (lock) {
            var trips = this.props.tripsList;
            var clickedTrip = trips[index];

            if (clickedTrip.tmsValidated) {
                this.setState({
                    errorMessage: this.props.t('validatedTrip'),
                    addAlertShow: true
                });
            }
            else {
                this.setState({
                    confirmMessage: this.props.t('unlockTrip'),
                    addunlockconfirmShow: true,
                    index: index,
                });
            }

        } else {
            console.log("Passed Trip =", trip);

            if (opti === 'Optimized') {

                let previousLockTripsCheck = [];
                let tripsCollection = this.props.tripsList;
                console.log("Collection Trips are =", tripsCollection);
                tripsCollection.map((t) => {
                    if (t.code === trip.code && t.docdate === trip.docdate) {
                        if (t.trips === trip.trips - 1) {
                            previousLockTripsCheck.push(t)
                        }
                    }
                })

                let LockStatus = false;
                if (previousLockTripsCheck.length > 0) {
                    console.log("prev lock trip =", previousLockTripsCheck)
                    if (previousLockTripsCheck[0].lock) {
                        LockStatus = false;
                    } else {
                        LockStatus = true;
                    }
                }

                if (LockStatus) {
                    this.setState({
                        errorMessage: 'Please lock Previous Trips',
                        addAlertShow: true
                    });
                }
                else {
                    this.setState({
                        confirmMessage: this.props.t('lockTrip'),
                        addConfirmShow: true,
                        index: index,
                        lockButton: false,
                    })
                }
            } else {
                this.setState({
                    confirmMessage: this.props.t('optimizelocking'),
                    lockButton: true,
                    addConfirmShow: true,
                    index: index

                })
            }
        }
    }

    onConfirmNo = () => {
        this.setState({
            addConfirmShow: false
        })
    }

    onConfirmYes = (index) => {
        this.props.onLockRecord(index);
        this.setState({
            addConfirmShow: false
        })
    }

    onUnlockNo = () => {
        this.setState({
            addunlockconfirmShow: false
        })
    }

    onUnlockYes = (index) => {
        var trips = this.props.tripsList;
        var clickedTrip = trips[index];
        this.props.UnlockConfirmTrip(clickedTrip);
        this.setState({
            addunlockconfirmShow: false
        })
    }

    onEquipmentClick = (equipment) => {
        this.setState({
            addEquipmentShow: true,
            equipments: equipment
        })
    }


    onTriplogClick = (totobject) => {
        console.log("T7 inside trip click", totobject);
        this.setState({
            showLogs: true,
            logs: totobject
        })

    }

    onTrailerClick = (trailer) => {
        this.setState({
            addTrailShow: true,
            trailers: trailer
        })
    }

    getVRNumber = (count, currDate, site) => {
        var number = count > 9 ? '0' + (count + 1) : '00' + (count + 1);
        return 'WVR-' + currDate + "-" + site + "-" + number;
    }


    getOptimise = (trip, lock, i, opti) => {
        if (lock) {
            return (<span onClick={() => this.onOptimiseConfirm(trip, i, opti, lock)}>
                <RouteIcon color="primary" style={{ fontSize: 32, float: "left" }} />
            </span>);
        }
        else {

            if (opti === 'Open' || opti === 'open') {

                return (<span onClick={() => this.onOptimiseConfirm(trip, i, opti, lock)}>
                    <FiberNewIcon color="primary" style={{ fontSize: 36, float: "left" }} />
                </span>);
            }
            else {
                return (<span onClick={() => this.onOptimiseConfirm(trip, i, opti, lock)}>
                    <RouteIcon color="primary" style={{ fontSize: 32, float: "left" }} />
                </span>);

            }
        }

    }



    getLockData = (trip, lock, i, opti) => {

        if (lock) {

            return (
                <span onClick={() => this.onConfirmClick(trip, i, opti, lock)}>
                    <LockIcon color="primary" style={{ fontSize: 32, float: "left" }} />
                </span>

            );
        } else if (trip.optistatus === 'Optimized') {
            return (
                <span onClick={() => this.onConfirmClick(trip, i, opti, lock)}>
                    <LockOpenIcon color="primary" style={{ fontSize: 32, float: "left" }} />
                </span>
                // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                // </a>
            );
        }
        else {
            return (
                <span onClick={() => this.onConfirmClick(trip, i, opti, lock)}>
                    <LockOpenIcon color="disabled" style={{ fontSize: 32, float: "left" }} />
                </span>
                // <a href="#" onClick={() => this.onConfirmClick(i,opti)}>
                //     <svg class="svg-inline--fa fa-user-unlock fa-w-14" id="lockId1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
                // </a>
            );
        }
    }


    getVRdetailBtnClick(lock, i, tmsValidated) {
        if (lock) {
            console.log("Trip is locked");
            this.props.onVRClick(i, tmsValidated);
        }
        else {
            console.log("Trip is unlocked");
            this.props.updateTripsGeolocationbeforelock(i);
        }
    }



    getVrDetailsLink(x, i, tmsValidated) {
        // if (x == 1) {
        return (
            <a href="#"
                onClick={() => this.getVRdetailBtnClick(x, i, tmsValidated)}><InfoIcon color="primary" style={{ fontSize: 36 }} />
            </a>
        );
        // }
    }


    ListofDlv = (DocList) => {
        return (
            <table>
                <tbody>
                </tbody>
                {DocList && DocList.map((doc, i) => (
                    <tr key={i}>
                        <td>{doc.documentNo}</td>
                        <td>{doc.documentStatus}</td>
                    </tr>
                ))}
            </table>
        )
    }



    verticalLine() {

        return <span></span>
    }

    getStatus(trip, valid, lock, index, docStatus, validatedflg, lvsStatus) {
        console.log("TTTT lvs status =", lvsStatus);
        if (trip.optistatus == "Open"  && !lock && !valid) {
            return <span class='badge badge-primary text-uppercase' style={{ fontSize: 14 }}>{this.props.t('OPEN')}</span>;
        }
        else if (trip.optistatus == "Optimized" && !lock) {
            if (trip.generatedBy === 'AutoScheduler' || trip.generatedBy === 'AutoOpScheduler') {
                return <span class='badge badge-secondary text-uppercase' style={{ fontSize: 14 }} >{this.props.t('AUTO-OPTIMIZED')}</span>;

            }
            else {
                return <span class='badge badge-secondary text-uppercase' style={{ fontSize: 14 }} >{this.props.t('OPTIMIZED')}</span>;

            }
        }
        else if (trip.optistatus == "Optimized" && lock && !valid) {
            return <span class='badge badge-info text-uppercase' style={{ fontSize: 14 }} >{this.props.t('LOCKED')}</span>;
        }
        else if (trip.optistatus == "Open" && lock && !valid) {
                          return <span class='badge badge-info text-uppercase' style={{ fontSize: 14 }} >{this.props.t('LOCKED')}</span>;
                }
        else if (trip.optistatus == "Optimized" && lock && valid && !validatedflg) {
            return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14 }} >{this.props.t('TO_LOAD')}</span>;
        }
          else if (trip.optistatus == "Open" && lock && valid && !validatedflg) {
                       return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14 }} >{this.props.t('TO_LOAD')}</span>;
                }
        else if (trip.optistatus == "Optimized" && lock && valid && validatedflg) {
            console.log("TTTT lvs status =", lvsStatus);
            if (lvsStatus == 9) {
                return <span class='badge badge-warning text-uppercase' style={{ fontSize: 14 }} >{this.props.t('LOAD_CONFIRMED')} </span>;

            }
            else if (lvsStatus == 5 || lvsStatus == 6 || lvsStatus == 7 || lvsStatus == 10) {
                return <span class='badge badge-success text-uppercase' style={{ fontSize: 14 }} >{this.props.t('COMPLETED')}</span>;
            }
            else {

                return <span class='badge badge-warning text-uppercase' style={{ fontSize: 14 }}>{this.props.t('LOAD_CONFIRMED')}</span>;
            }
        }
        else if (trip.optistatus == "Open" && lock && valid && validatedflg) {
            console.log("TTTT lvs status =", lvsStatus);
            if (lvsStatus == 9) {
                return <span class='badge badge-warning text-uppercase' style={{ fontSize: 14 }} >{this.props.t('LOAD_CONFIRMED')} </span>;

            }
            else if (lvsStatus == 5 || lvsStatus == 6 || lvsStatus == 7 || lvsStatus == 10) {
                return <span class='badge badge-success text-uppercase' style={{ fontSize: 14 }} >{this.props.t('COMPLETED')}</span>;
            }
            else {

                return <span class='badge badge-warning text-uppercase' style={{ fontSize: 14 }}>{this.props.t('LOAD_CONFIRMED')}</span>;
            }
        }
        else {
            return <span class='badge badge-dark text-uppercase' style={{ fontSize: 14 }}>{this.props.t('OPEN')}</span>;
        }

    }


    getTripStatus(trip, valid, lock, index, validatedflg, lvsStatus) {

        console.log("lvs status", trip);
        console.log("lvs status", lvsStatus);
        if (valid && lock && validatedflg) {

            if (lvsStatus == 7 || lvsStatus == 10 || lvsStatus == 5 || lvsStatus == 6) {
                return (<span> <ThumbUpAltIcon color="primary" style={{ fontSize: 36, float: "left" }} />
                </span>);
            }
            else if (lvsStatus == 9) {
                return (<span> <LocalShippingIcon color="primary" style={{ fontSize: 36, float: "left" }} />
                </span>);
            }
            else {
            }
        }


    }

    getValidatebtn(trip, valid, lock, index, docStatus, validatedflg) {
        if (!valid && lock && !validatedflg) {
            return (
                <span
                    onClick={() => this.CheckValiationStatus(index)}> <ListAltIcon color="primary" style={{ fontSize: 36, float: "left" }} />
                </span>
            );
        } else if (valid && lock && !validatedflg) {
            return (
                <span
                    onClick={() => this.OnDisputeValidateTrip(index)}> <ListAltIcon color="action" style={{ fontSize: 36, float: "left" }} />
                </span>
            );
        }
        else if (!valid && !lock && !validatedflg) {
            return (
                <span
                > <ListAltIcon color="disabled" style={{ fontSize: 36, float: "left" }} />
                </span>
            );
        }
        else if (valid && lock && validatedflg) {
            return (
                <span
                > <PlaylistAddCheckCircleIcon color="primary" style={{ fontSize: 36, float: "left" }} />
                </span>
            );
        }
    }


    CheckDocumentStatuForValidation = (index, docStatus) => {
        //this.CheckDocumentStatuForValidation(index, docStatus)
        if (docStatus === 'Deliverable') {
            this.CheckValiationStatus(index)
        }
        else {
            this.CheckValiationStatus(index)
            /*
             this.setState({
                            errorMessage: 'Documents in Trips are not in Deliverable Status',
                            addAlertShow: true
                        });
                        */
        }
    }


    onConfirmDeleteClick = (index, tripcode) => {
        this.setState({
            addDeleteconfirmShow: true,
            confirmMessage: this.props.t('DeleteTrip'),
            index: index,
            tripcode: tripcode
        })
    }

    onConfirmDeleteNo = () => {
        this.setState({
            addDeleteconfirmShow: false,
            tripcode : ''
        })
    }

    onConfirmDeleteYes = (index, docnum) => {
        this.props.onCompleteTripDelete(index, this.state.tripcode);
        this.setState({
            addDeleteconfirmShow: false,
            tripcode : ''

        })
    }


    CheckValiationStatus(index) {
        var vflag = true;
        var Trips = this.props.tripsList;
        Trips.map((trip, i) => {
            if (i <= index) {
                if (trip.code == Trips[index].code && trip.docdate == Trips[index].docdate) {
                    if (trip.trips < Trips[index].trips && trip.tmsValidated == false) {
                        vflag = false;
                    }
                }
            }
        })

        if (vflag) {
            this.OnValidateTrip(index);
        }
        else {
            this.setState({
                errorMessage: 'Previous Trip of same vehicle is not validated',
                addAlertShow: true
            });
        }
    }

    getBgcolor(t, status) {


        let color = '';
        if (status === 'Open') {
            color = 'cornsilk';
        }
        else {
            let breakCondition = false;
            this.props.vehiclePanel.vehicles.map((vehicle) => {

                if (vehicle.codeyve === t && !breakCondition) {
                    var myStr = vehicle.color;
                    var subStr = myStr.match("background-color:(.*)");
                    color = subStr[1];
                    breakCondition = true;
                }
            });
        }
        return color;
    }

    displayEquipments = (trip) => {
        let equpQuantity = 0;
        if (trip.equipmentObject.length > 0) {
            equpQuantity = trip.equipmentObject.map(item => item.quantity).reduce((prev, next) => Number(prev) + Number(next));
        }
        return equpQuantity;
    }

    selectAllTripsPanel = () => {
        this.props.selectAllTripsPanel();
        this.setState({ enableValidateAll: !this.state.enableValidateAll })
    }


    ForcedSequnce = (i, event) => {
        console.log("inside forced", i + "-" + event);
        //this.props.ForcedSequnce(i);
    }

    checkForceSeq = (index, check) => {
        let updatedflg;
        console.log("inside checkForceSeq", check);
        if (check) {
            console.log("inside checkForceSeq true");
            updatedflg = false;

        }
        else {
            console.log("inside checkForceSeq false");
            updatedflg = true;
        }
        //
        console.log("inside checkForceSeq updatedflg", updatedflg);
        //  this.props.onForceseq(this.state.Seletedtripindex, updatedflg);
    }


    displayLoaderMessage = (index, msg) => {

        this.setState({
            enableloaderMsgWindow: true,
            Seletedtripindex: index,
            loaderMessage: msg,

            anchorEl: null
        })
    }

    onSaveloaderNotes = (note) => {
        console.log("inside onsaveloadernotes");
        this.props.onloaderMsg(this.state.Seletedtripindex, note);
        this.setState({ enableloaderMsgWindow: false })
    }



    setStartTime(trip) {
        if ((trip.optistatus === "Optimized" || trip.optistatus === "optimized")) {
            return splitTime(trip.startTime);
        } else {
            let sameTrips = [];
            let loadHrs;
            if (this.props.tripsList && this.props.tripsList.length > 0) {
                this.props.tripsList.map((allTrips) => {
                    if (allTrips.code === trip.code && allTrips.docdate === trip.docdate) {
                        if (allTrips.optistatus === "Optimized") {
                            loadHrs = trip.vehicleObject.enddepotserv + trip.vehicleObject.startdepots;
                            sameTrips.push(allTrips)
                        }
                    }
                });
                if (sameTrips.length > 0) {
                    let timeHr = sameTrips[sameTrips.length - 1].endTime.split(':')[0];
                    let timeMin = sameTrips[sameTrips.length - 1].endTime.split(':')[1];
                    let time = convertHrToSec(timeHr) + convertMinToSec(timeMin) + convertHrToSec(loadHrs);
                    return formatTime(time)
                } else {
                    return splitTime(trip.vehicleObject.starttime);
                }
            } else {
                return trip.vehicleObject.starttime
            }
        }
    }
    /*
    getOptistatus = (data) => {
       let result =  nullAndNanChecking(trip.optistatus, 'status')
       if(result == 'Optimized'){
         return  {this.props.t('Optimized')}
        }
       else {
        return result;
      }
    }
    */

    SearchTrips = e => {
        console.log("search content= ", e.target.value);
        this.props.updateTripsSearchTerm(e);
    }



    render() {

        console.log("T6 data in trips", this.props.tripsList);
        const currDate = moment(this.props.date).format('YYMMDD');
        let addEquipmentClose = () => this.setState({ addEquipmentShow: false });
        let addTrailClose = () => this.setState({ addTrailShow: false });
        let addAlertClose = () => this.setState({ addAlertShow: false });
        let addWarningAlertClose = () => this.setState({ addWarningAlertShow: false });
        let addLogsClose = () => this.setState({ showLogs: false });
        let addLoaderClose = () => this.setState({ enableloaderMsgWindow: false });
        return (

            <TabPane tabId="Trips" style={{ height: "250px", overflowX: "auto", overflowYL: "auto" }}>

                <div className="reportlist-view tableCustomFixHead">
                    <table className="table m-0">
                        <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}>
                            <tr className="">

                                <th className="pl-2">
                                    <input type="checkbox" id="tripsCheckBoxAll" onClick={() => this.selectAllTripsPanel()} /></th>
                                <th></th>

                                <th> {this.props.t('VR Date')}</th>
                                <th> {this.props.t('VR Details')}</th>
                                <th width="6%"> {this.props.t('Vehicle')}</th>
                                <th width="6%">Multi Unit</th>
                                <th width="6%"> {this.props.t('Driver')}</th>
                                <th width="2%"> {this.props.t('Departure')}</th>
                                <th width="2%"> {this.props.t('Arrival')}</th>
                                <th width="4%"> {this.props.t('Seq')} #</th>
                                <th width="12%"> {this.props.t('Alert')}</th>
                                <th width="12%"> {this.props.t('Actions')}</th>
                                <th width="4%"> {this.props.t('Status')}</th>
                                <th > {this.props.t('TripCode')}</th>
                                <th> {this.props.t('DepartureSite')}</th>
                                <th> {this.props.t('ArrivalSite')}</th>
                                <th width="1%"> {this.props.t('Trailer')}</th>
                                <th width="6%"> Tot {this.props.t('Weight')}</th>
                                <th width="6%"> Tot {this.props.t('Volume')}</th>
                                <th width="6%">%  {this.props.t('Weight')} </th>
                                <th width="6%">%  {this.props.t('Volume')}</th>
                                <th width="6%"> {this.props.t('ENLV')}</th>
                                <th width="6%"> {this.props.t('LIV')}</th>
                                <th width="6%"> {this.props.t('Stops')}</th>
                                <th width="6%"> Log </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.props.tripsList && this.props.tripsList || []).map((trip, i) => (

                                <tr className="bg-blue" style={{ backgroundColor: this.getBgcolor(trip.code, trip.optistatus) }} key={i}>

                                    <td className="pl-2"><input type="checkbox" name="tripsCheckBox" onClick={() => this.props.updateTripsGeoLocations(i, trip.itemCode)} /></td>
                                    <td>
                                        {trip.lock ? '' :
                                            <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"
                                                onClick={() => this.onConfirmDeleteClick(i, trip.itemCode)} disabled={trip.lock}>
                                                <i class="fa fa-trash"></i>
                                            </button>}
                                    </td>
                                    <td><b>{moment.tz(trip.docdate, '').format('MM-DD-YYYY')}</b>
                                    </td>
                                    <td>
                                        {this.getVrDetailsLink(trip.lock, i, trip.tmsValidated)}
                                    </td>
                                    <td width="6%"><b>{trip.code}</b></td>
                                    <td width="6%"><b>{trip.vehicleObject.trailerLink}</b></td>
                                    <td width="6%">{trip.driverName}</td>
                                    <td width="2%">{this.setStartTime((trip))}</td>
                                    <td width="2%">{(trip.optistatus === "Open" || trip.optistatus === "open") ? '' : nullAndNanChecking(trip.endTime, 'time')}</td>

                                    <td ><span className="vtrips">{trip.trips}</span></td>
                                    <td width="6%">

                                        {trip.alertFlg == 1 ?
                                            <span onClick={() => this.onWaringAlertClick(trip.itemCode, i, trip.warningNotes)}>
                                                <WarningIcon color="warning" style={{ fontSize: 36 }} />
                                            </span>

                                            : ''
                                        }</td>
                                    <td width="12%">
                                        <div className="TripActionIcons">
                                            {this.getOptimise(trip, trip.lock, i, trip.optistatus)}
                                            {this.getLockData(trip, trip.lock, i, trip.optistatus || 'open')}
                                            {this.getValidatebtn(trip, trip.tmsValidated, trip.lock, i, trip.pendingDocStatus, trip.lvsValidated)}
                                            {this.getTripStatus(trip, trip.tmsValidated, trip.lock, i, trip.lvsValidated, trip.lvsStatus)}

                                            {trip.lock ? <div className="TripActionIconsLast"><Tooltip title={this.ListofDlv(trip.docDetails)}>

                                                <PlagiarismIcon style={{ fontSize: 36 }} color='primary' />
                                            </Tooltip> </div> : ''
                                            }
                                        </div>

                                    </td>
                                    <td width="6%" >
                                        {this.getStatus(trip, trip.tmsValidated, trip.lock, i, trip.pendingDocStatus, trip.lvsValidated, trip.lvsStatus)}
                                    </td>
                                    <td ><span className="vid">{trip.itemCode}</span></td>
                                    <td>{trip.depSite}</td>
                                    <td>{trip.arrSite}</td>


                                    <td width="1%"><a className="custom-anchor" href="#" onClick={() => this.onTrailerClick(trip.trialerObject)}>{trip.trialerObject && trip.trialerObject.length > 0 ? trip.trialerObject.length : 0}</a></td>
                                    <td width="2%">{trip.totalWeight}</td>
                                    <td width="6%">{trip.totalVolume}</td>
                                    <td width="6%">{trip.weightPercentage}</td>
                                    <td width="6%">{trip.volumePercentage}</td>

                                    <td width="2%">{trip.pickups}</td>
                                    <td width="2%">{trip.drops}</td>
                                    <td width="6%"><span className="">{trip.stops}</span></td>
                                    <td data-toggle="tooltip" data-placement="top">
                                        <a href="#"
                                            onClick={() => this.onTriplogClick(trip.totalObject)}
                                        ><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                                    </td>
                                    {/* <td width="2%"><a href="#" onClick = {() => this.props.onVRClick(trip) }><i class="fa fa-info-circle"
                                            aria-hidden="true"></i></a></td> */}
                                    {/* <td width="2%"><a href="#" onClick = {() => this.props.onVRClick(i)}><i class="fa fa-info-circle"
                                        aria-hidden="true"></i></a></td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <LockConfirm
                    show={this.state.addConfirmShow}
                    onHide={this.onConfirmNo}
                    lockConfirm={this.onConfirmYes}
                    index={this.state.index}
                    confirmMessage={this.state.confirmMessage}
                    lock={this.state.lockButton}
                ></LockConfirm>
                <UnlockConfirm
                    show={this.state.addunlockconfirmShow}
                    onHide={this.onUnlockNo}
                    unlockConfirm={this.onUnlockYes}
                    index={this.state.index}
                    confirmMessage={this.state.confirmMessage}
                ></UnlockConfirm>
                <OptimiseConfirm
                    show={this.state.addoptimiseconfirmShow}
                    onHideOptimiseWin={this.onOptimiseNo}
                    optimiseConfirm={this.onOptimiseYes}
                    index={this.state.index}
                    confirmMessage={this.state.confirmMessage}
                ></OptimiseConfirm>
                <NonValidateConfirm
                    index={this.state.index}
                    show={this.state.addNonvalidateconfirmShow}
                    onHide={this.onNonValidateNo}
                    validateConfirm={this.onNonValidateYes}
                    confirmMessage={this.state.confirmMessage}
                ></NonValidateConfirm>
                <ValidateConfirm
                    index={this.state.index}
                    show={this.state.addvalidateconfirmShow}
                    onHide={this.onValidateNo}
                    validateConfirm={this.onValidateYes}
                    confirmMessage={this.state.confirmMessage}
                ></ValidateConfirm>
                <DisplayEquipments
                    show={this.state.addEquipmentShow}
                    onHide={addEquipmentClose}
                    equipments={this.state.equipments}
                    displayEdit={false}
                ></DisplayEquipments>
                <DisplayTripLogs
                    show={this.state.showLogs}
                    onHide={addLogsClose}
                    totObjects={this.state.logs}
                    displayEdit={false}
                ></DisplayTripLogs>
                <DisplayTrailers
                    show={this.state.addTrailShow}
                    onHide={addTrailClose}
                    trailers={this.state.trailers}
                ></DisplayTrailers>
                <Alert
                    show={this.state.addAlertShow}
                    onHide={addAlertClose}
                    errorMessage={this.state.errorMessage}
                ></Alert>
                <ConfirmWarningText
                    show={this.state.addWarningAlertShow}
                    onWarningAlertNo={addWarningAlertClose}
                    errorMessage={this.state.confirmMessage}
                    confirmWarningAlertClose={this.onConfirmWarningClose}
                    tripcode={this.state.tripcode}
                    warningText={this.state.warningText}
                    index={this.state.index}
                    confirmMessage={this.state.confirmMessage}
                ></ConfirmWarningText>
                <DeleteConfirm
                    show={this.state.addDeleteconfirmShow}
                    onHide={this.onConfirmDeleteNo}
                    confirmDelete={this.onConfirmDeleteYes}
                    index={this.state.index}
                    tripcode={this.state.tripcode}
                    confirmMessage={this.state.confirmMessage}
                ></DeleteConfirm>
                <DisplayLoaderNotes
                    show={this.state.enableloaderMsgWindow}
                    onHide={addLoaderClose}
                    notes={this.state.loaderMessage}
                    onSaveloaderNotes={this.onSaveloaderNotes}
                    displayEdit={true}
                ></DisplayLoaderNotes>


            </TabPane>
        );
    }
}

export default withNamespaces()(TripsList3);