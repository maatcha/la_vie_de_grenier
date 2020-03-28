import moment from 'moment'

export default value => {
  if (!value) {
    return '-'
  }
  let date = value.toDate()
  return moment(date).fromNow()
}
