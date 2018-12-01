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

class AddDriver extends React.Component {
  state = {
    name: "",
    tc: "",
    phone: "",
    vehicle: "",
    password: "",
    alertSuccess: false,
    alertFail: false,
    alertWarning: false
  };

  handleSave = () => {
    const { name, password, phone, tc, vehicle } = this.state;
    if (
      tc.length === 11 &&
      name.length > 3 &&
      phone.length === 11 &&
      vehicle.length > 6 &&
      vehicle.length < 9 &&
      password.length > 5
    ) {
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const collectionReference = db.collection("driver");
      collectionReference
        .add({
          name,
          password,
          phone,
          tc,
          vehicle,
          vehicleLocation: null
        })
        .then(v =>
          this.setState(
            {
              name: "",
              tc: "",
              phone: "",
              vehicle: "",
              password: "",
              alertSuccess: true,
              alertFail: false
            },
            () => setTimeout(() => this.setState({ alertSuccess: false }), 1500)
          )
        )
        .catch(
          err => this.setState({ alertFail: true, alertSuccess: false }),
          () => setTimeout(() => this.setState({ alertFail: false }), 1500)
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
                <h4 className={classes.cardTitleWhite}>Sürücü Bilgileri</h4>
                <p className={classes.cardCategoryWhite}>
                  Sürücüye ait bilgilerini eksiksiz giriniz.
                </p>
              </CardHeader>
              <CardBody>
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
                      success={name.length > 3}
                      labelText="İsim"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{ value: name }}
                      onChange={this.handleChange("name")}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      success={vehicle.length > 6 && vehicle.length < 9}
                      labelText="Plaka"
                      id="vehicle"
                      inputProps={{ value: vehicle }}
                      onChange={this.handleChange("vehicle")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
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
                  Sürücü Kaydet
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Sürücü Bilgilendirme</h4>
                <p className={classes.cardCategoryWhite}>Lorem ipsum</p>
              </CardHeader>
              <CardBody profile>
                <p className={classes.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua...
                </p>
                <p className={classes.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non <proident className="." />
                </p>
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
          message="Sürücü başarıyla kaydedildi."
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

export default withStyles(styles)(AddDriver);
