import { useState } from "react";
function ButtonIncrement(props) {
  return (
    <button
      className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-1 px-2"
      onClick={props.onClickFunc}
    >
      +
    </button>
  );
}
function ButtonDecrement(props) {
  return (
    <button
      onClick={props.onClickFunc}
      className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-1 px-3"
    >
      -
    </button>
  );
}

function Display(props) {
  return <label className="w-8 h-8 p-2">{props.message}</label>;
}

function IncDec(props) {
    const productsInCart = JSON.parse(localStorage.getItem("cart"));
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);

  if (counter <= 1) {
console.log(props.id,"p")

// productsInCart.map((product)=>{
//     if(props.id=== product._id){
//         console.log("")
// }
 
//   }
// )
}
 
  return (
    <div>
      <ButtonIncrement onClickFunc={incrementCounter} />
      <Display message={counter} />
      <ButtonDecrement onClickFunc={decrementCounter} />
    </div>
  );
}
export default IncDec;
