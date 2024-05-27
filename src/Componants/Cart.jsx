import React, { useContext } from "react";
import { mycontext } from "../App";

const Cart = () => {
  const [data, setdata] = useContext(mycontext);
  const totalPrice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 0),
    0
  );

  const totalquantity = data.reduce(
    (total, data) => total + (data.subprice || 0),
    0
  );
  const handleIncerement = (id, quantity, price) => {
    setdata((que) => {
      return que.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            quantity: ele.quantity + 1 || quantity + 1,
            subprice: (ele.quantity + 1) * ele.price || (quantity + 1) * price,
          };
        }
        return ele;
      });
    });
  };
  const handleDecerement = (id, quantity, price) => {
    setdata((que) => {
      return que.map((ele) => {
        if (ele.id === id && quantity >0) {
          return {
            ...ele,
            quantity: ele.quantity - 1 || quantity - 1,
            subprice: (ele.quantity - 1) * ele.price || (quantity - 1) * price,
          };
        }
        return ele;
      });
    });
  };
  const remove =(id)=>{
    setdata(
      data.filter((element)=>{
        if(element.id !== id){
          return element;
        }
      })
    )
  }
  return (
    <>
      <nav>
        <h1 className="title col-sm-11 text-center">Mobile Shop Cart</h1>
        <br />
        <br />
        <h4 className="col">
          <div className="nav-i">Total Quantity :<p className="totalquantity">{totalquantity}</p></div>
          <div className="nav-i">Total Price :<p className="totalPrice">&#8377;{totalPrice}</p></div>
        </h4>
      </nav>
      {data.map((element, index) => {
        return (
          <div key={index} className="card sm-3">
            <div className="row g-2">
              <div className="col-sm-3">
                <div
                  key={element.id}
                  id={element.id}
                  className="carouselExampleAutoplaying carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner bg-dark ">
                    {element.images.map((ele, ind) => {
                      return (
                        <div key={ind}>
                          {ind === 0 ? (
                            <div className=" carousel-item active">
                              <img 
                                src={ele}
                                className="d-block"
                                alt="..."
                                width="100%"
                                height="330"
                              />
                            </div>
                          ) : (
                            <div className="carousel-item ">
                              <img
                                src={ele}
                                className="d-block"
                                alt="..."
                                width="100%"
                                height="330"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="card-body">
                  <p className="float-end btn-group" role="group">
                    <button
                      className="btn"
                      onClick={() =>
                        handleIncerement(element.id ,element.quantity || 0, element.price || 0)
                      }
                    >
                      {" "}
                      +
                    </button>
                    <div className="btnq bg-secondary">{element.quantity} </div>
                    <button
                      className="btn"
                      onClick={() =>
                        handleDecerement(element.id, element.quantity || 0, element.price || 0)
                      }
                    >
                      -
                    </button>
                  </p>
                  <h1 className="card-title" >{element.title}</h1>
                  <h4 className="card-text">Brand : {element.brand}</h4>
                  <h4 className="card-text"> Category : {element.category}</h4>
                  
                  <h5 className="card-text"><b>description</b> :
                  {element.description}</h5>
                  <h4 className="card-text"> Rating : {element.rating}</h4>
                  <h5 className="card-text"> Avilable Stock : {element.stock}</h5>

                  <div className="card-text price">
                     Price of the Products :&nbsp;{" "}
                     <div className="value"> &#8377;{element.price}</div>
                     </div>
                     <div className="card-text price">
                      Total Price of the Product :&nbsp;{" "}
                      <div className="value">&#8377;{element.subprice}</div>
                     </div>
                </div>
                <div>
                  <button className="remove" onClick={()=> remove(element.id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Cart;
