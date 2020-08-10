import React from "react";
import {Link, NavLink} from "react-router-dom";
import i18next from '../../translations';
import UserProfile from "../UserProfile";
import NavBarCart from "../order/NavBarCart";
import CurrencySwitch from "./CurrencySwitch";

class Menu extends React.Component {
    render() {
        return (
            <nav className="Menu navbar sticky-top navbar-expand-sm navbar-light bg-warning">
                <NavLink className="navbar-brand" to="/">{i18next.t('layout.title')}</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navBarProductsDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {i18next.t('layout.menuProducts')}
                            </NavLink>
                            <div className="dropdown-menu" aria-labelledby="navBarProductsDropdown">
                                <Link className="dropdown-item" to="/#pizza">{i18next.t('layout.menuProductsPizza')}</Link>
                                <Link className="dropdown-item" to="/#snacks">{i18next.t('layout.menuProductsSnacks')}</Link>
                                <div className="dropdown-divider"/>
                                <Link className="dropdown-item" to="/#drinks">{i18next.t('layout.menuProductsDrinks')}</Link>
                            </div>
                        </li>
                        <UserProfile />
                        <NavBarCart />
                        <CurrencySwitch />
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;