
const Header=()=>{
     return(
        <div className="flex  justify-between items-center  border-b-4 pb-4 border-black">
             <img className="h-20  ml-5 rounded-full" alt="hello" src="https://i.pinimg.com/736x/b7/87/6f/b7876f8aaa55d1c9bc19f96650dad0c1.jpg
             " />

             <ul className="flex ml-4">
                <li className="mr-4">Home</li>
                <li className="mr-4">Features</li>
                <li className="mr-4">Pricing</li>
                <li className="mr-4">Blog</li>
             </ul>

             <div className="mr-10 ">
                 <select className="text-white px-2 py-1 mr-4 bg-transparent rounded-lg border border-white">
                    <option className="text-black" value="usd">USD</option>
                    <option className="text-black" value="euro">EURO</option>
                    <option className="text-black" value="inr">INR</option>
                 </select>

                 <button className="bg-white px-4 py-2 font-bold text-black rounded-lg">SignUp</button>
             </div>
        </div>
     )
}

export default Header;