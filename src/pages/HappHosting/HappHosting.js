import React from 'react'
import { isEmpty } from 'lodash'
import './HappHosting.module.css'
import Header from 'components/Header'

export default function HappHosting ({ allAvailableHapps = [], history: { push } }) {
  const sortedHapps = allAvailableHapps.sort((a, b) => a.isEnabled ? -1 : b.isEnabled ? 1 : 0)

  return <div>
    <Header title='hApps' {...push} />

    {!isEmpty(sortedHapps) && <div styleName='happ-list' role='list'>
      {sortedHapps.map(happ => <HappRow happ={happ} key={happ.id} />)}
    </div>}
  </div>
}

export function HappRow ({ happ }) {
  const { title, description, thumbnailUrl, homepageUrl, isEnabled } = happ
  return <div styleName='happ-row' role='listitem'>
    <img src={thumbnailUrl} styleName='icon' alt={`${title} icon`} />
    <div styleName='details'>
      <div styleName='title-row'>
        <span styleName='title'>{title}</span>
        {isEnabled && <span styleName='is-hosted'>Hosted</span>}
      </div>
      <a styleName='homepage' href={homepageUrl}>Home Page</a>
      <div styleName='description'>{description}</div>
    </div>
  </div>
}
