import React from 'react'
import Button from 'components/Button'
import './Header.module.css'

export default function Header ({ title, push }) {
  const goToMenu = () => push('/menu')

  return <div>
    <div styleName='header'>
      <span styleName='title'>{title}</span>
      <Button onClick={goToMenu} styleName='menu-button'>Menu</Button>
    </div>
  </div>
}
