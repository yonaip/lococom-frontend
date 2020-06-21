import React from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { fade, makeStyles, createMuiTheme,  ThemeProvider, } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { teal } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },  
    textField: {
        background: "black",
    },
    input: {
        color: 'white',
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: teal,
    },
});

const searchHistory = [
    {description: 'Eisbachwelle', latitude: 48.142690, longitude: 11.590240},
    {description: 'Wendelstein', latitude: 47.671470, longitude: 12.014710}
]

export default function SearchFieldComponent() {
    const [address, setAddress] = React.useState("");

    const handleSelect = async (value) => {};

    const classes = useStyles();

    return (
      <div>
          <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
          >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                  <div className={classes.root}>
                      <Autocomplete
                          id="searchPlaces"
                          freeSolo
                          disableClearable
                          options={searchHistory.map((option) => option.description)}
                          renderInput={(params) => (
                              <ThemeProvider theme={theme}>
                                  <TextField
                                      {...params}
                                      placeholder="Search..."
                                      type="search"
                                      variant="outlined"
                                      InputProps={{
                                          className: classes.input,
                                          ...params.InputProps, type: 'search',
                                          startAdornment: (
                                              <InputAdornment position="start">
                                                  <SearchIcon />
                                              </InputAdornment>
                                          ),
                                          endAdornment: (
                                              <React.Fragment>
                                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                  {params.InputProps.endAdornment}
                                              </React.Fragment>
                                          ),
                                      }}
                                  />
                              </ThemeProvider>
                          )}
                      />
                  </div>
              )}
          </PlacesAutocomplete>
      </div>
    );

}