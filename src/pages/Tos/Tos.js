import React from 'react'
import Button from 'components/Button'
import { string } from 'prop-types'
import './Tos.module.css'

export default function Tos ({
  tos,
  history: { push }
}) {
  const returnToSettings = () => push('/settings')
  const goToMenu = () => push('/menu')

  return <div styleName='tos-container'>
    <div styleName='header'>
      <span styleName='title'>hApps</span>
      <Button onClick={goToMenu} styleName='menu-button'>Menu</Button>
    </div>

    <main>
      <h1>Terms of Service</h1>
      <p>{tos}</p>
    </main>

    <Button onClick={returnToSettings}>Return to Settings</Button>
  </div>
}

Tos.propTypes = {
  tos: string
}