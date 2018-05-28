

import createHistory from 'history/createBrowserHistory'

export default createHistory()


export const sameHistoryLocation = (props, nextProps) => {
  if ((nextProps.location.key !== props.location.key) &&
    (nextProps.location.pathname === props.location.pathname)) return true
  return false
}