import tLogo from "../../assets/3205.png";
import cls from './Header.module.scss';

const Header = () => {
	return (
		<header className={cls.header}>
			<div className={cls.logo}>
				<a href="https://3205.team/" target="_blank">
					<img src={tLogo} alt="3205 logo" />
				</a>
			</div>
			<h1>Поиск пользователей по электронной почте и шестизначному номеру</h1>
		</header>
	)
}

export default Header;
