export const formatDate = (Datestring: string) => {
  const date = new Date(Datestring)
  return `${
    Math.floor(date.valueOf() / 86400000) == Math.floor(Date.now() / 86400000)
      ? date.toLocaleTimeString()
      : date.toLocaleDateString()
  }`
}
