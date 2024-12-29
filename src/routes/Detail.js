import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { tab } from "@testing-library/user-event/dist/tab";
import { Context1 } from "../App";
import { addProduct } from "../store/carts";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

// let YellowBtn = styled.button`
//     background: ${props => props.bg};
//     color: ${props => props.bg == 'blue' ? 'white' : 'black'};
//     padding: 10px;
// `

function Detail(props) {
    const carts = useSelector(state => (state.carts))
    const dispatch = useDispatch()
    const [fade2, setFade2] = useState('');
    const [tabIdx, setTabIdx] = useState(0);
    const [fin, setFin] = useState(false);
    const [count, setCount] = useState(0);

    const {id} = useParams();
    const shoeId = Number(id);
    const {shoes} = props;
    const shoe = shoes.find(shoe => shoe.id === shoeId);

    const watchedArray = JSON.parse(localStorage.getItem('watched'));
    if (!watchedArray.includes(shoeId))
        watchedArray.push(shoeId);  
    localStorage.setItem('watched', JSON.stringify(watchedArray));

    useEffect(() => {
        // 2초 후에 'fin' 상태를 true로 설정
        const timer = setTimeout(() => {
            setFin(true);
        }, 2000);
        
        // 컴포넌트가 언마운트되면 타이머 정리
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // setFade2('end')
        setTimeout(() => {setFade2('end')}, 100)
        return () => {
            setFade2('')
        }
    }, [])

    if (!shoe) {
        return <p>Invalid product ID.</p>; // id가 NaN일 경우 처리
    }


    return (
        <div className={`container start ${fade2}`}>
            {/* <YellowBtn bg='blue'>버튼</YellowBtn>
            <YellowBtn bg='white'>버튼</YellowBtn> */}
            { fin ? <></> :
                <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div>
            }
            <p>{count}</p>
            <button onClick={() => {setCount(count+1)}}>plus</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${shoe.id+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addProduct(shoe)); 
                    }}>주문하기</button> 
                </div>
            </div>
            
            <Nav variant="tabs" activeKey={tabIdx} onSelect={(selectedTab) => setTabIdx(Number(selectedTab))}>
                <Nav.Item>
                    <Nav.Link eventKey="0">tab0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1">tab1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2">tab2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tabIdx = {tabIdx} shoes={shoes}/>
        </div> 
    )
}

function TabContent({tabIdx, shoes}) {
    const [fade, setFade] = useState('')
    // if (tabIdx == 0) {
    //     return <div> 내용0 </div>
    // } else if (tabIdx == 1) {
    //     return <div> 내용1 </div>
    // } else if (tabIdx == 2) {
    //     return <div> 내용2 </div>
    // }

    useEffect(() => {
        setTimeout(() => {setFade('end')}, 100)
        return () => {
            setFade('')
        }
    }, [tabIdx])

    return <div className={`start ${fade}`}>
        {[<div>{shoes[0].content}</div>, <div>내용1</div>, <div>내용2</div>][tabIdx]}
    </div>
}

export default Detail;