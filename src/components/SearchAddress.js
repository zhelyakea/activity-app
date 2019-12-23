import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import AddressesList from "./AddressesList";

const SearchAddress = ({
  setFieldValue,
  setFieldTouched,
  handleChange,
  address,
  error,
  touched
}) => {
  const [results, setResults] = React.useState([]);
  const [excludeIDs, setExcludeIDs] = React.useState([]);
  const [typedAddress, setTypedAddress] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    searchAddress();
  };
  const handleOnchange = event => {
    setTypedAddress(event.target.value);
    setFieldTouched("address", true, false);
    handleChange(event);
    setExcludeIDs([]);
  };
  const searchAddress = () => {
    axios
      .get(`https://nominatim.openstreetmap.org/search/${typedAddress}`, {
        params: {
          format: "json",
          exclude_place_ids: excludeIDs.join(","),
          limit: "5"
        }
      })
      .then(({ data }) => {
        setResults(data);
        setExcludeIDs([...excludeIDs, ...data.map(({ place_id }) => place_id)]);
      })
      .catch(error => {
        throw new Error(error);
      });
  };
  return (
    <>
      <TextField
        required
        fullWidth
        id="address"
        label="Enter address"
        name="address"
        type="text"
        value={address}
        error={!!error && touched}
        helperText={touched ? error : ""}
        onChange={handleOnchange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                disabled={!typedAddress.length}
                aria-label="search addresses"
                onClick={handleClick}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {!!results.length && (
        <AddressesList
          {...{
            anchorEl,
            setAnchorEl,
            setFieldValue,
            setExcludeIDs,
            setTypedAddress,
            searchAddress,
            results
          }}
        />
      )}
    </>
  );
};

export default SearchAddress;
