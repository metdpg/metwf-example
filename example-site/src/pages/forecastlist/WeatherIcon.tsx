import React from 'react';
import weather_icon_legends from './weather_icon_legends.json'


function WeatherIcon(props: { symbolCode?: string, width: string}) {
    if (props.symbolCode === undefined) {
        return <div />
    }
    const imageLocation = `/icons/weather/svg/${props.symbolCode}.svg`

    var description: string | undefined
    const plainSymbol = props.symbolCode.split('_')[0]
    // @ts-ignore
    const symbolLegends = weather_icon_legends[plainSymbol]
    if (symbolLegends !== undefined) {
        // @ts-ignore
        description = symbolLegends.desc_en
    }
    if (description === undefined) {
        description = "???"
    }

    return (
        <img src={imageLocation} alt={description} title={description} width={props.width}></img>
    );
}

export default WeatherIcon