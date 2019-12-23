import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import AddGuest from "./AddGuest";

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: "5%"
  }
}));
function ActivitiesList({
  activities,
  selectedActivity,
  setSelectedActivity,
  addGuest
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const addGuests = (event, index) => {
    handleClick(event);
    setSelectedActivity(index);
  };
  return (
    <Container>
      {!!activities.length && (
        <>
          <Typography variant="h5">Activities List</Typography>
          <TableContainer className={classes.container} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="25%">Activity Name</TableCell>
                  <TableCell width="40%" align="left">
                    Address
                  </TableCell>
                  <TableCell width="10%" align="left">
                    Date
                  </TableCell>
                  <TableCell width="20%" align="left">
                    Guests
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities
                  .sort((a, b) =>
                    moment(new Date(a.date)).diff(new Date(b.date))
                  )
                  .map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {activity.name}
                      </TableCell>
                      <TableCell align="left">{activity.address}</TableCell>
                      <TableCell align="left">{activity.date}</TableCell>
                      <TableCell align="left">
                        <List>
                          {activity.guests.map((email, index) => {
                            return <ListItem key={index}>{email}</ListItem>;
                          })}

                          <Button
                            color="primary"
                            disabled={
                              activity.guests.length === activity.guestNumbers
                            }
                            onClick={event => addGuests(event, index)}
                          >
                            Add guest
                          </Button>
                        </List>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <AddGuest
        {...{ anchorEl, addGuest, setAnchorEl, activities, selectedActivity }}
      />
    </Container>
  );
}

export default ActivitiesList;
