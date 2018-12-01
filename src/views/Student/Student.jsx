import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TypeTable from "components/Table/TypeTable.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import firebase from "../../config/firebase";
import Button from "../../components/CustomButtons/Button";
import CardFooter from "../../components/Card/CardFooter";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Student extends React.Component {
  state = {
    selected: -1,
    data: [],
    collectionReference: null,
    bid: "",
    name: "",
    tc: "",
    phone: "",
    vehicle: "",
    parentName: "",
    parentPhone: "",
    address: { lat: 40.748817, lng: -73.985428 }
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const collectionReference = db.collection("student");
    collectionReference
      .get()
      .then(snapshot =>
        this.setState({ data: snapshot.docs, collectionReference })
      )
      .catch(err => console.log(err));
  }

  handleUpdate = () => {
    const collectionReference = this.state.collectionReference;

    const {
      name,
      phone,
      tc,
      vehicle,
      parentName,
      address,
      bid,
      parentPhone,
      data,
      selected
    } = this.state;
    const item = data[selected];
    collectionReference
      .doc(item.id)
      .set({
        name,
        phone,
        tc,
        vehicle,
        parentName,
        address,
        bid,
        parentPhone
      })
      .then(() =>
        collectionReference
          .get()
          .then(snapshot =>
            this.setState({ data: snapshot.docs, selected: -1 })
          )
      );
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = id => {
    const val = this.state.data[id].data();
    this.setState({ selected: id, ...val });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      phone,
      tc,
      vehicle,
      bid,
      // address,
      parentName,
      parentPhone,
      data,
      selected
    } = this.state;
    const item = data[selected];
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={this.state.selected === -1 ? 12 : 8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Öğrenci Listesi</h4>
            </CardHeader>
            <CardBody>
              <TypeTable
                onChangedSelected={id => this.handleClick(id)}
                tableHeaderColor="warning"
                tableHead={[
                  "TC",
                  "İsim",
                  "Telefon",
                  "Veli",
                  "Veli Telefon",
                  "Servis"
                ]}
                columnType={[
                  "tc",
                  "name",
                  "phone",
                  "parentName",
                  "parentPhone",
                  "vehicle"
                ]}
                tableData={data}
              />
            </CardBody>
          </Card>
        </GridItem>
        {selected === -1 ? null : (
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>{item.data().name}</h4>
                <p className={classes.cardCategoryWhite}>
                  Öğrenci bilgilerini düzenle
                </p>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Cihaz Bilgisi"
                  id="bid"
                  success={bid.length > 5}
                  inputProps={{ value: bid }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleChange("bid")}
                />

                <CustomInput
                  labelText="TC Kimlik Numarası"
                  id="tc"
                  success={tc.length === 11}
                  inputProps={{ value: tc, type: "number" }}
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={this.handleChange("tc")}
                />

                <CustomInput
                  success={vehicle.length > 6 && vehicle.length < 9}
                  labelText="Servis"
                  id="vehicle"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{ value: vehicle }}
                  onChange={this.handleChange("vehicle")}
                />

                <CustomInput
                  success={name.length > 3}
                  labelText="İsim"
                  id="name"
                  inputProps={{ value: name }}
                  onChange={this.handleChange("name")}
                  formControlProps={{
                    fullWidth: true
                  }}
                />

                <CustomInput
                  labelText="Telefon"
                  success={phone.length === 11}
                  inputProps={{ type: "number", value: phone }}
                  onChange={this.handleChange("phone")}
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                />

                <CustomInput
                  success={parentName.length > 3}
                  labelText="Veli İsim"
                  id="parentName"
                  inputProps={{ value: parentName }}
                  onChange={this.handleChange("parentName")}
                  formControlProps={{
                    fullWidth: true
                  }}
                />

                <CustomInput
                  labelText="Veli Telefon"
                  success={parentPhone.length === 11}
                  inputProps={{ type: "number", value: parentPhone }}
                  onChange={this.handleChange("parentPhone")}
                  id="parentPhone"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </CardBody>
              <CardFooter>
                <Button color="success" onClick={this.handleUpdate}>
                  Öğrenci Güncelle
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Student);
