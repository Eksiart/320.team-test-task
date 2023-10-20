import { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	className?: string;
	children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
	const { children, className, ...otherProps } = props;

	return (
		<button
			type="button"
			className={classNames(className, cls.Button)}
			{...otherProps}
		>
			{children}
		</button>
	)
}