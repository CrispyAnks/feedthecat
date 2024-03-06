import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import logo from '../assets/img/icons/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

function Footer() {
  return (
    <footer className='footer'>
        <Container>
            <Row className='aligh-item-center'>
                <Col sm={6}>
                    <img alt='logo' src={logo}/>
                </Col>
                <Col sm={6} className='text-center text-sm-end'>
                    {/* <div className='social-icon'>
                        <a href=''><img src={navIcon1}/></a>
                        <a href=''><img src={navIcon2}/></a>
                        <a href=''><img src={navIcon3}/></a>
                    </div> */}
                    <a target="_blank" href="https://icons8.com/icon/61511/%E6%97%A5%E6%9C%AC">日本</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a><br/>
                    <a target="_blank" href="https://icons8.com/icon/6991/%E3%82%A4%E3%82%AE%E3%83%AA%E3%82%B9">イギリス</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
                    <a target="_blank" href="https://icons8.com/icon/43621/apple-fruit">りんご</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
                    <a target="_blank" href="https://icons8.com/icon/83972/steak">ステーキ</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
                    <a target="_blank" href="https://icons8.com/icon/VI7OZ1rtqHyy/milk-bottle">牛乳瓶</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
                    <p>Copy Right 2024. All Right Reserved. Sei.</p>
                </Col>

            </Row>
        </Container>
      
    </footer>
  )
}

export default Footer
