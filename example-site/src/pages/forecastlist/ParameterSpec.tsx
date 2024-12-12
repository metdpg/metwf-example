import { capitalize } from '@mui/material'


export default interface ParameterSpec {
    name: string
    displayName?: string
}

export function displayName(p: ParameterSpec): string {
    return capitalize(`${p.displayName || p.name}`).replaceAll('_', ' ')
}
