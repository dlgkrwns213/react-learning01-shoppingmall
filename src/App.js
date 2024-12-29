import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import Cart from './routes/Cart.js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  const [stocks, setStocks] = useState([10, 11, 12])
  let navigate = useNavigate();
  let [btnCnt, setBtnCnt] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // localStorage 설정
    if (localStorage.getItem('watched') === null)
      localStorage.setItem('watched', JSON.stringify([]));
  }, []);

  // console.log(shoes);
  

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>Backspace</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      {/* <div className='main-bg' style={{backgroundImage: `url(${bgImg})`}}></div> */}

      {/* <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link> */}

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>

            <Container>
              <Row>
                {
                  shoes.map((shoe, index) => (
                    <Col sm={4} key={index}>
                      <Shoes shoe={shoe}></Shoes>
                    </Col>
                  ))
                }
              </Row>
            </Container>
          </>
        }/>

        {/* <Route path='/detail/:id' element={
          <Context1.Provider value={{stocks}}>
            <Detail shoes={shoes}/>
          </Context1.Provider>
          } ></Route> */}
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>} ></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>

        <Route path='*' element={<div>없는 페이지</div>}></Route>
      </Routes>
      
      {location.pathname === '/' && btnCnt < 2 && (
        <button onClick={()=>{
          axios.get(`https://codingapple1.github.io/shop/data${btnCnt+2}.json`)
          .then((result)=>{
            const updateShoes = [...shoes, ...result.data];
            setShoes(updateShoes);
            setBtnCnt(btnCnt+1);            
          })
          .catch(() => {
            console.log('ajax 실패');
          })

          // // 둘다 post 하고 성공했을 때
          // Promise.all([axios.post('./url1'), axios.post('./url2')])
          // .then(()=> {

          // })

        }}>더보기</button>
      )}

    </div>
  );
}

function Shoes(props) {
  return (
    <div>
      <Link to={`/detail/${props.shoe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={`https://codingapple1.github.io/shop/shoes${props.shoe.id+1}.jpg`} width="80%"/>
        <h4>{props.shoe.title}</h4>
        <p>{props.shoe.content}</p>
        <p>가격: {props.shoe.price}원</p>
      </Link>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
