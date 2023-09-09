export const formatDate = (Datestring: string) => {
  const date = new Date(Datestring)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
