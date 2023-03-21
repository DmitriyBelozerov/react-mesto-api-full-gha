import logo from '../images/logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
            <Switch>
                <Route exact path="/">
                    <p className="header__email">
                        {props.email}
                        <Link to="/sign-in" className="header__title" onClick={props.onOut}>
                            Выйти
                        </Link>
                    </p>

                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__title" >Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__title" onClick={props.onOut}>Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;