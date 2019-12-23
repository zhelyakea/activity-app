import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddActivity from "./AddActivity";
import ActivitiesList from "./ActivitiesList";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return [...state, action.payload];
    case "ADD_GUEST":
      return state.map((activity, index) => {
        if (action.payload.index === index) {
          return {
            ...activity,
            guests: [...activity.guests, action.payload.email]
          };
        }
        return activity;
      });
    default:
      return state;
  }
};
const useStyles = makeStyles(() => ({
  button: {
    marginTop: ".5%",
    marginRight: "7.5%"
  }
}));
function App() {
  const classes = useStyles();
  const initialActivities =
    JSON.parse(localStorage.getItem("activities")) || [];

  const [activities, dispatch] = React.useReducer(reducer, initialActivities);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedActivity, setSelectedActivity] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const addActivity = activity => {
    return dispatch({ type: "ADD_ACTIVITY", payload: activity });
  };
  const addGuest = email => {
    return dispatch({
      type: "ADD_GUEST",
      payload: { index: selectedActivity, email }
    });
  };

  return (
    <div className="App">
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button
          className={classes.button}
          color="primary"
          onClick={handleClick}
        >
          Add activity
        </Button>
      </Grid>
      <AddActivity {...{ anchorEl, setAnchorEl, addActivity }} />
      <ActivitiesList
        {...{ activities, selectedActivity, setSelectedActivity, addGuest }}
      />
    </div>
  );
}

export default App;
