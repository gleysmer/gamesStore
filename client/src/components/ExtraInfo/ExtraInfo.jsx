import React from "react";
import { Link } from "react-router-dom";
import {
  FaInfoCircle,
  FaPaypal,
  FaGift,
  FaCreditCard,
  FaStar,
  FaLocationArrow,
  FaTruck,
  FaCalendarAlt,
} from "react-icons/fa";
import "./ExtraInfo.css";


export default function ExtraInfo() {
  return (
    <div className="wholeBox">
      <div className="extraInfo">
        <ul>
          <div className="helpAndContact">
            <h2>
              <FaInfoCircle /> Help & Contact
            </h2>

            <Link className="allTopics">See all help topics</Link>

            <Link>
              <button className="infoExButton">
                <h6 className="infoExContent">Paying by invoice</h6>
              </button>
            </Link>

            <Link>
              <button className="infoExButton">
                <h6 className="infoExContent">Track your parcel</h6>
              </button>
            </Link>

            <Link>
              <button className="infoExButton">
                <h6 className="infoExContent">Report a damaged item</h6>
              </button>
            </Link>

            <Link>
              <button className="infoExButton">
                <h6 className="infoExContent">Delivery information</h6>
              </button>
            </Link>

            <Link>
              <button className="infoExButton">
                <h6 className="infoExContent">Return an order</h6>
              </button>
            </Link>
          </div>
          <div className="giftCards">
            <h2>
              <FaGift /> Gift Cards
            </h2>
              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Buy Gift Cards</h6>
                </button>
              </Link>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">
                    About gift cards and vouchers
                  </h6>
                </button>
              </Link>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Redeem a Gift Card</h6>
                </button>
              </Link>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Corporate Gift Cards</h6>
                </button>
              </Link>
          </div>

          <div className="aboutUs">
            <h2>
              <FaLocationArrow /> About us
            </h2>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Jobs</h6>
                </button>
              </Link>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Partner Program</h6>
                </button>
              </Link>

              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">Marketing services</h6>
                </button>
              </Link>
          </div>
          <div className="shippingPartners">
            <h2>
              <FaTruck /> Our shipping partners
            </h2>
                <h6 className="infoExButton">imagen HDL</h6>
                <h6 className="infoExButton">imagen de ups</h6>
          </div>
          <div className="payment">
            <h2>
              <FaCreditCard /> Our payment methonds
            </h2>
            <div>
              <h6>imagen de paypal</h6>
              <h6>imagen de mercadopago</h6>
            </div>
          </div>

          <div className="ourPromises">
            <h2>
              <FaStar /> Our promises
            </h2>
              <Link>
                <button className="infoExButton">
                  <h6 className="infoExContent">

                    {" "}
                    <FaTruck /> Free delivery and returns
                  </h6>
                </button>
              </Link>
              <Link>

                <button className="infoExButton">
                  <h6 className="infoExContent">

                    <FaCalendarAlt /> 100-day return policy
                  </h6>
                </button>
              </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
