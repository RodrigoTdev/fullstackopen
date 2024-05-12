import React from 'react'

export const Notification = ({ notification }) => {
  const { type, message } = notification
  const notificationStyle = {
    success: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid green',
      color: 'green',
      padding: '5px',
      fontSize: '20px',
      fontWeight: '700',
    },
    warning: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid red',
      color: 'red',
      padding: '5px',
      fontSize: '20px',
      fontWeight: '700',
    },
  }

  return (
    <div
      style={
        type === 'success'
          ? notificationStyle.success
          : notificationStyle.warning
      }
    >
      {message}
    </div>
  )
}
