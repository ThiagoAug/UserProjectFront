import './App.css'
import Header from './components/Header/header'
import SideNavigation from './components/Sidebar/sidebar'
import { MenuInitial } from './pages/menu'


function App() {

  return (
    <>
      <Header />
      <div className='side-container'>
        <SideNavigation />
        <MenuInitial />
      </div>
    </>
  )
}

export default App
