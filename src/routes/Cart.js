import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseAge } from "../store/userSlice";
import { increaseCount, decreaseCount } from "../store/carts";

function Cart() {
    const state = useSelector((state) => state);
    const {user, carts} = state;
    let dispatch = useDispatch()

    return (
        <div>                        
            {/* {user.name} 의 장바구니 {user.age} 살임
            <button onClick={() => {
                dispatch(increaseAge(2))
            }}>바꿔</button> */}
            <h3>장바구니</h3>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carts.map((cart, cartIdx) => {
                            return (
                                <tr key={cartIdx}>
                                    <td>{cart.id}</td>
                                    <td>{cart.name}</td>
                                    <td>{cart.count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(increaseCount(cart.id))
                                        }}>+</button>
                                        <button onClick={() => {
                                            dispatch(decreaseCount(cart.id))
                                        }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart