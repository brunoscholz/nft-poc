import { Link } from 'react-router-dom'
import { useAppState } from '../contexts/AppState'
import { accountSelector } from '../store/selectors'

const Navbar = () => {
  const [state] = useAppState()
  const account = accountSelector(state)

  return (
    <>
      <header id='header'>
        <span className='logged-user'>address: {account}</span>
        {
          (!account || account === '') &&
          <div className='note'>
            <div className='error'>
              <p>You need your metamask extension connected to the site, on the Goerli network.</p>
              <p>Install the metamask extension: <a href='https://metamask.io/download/'>Metamask Download</a>.</p>
              <p>Connect your account to the website ( account settings &gt; connected sites )</p>
              <p>Copy your account address and use this <a href='https://goerli-faucet.pk910.de/'>faucet</a> to get some (fake) ether.</p>
              <p>Now you can create/bid/buy nfts!</p>
            </div>
          </div>
        }
        <div className='inner'>
          <Link to='/home' className='logo'>
            <span className='symbol'>
              <img src='../images/logo.svg' alt='' />
            </span>
            <span className='title'>Kitten Adventures NFT Marketplace</span>
          </Link>

          <nav>
            <ul>
              <li>
                <a href='#menu'>Menu</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <nav id='menu'>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/create'>Mint</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
