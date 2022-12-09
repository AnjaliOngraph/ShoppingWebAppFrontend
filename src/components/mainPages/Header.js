import Navbar from "./Navbar";

import bgimage from "../images/shopping-cart-grocery-store.jpg";

export default function Header() {
  return (
    <div>
      <Navbar />
      <img className="bg-local w-screen h-screen" src={bgimage} alt="" />
    </div>
  );
}
