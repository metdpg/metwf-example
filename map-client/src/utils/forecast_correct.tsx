export default function correct(parameter: string, units: string, value: number): number {
    switch (units) {
        case "celsius":
            return correctTemperature(value)
        case "%":
            return correctFraction(value)
        case "mm":
            return correctAboveZero(value)
    }
    return value
}

function toKelvin(temperatureInCelsius: number): number {
    return temperatureInCelsius - 273.15
}

function toCelsius(temperatureInKelvin: number): number {
    return temperatureInKelvin + 273.15
}

function correctTemperature(value: number): number {
    const k = toKelvin(value)
    const corrected = k + k * 0.007
    return toCelsius(corrected)
}

function correctFraction(value: number): number {
    return correctWithinRange((v) => v + v * 0.025, value, 0, 100)
}

function correctAboveZero(value: number): number {
    return correctWithinRange((v) => v + v * 0.25, value, 0, 1000)
}

function correctWithinRange(f: { (value: number): number }, value: number, min: number, max: number) {
    value = f(value)
    if (value < min)
        return min
    if (value > max)
        return max
    return value
}