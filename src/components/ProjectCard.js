import {React, useEffect, useState} from 'react';
import { Col } from 'react-bootstrap';
import { motion} from 'framer-motion';
import { Button, Flex, Card} from 'antd';


function ProjectCard(props) {
  const { Meta } = Card;
  const boxStyle = {
    width: '100%'
  };
  const [project, setProject] = useState(props.project);
  
  useEffect(() => {
    setProject(props.project);
    
  }, [props.project]);
 
  return (
    <>
    
      <Col className='projbox'>
      <motion.div
                                initial={{ x: 0, y: 50 }}
                                whileInView={{x:0, y:0}}                                
                                transition={{ duration: 0.7, delay: project.index * 0.1 }}
                                >
      <Card
      style={{ width: 240,padding:0 }}
      cover={<img alt="example" src={project.image} />}
      >
        <Meta title={project.name} description={project.description} />
        <Flex style={boxStyle} justify={'flex-end'} align={'center'}>          
          <Button type="dashed" shape="circle" onClick={() => {props.addToCart(project)}}>+</Button>
          <div style={{margin:'10px'}}>{project.number}</div>
          <Button type="dashed" shape="circle" onClick={() => props.removeFromCart(project)}>-</Button>
          </Flex>
      </Card> 
      </motion.div>       
      </Col>
    
       
    </>
  )
}

export default ProjectCard
