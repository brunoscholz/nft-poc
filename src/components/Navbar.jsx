import { Link } from 'react-router-dom'
import { useAppState } from '../contexts/AppState'
import { accountSelector } from '../store/selectors'

const Navbar = () => {
  const [ state ] = useAppState()
  const account = accountSelector(state)

  return (
    <>
      <header id="header">
        <span className="logged-user">address: {account}</span>
        <div className="inner">
            <Link to="/home" className="logo">
              <span className="symbol"><img src="../images/logo.svg" alt="" /></span><span className="title">NFT Marketplace</span>
            </Link>

            <nav>
              <ul>
                <li><a href="#menu">Menu</a></li>
              </ul>
            </nav>
        </div>
      </header>
      <nav id="menu">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create">Mint</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar