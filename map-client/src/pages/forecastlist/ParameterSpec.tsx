import { capitalize } from '@material-ui/core'


export default interface ParameterSpec {
    name: string
    displayName?: string
}

export function displayName(p: ParameterSpec): string {
    return capitalize(`${p.displayName || p.name}`).replaceAll('_', ' ')
}
