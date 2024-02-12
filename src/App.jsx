import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>
        holaaaa
      </h1>
      <Button variant="secondary">Secondary</Button>{' '}
    </div>
  )
}

export default App
