import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: "1%",
    marginLeft: "1%"
  }
}));
const AddressesList = ({
  anchorEl,
  setAnchorEl,
  setFieldValue,
  setExcludeIDs,
  setTypedAddress,
  searchAddress,
  results
}) => {
  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = display_name => {
    setExcludeIDs([]);
    setTypedAddress(display_name);
    setFieldValue("address", display_name);
    handleClose();
  };
  return (
    <Popover
      id="id"
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <List>
        {results.map(({ place_id, display_name }) => {
          return (
            <ListItem
              key={place_id}
              button
              onClick={() => handleClick(display_name)}
            >
              <ListItemText>{display_name}</ListItemText>
            </ListItem>
          );
        })}
      </List>
      <Button
        className={classes.button}
        color="primary"
        onClick={searchAddress}
      >
        More results
      </Button>
    </Popover>
  );
};
export default AddressesList;
