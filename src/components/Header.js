import React from 'react'
import image from"../images/kanban.png"
export default function Header() {
  return (
    <div className="app-header">
  <img src={image} alt="Logo" />
  <h1>The Agility Quiz</h1>
</div>
  )
}
