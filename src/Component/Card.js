import { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./contextReducer"
import {  useNavigate } from "react-router-dom";

export default function Card(props) {
    let dispatch = useDispatchCart()
    const data = useCart()
    console.log(data);
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const Navigate=useNavigate()
    

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size]);

    const AddToCard = async () => {
        if (!localStorage.getItem("email")) {
            Navigate("/login");
            return;
        }else{
        
        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break;
            }
        }
        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
            }
        else if( food.size !== size){
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size,img:props.foodItems.img })
        return
        // await console.log(data)
        }
        return
    }
    await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size ,img:props.foodItems.img})
    }}
   
    return (
        <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "400px" }} >
            <img src={props.foodItems.img} className="card-img-top h-200px" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItems.name}</h5>
                <p className="card-text">{props.foodItems.description}</p>
                <div className="container w-100">
                    <select className="m-2 h-100  bg-success" onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {
                            priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })
                        }

                    </select>
                    <div className="d-inline h-100 fs-5">
                        ₹{finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className={'btn btn-success justify-center ms-2'} onClick={AddToCard}>Add to Card</button>
            </div>
        </div>
    )
}