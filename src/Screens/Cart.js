import React from 'react'


import { useCart, useDispatchCart } from '../Component/contextReducer';
export default function Cart() {
  
  let data = useCart();

  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
 

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("email");

    let response = await fetch("https://food-backend-jaxd.onrender.com/api/auth/orderData", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      alert("Order successfully placed! we will reveive a order check on my order history");
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div className='bg-white'>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncIVuM8iBrBuSiYAJ8D-P2KAJf9g9UPBihg&s "  alt="deleteIcon" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} style={{height:"50px"}} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Payment comform </button>
        </div>
      </div>



    </div>
  )
}