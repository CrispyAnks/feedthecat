import { React} from 'react'
import { Container,Row,Col,Nav, Tab } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import 'animate.css';


function Projects(props) {
   
  return (
    <section className='project' id='projects'>
        
        <Container>
            <Row>
                <Col>
                
                    <h2>Menu</h2>
                    <br/>
                   
                <Tab.Container id='projects-tabs' defaultActiveKey='first'>
                    <Nav variant='pills' className='nav-pills mb-5 justify-conten-center align-items-center' id='pills-tab'>
                        <Nav.Item>
                            <Nav.Link eventKey='first'>Fruits</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='second'>Meats</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='third'>Drinks</Nav.Link>
                        </Nav.Item>
                        
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey='first'>   
                            <Row>
                            {Array.isArray(props.data) && props.data.map((data) => {
                                
                                        if (data.type === 1) {
                                            return  <ProjectCard key={data.key} project={data} addToCart={props.addToCart} removeFromCart={props.removeFromCart}/>;
                                        } else {
                                            return null;
                                        }
                                    })}
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey='second'>
                        <Row>
                        {Array.isArray(props.data) && props.data.map((data) => {
                                        if (data.type === 2) {
                                            
                                            return  <ProjectCard key={data.key} project={data} addToCart={props.addToCart} removeFromCart={props.removeFromCart}/>;
                                        } else {
                                            return null;
                                        }
                                    })} 
                        </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey='third'>
                        <Row>
                                {Array.isArray(props.data) && props.data.map((data) => {
                                        if (data.type === 3) {
                                            return  <ProjectCard key={data.key} project={data} addToCart={props.addToCart} removeFromCart={props.removeFromCart}/>;
                                        } else {
                                            return null;
                                        }
                                    })}
                        </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
                
                </Col>
            </Row>
        </Container>
       
    </section>
      
  )
}

export default Projects
