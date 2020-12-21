import SearchBox from './SearchBox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

import { HashLink } from 'react-router-hash-link';

export default function Navbar() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;
    return (
        <div>
            <div className="navbar navbar-inverse" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="navbar-header ">
                                <button className="navbar-toggle" data-target="#mobile_menu" data-toggle="collapse"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                                <Link to="/" className="navbar-brand" style={{ paddingTop: "26px" }}>ShopZone</Link>
                            </div>
                            <div className="navbar-collapse collapse" id="mobile_menu">
                                <ul className="nav navbar-nav">
                                    <li data-toggle="collapse" data-target=".navbar-collapse" className="active"><Link to="/" style={{ backgroundColor: "#1b60a5", paddingBottom: "7px", paddingTop: "15px", borderRadius: "3px" }}>Home</Link></li>
                                    <li><Link to="#" className=" glyphicon glyphicon-list dropdown-toggle " data-toggle="dropdown" style={{ paddingTop: "12px" }}> <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', paddingTop: "50px" }}>Categories </span><span className="caret"></span></Link>
                                        <ul className="dropdown-menu">
                                            {loadingCategories ? (
                                                <LoadingBox></LoadingBox>
                                            ) : errorCategories ? (
                                                <MessageBox variant="danger">{errorCategories}</MessageBox>
                                            ) : (
                                                        categories.map((c) => (
                                                            <li data-toggle="collapse" data-target=".navbar-collapse" key={c}>
                                                                <Link
                                                                    to={`/search/category/${c}`}
                                                                >
                                                                    {c}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    )}
                                        </ul>
                                    </li>
                                    <li data-toggle="collapse" data-target=".navbar-collapse"> <HashLink smooth to="/#featuredProducts">Featured Products</HashLink></li>
                                    <li data-toggle="collapse" data-target=".navbar-collapse"><a href="/#topSeller">Top Sellers</a></li>
                                    {/* <li><a >Contact Us</a></li> */}
                                </ul>
                                <div>
                                    <Route
                                        render={({ history }) => (
                                            <SearchBox history={history}></SearchBox>
                                        )}
                                    ></Route>
                                </div>
                                <ul className="nav navbar-nav navbar-right">
                                    <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"></span> Cart  {cartItems.length > 0 && (
                                        <span classNameName="badge">{cartItems.length}</span>
                                    )}</Link></li>
                                </ul>
                                {userInfo ? (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><Link to="#" className=" glyphicon glyphicon-arrow-right dropdown-toggle " data-toggle="dropdown" style={{ paddingTop: "12px" }}> <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', paddingTop: "50px" }}> {userInfo.name} </span><span className="caret"></span></Link>
                                            <ul className="dropdown-menu">
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/profile">User Profile</Link></li>
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/orderhistory">Order History</Link></li>
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                ) : (
                                        <ul className="nav navbar-nav navbar-right">
                                            <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/signin" ><span className="glyphicon glyphicon-log-in"></span> Login / Sign Up </Link>

                                            </li>
                                        </ul>
                                    )}
                                {userInfo && userInfo.isSeller && (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><Link to="#admin" className=" glyphicon glyphicon-arrow-right dropdown-toggle " data-toggle="dropdown" style={{ paddingTop: "12px" }}> <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', paddingTop: "50px" }}>Seller</span><span className="caret"></span></Link>
                                            <ul className="dropdown-menu">
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/productlist/seller">Products</Link></li>
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/orderlist/seller">Orders</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><Link to="#admin" className=" glyphicon glyphicon-user dropdown-toggle " data-toggle="dropdown" style={{ paddingTop: "12px" }}> <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', paddingTop: "50px" }}>Admin</span><span className="caret"></span></Link>
                                            <ul className="dropdown-menu">
                                                {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/productlist">Products</Link></li>
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/orderlist">Orders</Link></li>
                                                <li data-toggle="collapse" data-target=".navbar-collapse"><Link to="/userlist">Users</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
