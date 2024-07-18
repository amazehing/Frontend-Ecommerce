import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import axios from "axios";

const NavLogo = () => (
  <Link style={{ textDecoration: "none" }} to="/">
    <div className="nav-logo">
      <img src={logo} alt="" />
      <p>uniq</p>
    </div>
  </Link>
);

const NavDropdown = ({ onClick }) => (
  <img className="nav-dropdown" onClick={onClick} src={nav_dropdown} alt="" />
);

const NavMenu = ({ menuRef, menu, categories }) => (
  <ul ref={menuRef} className="nav-menu">
    <NavItem active={menu === "shop"}>
      <Link style={{ textDecoration: "none" }} to="/">
        Shop
      </Link>
    </NavItem>
    {categories.map((category) => (
      <NavItem key={category.id} active={menu === category.name}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/categories/${category.id}/products`}
        >
          {category.name}
        </Link>
      </NavItem>
    ))}
  </ul>
);

const NavItem = ({ active, children }) => (
  <li className={active ? "active" : ""}>{children}</li>
);

const NavLoginCart = ({ user, logout, getTotalCartItems }) => (
  <div className="nav-login-cart">
    {user ? (
      <div className="nav-user-info">
        <span className="username">{user}</span>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
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
);

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

  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <NavLogo />
      <NavDropdown onClick={dropdownToggle} />
      <NavMenu menuRef={menuRef} menu={menu} categories={categories} />
      <NavLoginCart
        user={user}
        logout={logout}
        getTotalCartItems={getTotalCartItems}
      />
    </div>
  );
};

export default Navbar;
