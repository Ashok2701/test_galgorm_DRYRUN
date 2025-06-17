import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import RouteDetail from "../pages/Dashboard/RouteDetail";

// Pages Calendar
import CalendarView from "../pages/Calendar-View/CalendarView";

// Pages Map
import Map from "../pages/Map-View/Map";

// Reports
import Reports from "../pages/Reports";


// Group 2

import PTremoval from "../pages/PT-Group02/PT-Deletion/index";
import PTaddition from "../pages/PT-Group02/PT-Addition/index";
import PTadditionRouteDetails from "../pages/PT-Group02/PT-Addition/RouteDetails";



//WTA calendar
 import WCalendar from '../pages/WCalendar/index';
 import Sampletext from '../pages/WCalendar/sampletext';
 import WMap from '../pages/WMap/index';



//Scheduler
import Scheduler from "../pages/Scheduler2/index";


// Fleet Management
import VehicleClass from "../pages/Fleet-Management/VehicleClass/index";
import CreateVehicleClass from "../pages/Fleet-Management/VehicleClass/create";

import VehicleClassAssociation from "../pages/Fleet-Management/VehicleClassAssociation/index";
import CreateVehicleClassAssociation from "../pages/Fleet-Management/VehicleClassAssociation/create";

import VehicleManagement from "../pages/Fleet-Management/VehicleManagement/index";
import CreateVehicleManagement from "../pages/Fleet-Management/VehicleManagement/create";


// Pages Component
import Chat from "../pages/Chat/Chat";

//Ecommerce Pages
import Products from "../pages/Ecommerce/Products";
import ProductDetail from "../pages/Ecommerce/ProductDetail";
import Orders from "../pages/Ecommerce/Orders";
import Customers from "../pages/Ecommerce/Customers";
import Cart from "../pages/Ecommerce/Cart";
import CheckOut from "../pages/Ecommerce/CheckOut";
import Shops from "../pages/Ecommerce/Shops";
import AddProduct from "../pages/Ecommerce/AddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";

//Icons
import RemixIcons from "../pages/Icons/RemixIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign";
import DripiIcons from "../pages/Icons/DripiIcons";
import FontAwesome from "../pages/Icons/FontAwesome";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Timeline from "../pages/Utility/Timeline";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";
import FormXeditable from "../pages/Forms/FormXeditable";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

//Kanban Board
import KanbanBoard from "../pages/KanbanBoard/index";

const authProtectedRoutes = [
  //Kanban Board
  { path: "/apps-kanban-board", component: KanbanBoard },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-rating", component: UiRating },
  { path: "/ui-rangeslider", component: UiRangeSlider },
  { path: "/ui-notifications", component: UiNotifications },
  { path: "/ui-roundslider", component: UIRoundSlider },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-advanced", component: FormAdvanced },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-mask", component: FormMask },
  { path: "/form-uploads", component: FormUpload },
  { path: "/form-wizard", component: FormWizard },
  { path: "/form-validation", component: FormValidations },
  { path: "/form-xeditable", component: FormXeditable },

  //Utility
  { path: "/pages-starter", component: StarterPage },
  { path: "/pages-timeline", component: Timeline },
  { path: "/pages-faqs", component: FAQs },
  { path: "/pages-pricing", component: Pricing },

  //Icons
  { path: "/icons-remix", component: RemixIcons },
  { path: "/icons-materialdesign", component: MaterialDesign },
  { path: "/icons-dripicons", component: DripiIcons },
  { path: "/icons-fontawesome", component: FontAwesome },

  // Maps
  { path: "/maps-google", component: MapsGoogle },
  { path: "/maps-vector", component: MapsVector },

  //Charts
  { path: "/charts-apex", component: ChartApex },
  { path: "/charts-chartjs", component: ChartjsChart },
  { path: "/charts-sparkline", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },

  //Email
  { path: "/email-inbox", component: EmailInbox },
  { path: "/email-read", component: EmailRead },

  //Ecommerce
  { path: "/ecommerce-products", component: Products },
  { path: "/ecommerce-product-detail", component: ProductDetail },
  { path: "/ecommerce-orders", component: Orders },
  { path: "/ecommerce-customers", component: Customers },
  { path: "/ecommerce-cart", component: Cart },
  { path: "/ecommerce-checkout", component: CheckOut },
  { path: "/ecommerce-shops", component: Shops },
  { path: "/ecommerce-add-product", component: AddProduct },

  //chat
  { path: "/apps-chat", component: Chat },

  //calendar
  { path: "/calendarview", component: CalendarView },
  { path: "/mapview", component: Map },
  
  
  
  
  
  //Scheduler
   {path: "/scheduler" , component : Scheduler},
  
  // Group 2
  { path: "/AddOn/removePCKT", component: PTremoval },
  { path: "/AddOn/AddPCKT", component: PTaddition },
  { path: "/showRouteDetails/:id", component: PTadditionRouteDetails },

  

  //Reports
  { path: "/reports/tms-calendar", component: Reports },
  { path: "/reports/tms-planning", component: Reports },
  { path: "/reports/delivery-preparation", component: Reports },
  { path: "/reports/route-list", component: Reports },
  { path: "/reports/pod-tracking", component: Reports },
  { path: "/reports/kpi-global", component: Reports },
  { path: "/reports/kpi-site-vehicle", component: Reports },
  { path: "/reports/kpi-vehicle", component: Reports },
  { path: "/reports/kpi-site", component: Reports },

  // Fleet Management
  { path: "/fleet-management/vehicle-class/create", component: CreateVehicleClass },
  { path: "/fleet-management/vehicle-class", component: VehicleClass },
  { path: "/fleet-management/vehicle-class-association/create", component: CreateVehicleClassAssociation },
  { path: "/fleet-management/vehicle-class-association", component: VehicleClassAssociation },
  { path: "/fleet-management/vehicle-management/create", component: CreateVehicleManagement },
  { path: "/fleet-management/vehicle-management", component: VehicleManagement },


  { path: "/dashboard", component: Scheduler },
  { path: "/route-details", component: RouteDetail },

  //Maps and calendars
  { path: "/calendar", component: WCalendar},
  {path: "/wcalendar/sampletext", component: Sampletext},
  { path: "/maps", component: WMap},



  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/auth-lock-screen", component: AuthLockScreen },


  // Authentication Inner
  { path: "/auth-login", component: Login1 },
  { path: "/auth-register", component: Register1 },
  { path: "/auth-recoverpw", component: ForgetPwd1 },

  { path: "/pages-maintenance", component: Maintenance },
  { path: "/pages-comingsoon", component: CommingSoon },
  { path: "/pages-404", component: Error404 },
  { path: "/pages-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
