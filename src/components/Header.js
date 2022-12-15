import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ title, userEmail, onSignOut, linkTo }) {
	return (
		<header className='header'>
			<img src={logo} alt='Лого' className='header__logo' />
			<div className='header__nav'>
				{userEmail && <p className='header__email'>{userEmail}</p>}
				<Link onClick={onSignOut} className='header__link' to={linkTo}>
					{title}
				</Link>
			</div>
		</header>
	);
}

export default Header;
