import {Color, createTheme, SimplePaletteColorOptions} from "@mui/material";

function createProjectTheme(primary: SimplePaletteColorOptions | Partial<Color> | undefined = undefined, 
  secondary: SimplePaletteColorOptions | Partial<Color> | undefined = undefined) {
    return createTheme({
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

export default (createProjectTheme);