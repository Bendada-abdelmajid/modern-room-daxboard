import React from "react";
import { BsTruck } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { CiWarning } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import Taskboard from "../components/Taskboard";
import AreaChart from "../components/AreaChart";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { BiMoney } from "react-icons/bi";
export default function Daxboard() {
  require("./daxboard.css")
  const Data = [
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
    {
      image: "/img/u1.png",
      name: "abdelmajid bendada",
      price: "200",
      date: "15/10/2025",
      phone: "0612345789",
      complet: true,
    },
  ];

  return (
    <section className="daxboard scrollY">
        <div className="d-cards">
          <div className="d-card space-b card">
            <div className="icon center">
              <HiOutlineUsers />
            </div>
            <div>
              <h4>100</h4>
              <p>users</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <BsCurrencyDollar />
            </div>
            <div>
              <h4>2000 $</h4>
              <p>Total Revenue</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <GrCompliance />
            </div>
            <div>
              <h4>150</h4>
              <p>orders complet</p>
            </div>
          </div>
          <div className="d-card space-b card">
            <div className="icon center">
              <CiWarning />
            </div>
            <div>
              <h4>10</h4>
              <p>orders Not complet</p>
            </div>
          </div>
        </div>

      <div className="dax-grid">
       
        <AreaChart  />
        <PieChart   />
        <BarChart />
        <div className="card scrollY top-orders">
          <table>
            <tbody>
              {Data.map((item, index) => (
                <tr key={index}>
                
                  <td width={80}>
                    <img className="c-img" src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.phone}</td>
                  <td>{item.date}</td>
                  <td>
                    <button>{item.complet ? "complet" : "uncompletd"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
