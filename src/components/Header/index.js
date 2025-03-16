import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="desktop-nav-bar-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="desktop-website-logo"
            />
          </Link>
          <ul className="desktop-nav-menu">
            <li className="desktop-nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="desktop-nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="desktop-logout-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <div className="mobile-nav-bar-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mobile-website-logo"
            />
          </Link>
          <ul className="mobile-nav-menu">
            <li className="mobile-nav-menu-item">
              <Link to="/" className="nav-link">
                <AiFillHome />
              </Link>
            </li>
            <li className="mobile-nav-menu-item">
              <Link to="/jobs" className="nav-link">
                <BsBriefcaseFill />
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="mobile-logout-btn"
            onClick={onClickLogout}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
