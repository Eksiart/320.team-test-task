import classNames from "classnames";
import cls from './User.module.scss'

interface UserProps {
	className?: string;
	email: string;
	number: number;
}

const UserItem = (props: UserProps) => {
	const { className, email, number } = props;
	return (
		<div className={classNames(className, cls.UserItem)}>
			<p>
				Email: {email}
			</p>
			<p>
				Номер: {number}
			</p>
		</div>
	)
}

export default UserItem;