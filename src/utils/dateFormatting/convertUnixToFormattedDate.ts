const convertUnixToFormattedDate = (unixTimestamp: number) => {
  const dateObj = new Date(unixTimestamp * 1000)
  const date = dateObj.toISOString().split('T')[0]
  const time = dateObj.toTimeString().split(' ')[0]
  const formattedDate = `${date} ${time} GMT`
  return formattedDate
}

export default convertUnixToFormattedDate
