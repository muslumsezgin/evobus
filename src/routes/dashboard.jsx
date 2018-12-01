import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import PersonAdd from "@material-ui/icons/PersonAdd";
import DirectionsBus from "@material-ui/icons/DirectionsBus";
import DepartureBoard from "@material-ui/icons/DepartureBoard";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Student from "views/Student/Student.jsx";
import Driver from "views/Driver/Driver.jsx";
import Maps from "views/Maps/Maps.jsx";
import AddDriver from "../views/AddDriver/AddDriver";
import AddStudent from "../views/AddStudent/AddStudent";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Ana Sayfa",
    navbarName: "Ana Sayfa",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/maps",
    sidebarName: "Harita",
    navbarName: "Harita",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/student",
    sidebarName: "Öğrenciler",
    navbarName: "Öğrenciler",
    icon: Person,
    component: Student
  },
  {
    path: "/driver",
    sidebarName: "Sürücüler",
    navbarName: "Sürücüler",
    icon: DirectionsBus,
    component: Driver
  },
  {
    path: "/addStudent",
    sidebarName: "Öğrenci Ekleme",
    navbarName: "Öğrenci Ekleme",
    icon: PersonAdd,
    component: AddStudent
  },
  {
    path: "/addDriver",
    sidebarName: "Sürücü Ekleme",
    navbarName: "Sürücü Ekleme",
    icon: DepartureBoard,
    component: AddDriver
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
