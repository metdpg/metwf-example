import {Color, createMuiTheme, SimplePaletteColorOptions} from "@material-ui/core";

function createTheme(primary: SimplePaletteColorOptions | Partial<Color> | undefined = undefined, 
  secondary: SimplePaletteColorOptions | Partial<Color> | undefined = undefined) {
    return createMuiTheme({
        palette: {
            primary: Object.assign({}, primary, {
                // special primary color rules can be added here
            }),
            secondary: Object.assign({}, secondary, {
                // special secondary color rules can be added here
            }),
            // error: will use the default color
        },
    });


}

export default (createTheme);