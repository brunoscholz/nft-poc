// import { useAppState } from '../contexts/AppState'

const Navbar = () => {
  // const [ state ] = useAppState()

  return (
    <>
      <header id="header">
        <div className="inner">
            <a href="index.html" className="logo">
              <span className="symbol"><img src="../images/logo.svg" alt="" /></span><span className="title">Phantom</span>
            </a>

            <nav>
              <ul>
                <li><a href="#menu">Menu</a></li>
              </ul>
            </nav>
            {/* <a
              className='nav-link small'
              href={`https://etherscan.io/address/${state.account}`}
              target="_blank"
              rel="noreferrer"
            >
              {state.account}
            </a> */}
        </div>
      </header>
      <nav id="menu">
        <h2>Menu</h2>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="generic.html">Ipsum veroeros</a></li>
          <li><a href="generic.html">Tempus etiam</a></li>
          <li><a href="generic.html">Consequat dolor</a></li>
          <li><a href="elements.html">Elements</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar