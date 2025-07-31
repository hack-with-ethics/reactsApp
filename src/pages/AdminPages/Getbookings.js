import "../../ProjCss/AdminCss/AdminBook.css"
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
function Getbookings(){
    
    return(<>
        <div id="admin_booking_outerCont" className="container">
            <div className="row" id="admin_booking_userCont">
                <div className="col-4">
                    <input id="admin_inps" type="text" placeholder="Enter the Username "></input>
                </div>
                <div className="col ms-6">
                    <button id="admin_btns">Get Bookings <IoTicketSharp /></button>
                </div>
            </div>
        </div>

    </>)
}

export default Getbookings;