import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import firebase from "../../config/firebase";
import Snackbar from "../../components/Snackbar/Snackbar";
import Maps from "../../components/Map/Maps";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddStudent extends React.Component {
  state = {
    bid: "",
    name: "",
    tc: "",
    phone: "",
    vehicle: "",
    password: "",
    parentName: "",
    parentPhone: "",
    address: { lat: 40.748817, lng: -73.985428 },
    alertSuccess: false,
    alertFail: false,
    alertWarning: false
  };

  handleSave = () => {
    const {
      name,
      password,
      phone,
      tc,
      vehicle,
      parentName,
      address,
      bid,
      parentPhone
    } = this.state;
    if (
      tc.length === 11 &&
      name.length > 3 &&
      parentName.length > 3 &&
      phone.length === 11 &&
      parentPhone.length === 11 &&
      vehicle.length > 6 &&
      vehicle.length < 9 &&
      password.length > 5 &&
      bid.length > 5
    ) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const collectionReference = db.collection("student");
      collectionReference
        .add({
          name,
          password,
          phone,
          tc,
          vehicle,
          parentName,
          address,
          bid,
          parentPhone,
          OffBusLocation: null,
          OffBusTime: null,
          OnBusLocation: null,
          OnBusTime: null,
          currentLocation: null,
          inVehicle: false,
          locations: null
        })
        .then(v =>
          this.setState(
            {
              bid: "",
              name: "",
              tc: "",
              phone: "",
              vehicle: "",
              password: "",
              parentName: "",
              parentPhone: "",
              address: { lat: 40.748817, lng: -73.985428 },
              alertSuccess: true,
              alertFail: false,
              alertWarning: false
            },
            () => setTimeout(() => this.setState({ alertSuccess: false }), 1500)
          )
        )
        .catch(err =>
          this.setState({ alertFail: true, alertSuccess: false }, () =>
            setTimeout(() => this.setState({ alertFail: false }), 1500)
          )
        );
    } else {
      this.setState({ alertWarning: true }, () =>
        setTimeout(() => this.setState({ alertWarning: false }), 1500)
      );
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      password,
      phone,
      tc,
      vehicle,
      bid,
      // address,
      parentName,
      parentPhone,
      alertSuccess,
      alertFail,
      alertWarning
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Öğrenci Bilgileri</h4>
                <p className={classes.cardCategoryWhite}>
                  Öğrenciye ait bilgilerini eksiksiz giriniz.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={7}>
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={7}>
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      success={password.length > 5}
                      labelText="Şifre"
                      id="password"
                      inputProps={{ value: password }}
                      onChange={this.handleChange("password")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSave}>
                  Öğrenci Kaydet
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Adres</h4>
                <p className={classes.cardCategoryWhite}>
                  Öğrencinin adresini seçiniz.
                </p>
              </CardHeader>
              <CardBody profile>
                <Maps />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place="tr"
          color="danger"
          message="Kaydetme işleminde hata oluştu."
          open={alertFail}
          closeNotification={() => this.setState({ alertFail: false })}
          close
        />
        <Snackbar
          place="tr"
          color="success"
          message="Öğrenci başarıyla kaydedildi."
          open={alertSuccess}
          closeNotification={() => this.setState({ alertSuccess: false })}
          close
        />
        <Snackbar
          place="tr"
          color="info"
          message="Bütün alanları doldurunuz."
          open={alertWarning}
          closeNotification={() => this.setState({ alertWarning: false })}
          close
        />
      </div>
    );
  }
}

export default withStyles(styles)(AddStudent);
