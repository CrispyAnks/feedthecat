import {React, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';
import 'animate.css';
import { Popconfirm,Tooltip } from 'antd';

function Banner(props) {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [toRotate, setToRotate] = useState(['Java Engnieer', 'Web Developer', 'Full-Stack Engineer']);
    const [lan, setLan] = useState('eng');
    const toRotateJP = ['鮭','りんご','ミルク'];
    const toRotateEN = ['Salmon', 'Apple', 'Milk'];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    const [popconfirmVisible, setPopconfirmVisible] = useState(true);
    
    
    useEffect(() => {
        if(props.lan === 'jpn'){
            setToRotate(toRotateJP);
            setLan('jpn');
        }else{
            setToRotate(toRotateEN);
            setLan('eng');
        }
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);
        if(isDeleting){
            setDelta(prevDelta => prevDelta/2);
        }
        
        if(!isDeleting && updatedText === fullText){    
            setIsDeleting(true);
            setDelta(period);
        }else if(isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300);
        }
    }

  return (
    <>
      <section className='banner' id='home'>
        <Container>
            <Row className='align-items-center'>
                <Col xs={12} md={6} xl={7} >
                    <TrackVisibility>
                    {({isVisible}) => 
                        <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
                            <span className='tagline'>{lan === 'jpn' ? 'わし　お腹空いた': "I'm hungry"}</span>
                            <h1 style={{minHeight:'195px'}}>{lan === 'jpn' ? '食べたい物：':"Please feed me this:"}<br/><span className='wrap'>{text}</span></h1>
                            <p></p>
                            <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}> Let's Go <ArrowRightCircle/> </button>
                        </div>
                    }
                    
                    </TrackVisibility>
                </Col>
                <Col xs={12} md={6} xl={5}>
                <Tooltip title="Click Me!" color='yellow'>
                <Popconfirm
                    title="Status"
                    description={"Now my Happiness index is : " + props.index}
                    okText="OkOk"
                    showCancel={false}
                >
                    <img src={process.env.PUBLIC_URL + '/img/mainview.png'} alt='Header'/>
                </Popconfirm>
                </Tooltip>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default Banner
