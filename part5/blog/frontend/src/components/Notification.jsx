export const Notification = ({ loginError }) => {
  let styles = {
    color: '',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
  }

  loginError.type === 'error'
    ? (styles.color = 'red')
    : (styles.color = 'green')

  return (
    <div
      className='notification'
      style={styles}
    >
      {loginError.message}
    </div>
  )
}
