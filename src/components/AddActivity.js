import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SearchAddress from "./SearchAddress";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5%",
    marginBottom: "5%"
  }
}));
const AddActivity = ({ anchorEl, setAnchorEl, addActivity }) => {
  const classes = useStyles();
  const closePopup = () => {
    setAnchorEl(null);
  };
  return (
    <Popover
      id="id"
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={closePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Container className={classes.container} maxWidth="lg">
        <Formik
          validateOnMount
          initialValues={{
            name: "",
            address: "",
            date: new Date(),
            guestNumbers: ""
          }}
          validationSchema={Yup.object().shape({
            address: Yup.string().required("Required"),
            name: Yup.string().required("Required"),
            date: Yup.date().required(),
            guestNumbers: Yup.string().required("Required")
          })}
          onSubmit={(values, { resetForm }) => {
            const activity = {
              ...values,
              guestNumbers: Number(values.guestNumbers),
              date: moment(values.date).format("MM/DD/YYYY"),
              guests: []
            };
            addActivity(activity);
            closePopup();
            resetForm();
          }}
        >
          {({
            handleChange,
            setFieldValue,
            errors,
            touched,
            values,
            isValid,
            setFieldTouched
          }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Typography variant="h5">Add Activity</Typography>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Enter activity name"
                  name="name"
                  type="text"
                  onChange={event => {
                    setFieldTouched("name", true, false);
                    handleChange(event);
                  }}
                  error={!!errors.name && touched.name}
                  helperText={touched.name ? errors.name : ""}
                />
                <SearchAddress
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  handleChange={handleChange}
                  address={values.address}
                  error={errors.address}
                  touched={touched.address}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    required
                    fullWidth
                    disablePast
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date"
                    label="Activity date"
                    value={values.date}
                    onChange={value => {
                      setFieldValue("date", value);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    name="date"
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  required
                  fullWidth
                  id="guestNumbers"
                  label="Maximum number of guests"
                  name="guestNumbers"
                  type="text"
                  onChange={event => {
                    setFieldTouched("guestNumbers", true, false);
                    handleChange(event);
                  }}
                  error={!!errors.guestNumbers && touched.guestNumbers}
                  helperText={touched.guestNumbers ? errors.guestNumbers : ""}
                />
                <Button type="submit" color="primary" disabled={!isValid}>
                  Add activity
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Popover>
  );
};
export default AddActivity;
