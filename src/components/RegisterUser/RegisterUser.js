import React, { useEffect } from 'react'
import { get } from 'lodash/fp'

export function RegisterUser ({ children, registerHostingUser, hostingUser }) {
  const isRegistered = get('isRegistered', hostingUser)

  useEffect(() => {
    if (!hostingUser) return
    if (isRegistered) return
    registerHostingUser()
  })

  if (hostingUser && isRegistered) {
    return children
  } else {
    return <h1>Registering User</h1>
  }
}

export default RegisterUser
