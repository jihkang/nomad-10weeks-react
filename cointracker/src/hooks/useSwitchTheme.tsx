import {useState} from "react";
import {ThemeProvider} from "styled-components";


export const themes = [{
    backgroundColor: "black",
    textColor: "whiteSmoke",
}, {
    backgroundColor: "#whiteSmoke",
    textColor: "black",
}
]

export enum themeStyle{
    dark ,
    light ,
}
