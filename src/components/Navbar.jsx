// import { useAppState } from '../contexts/AppState'

const Navbar = () => {
  // const [ state ] = useAppState()

  return (
    <section id="sidebar">
      <div className="inner">
        <nav>
          <ul>
            <li><a href="#intro">Welcome</a></li>
            <li><a href="#one">Who we are</a></li>
            <li><a href="#two">What we do</a></li>
            <li><a href="#three">Get in touch</a></li>
            {/* <a
            className='nav-link small'
            href={`https://etherscan.io/address/${state.account}`}
            target="_blank"
            rel="noreferrer"
          >
            {state.account}
          </a> */}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Navbar