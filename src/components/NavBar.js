import {React, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import navIcon1 from '../assets/img/icons8-gmail-48.png';
import navIcon2 from '../assets/img/icons8-github-48.png';
import navIconJP from '../assets/img/icons8-jp-50.png';
import navIconEN from '../assets/img/icons8-eng-50.png';



function NavBar(props) {
    const[activeLink, setActiveLink] = useState('home');
    const[scroll, setScroll] = useState(false);
    const onUpdateActiveLink = (name) => {
        setActiveLink(name);
    }

    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 50){
                setScroll(true);
            }else{
                setScroll(false);
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])
  return (
    <div>
    <Navbar expand="lg" className={scroll ? "scrolled" : ""}>
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className='navbar-toggler-icon'/>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="/kitchen" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link' } onClick={() => onUpdateActiveLink('about')}>Kitchen</Nav.Link>
            <Nav.Link href="/#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Menu</Nav.Link>
          </Nav>
          
          <span className='navbar-text'>
            <div className='social-icon'>
                <a href='#' onClick={() => navigator.clipboard.writeText('ankscrisp0505@gmail.com')}><img src={navIcon1} alt=''/></a>
                <a href='https://github.com/CrispyAnks'><img src={navIcon2} alt=''/></a>
                <a href='#' onClick={props.onClick}><img src={props.lan === 'eng' ? navIconEN : navIconJP} alt=''/></a>
               
            </div>
            {/* <button className="vvd" onClick={() => console.log('connect')}>
                <span>Let's connect</span>
            </button> */}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar
