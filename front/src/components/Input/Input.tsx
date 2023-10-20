import { ChangeEvent, InputHTMLAttributes } from "react";
import classNames from "classnames";
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>
interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
}

export const Input = (props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		...otherProps
	} = props;

	const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<input
			className={classNames(className, cls.Input)}
			value={value}
			onChange={onInputHandler}
			type={type}
			{...otherProps}
		/>
	)
}