import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import axios from "axios";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [categories, setCategories] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const menuRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        const data = response.data;

        const formattedCategories = data.map((item) => ({
          id: item.id,
          name: capitalize(item.name),
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentMenu = pathSegments[1];
    setMenu(currentMenu);
  }, [location.pathname]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>uniq</p>
        </div>
      </Link>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li className={menu === "shop" ? "active" : ""}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={menu === category.name ? "active" : ""}
          >
            <Link
              style={{ textDecoration: "none" }}
              to={`/categories/${category.id}/products`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <>
            <div className="nav-user-info">
              <span className="username">{user}</span>
              <button type="button" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
