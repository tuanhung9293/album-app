export const toCapitalize = (str: string): string => { // from 'hello world' to 'Hello world'
  return str[0].toUpperCase() + str.substr(1)
}
