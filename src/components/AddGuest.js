import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5%",
    marginBottom: "5%"
  }
}));
const AddGuest = ({
  anchorEl,
  addGuest,
  setAnchorEl,
  activities,
  selectedActivity
}) => {
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
      <Container className={classes.container} maxWidth="md">
        <Formik
          validateOnMount
          initialValues={{
            email: ""
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required("Required")
          })}
          onSubmit={(values, { resetForm }) => {
            addGuest(values.email);
            closePopup();
            resetForm();
          }}
          validate={values => {
            const errors = {};
            if (activities[selectedActivity].guests.includes(values.email)) {
              errors.email = "Email already exists";
            }
            return errors;
          }}
        >
          {({ handleChange, errors, touched, isValid, setFieldTouched }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Typography variant="h5">Add guest</Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Enter email"
                  name="email"
                  type="email"
                  onChange={event => {
                    setFieldTouched("email", true, false);
                    handleChange(event);
                  }}
                  error={!!errors.email && touched.email}
                  helperText={touched.email ? errors.email : ""}
                />
                <Button type="submit" color="primary" disabled={!isValid}>
                  Add guest
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Popover>
  );
};

export default AddGuest;
