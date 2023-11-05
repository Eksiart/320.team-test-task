import { useState } from "react";
import cls from './App.module.css'
import { User } from "./models/user.ts";
import { req } from "./lib/api.ts";
import Header from "./components/Header/Header.tsx";
import UserItem from "./components/User/User.tsx";
import { Button } from "./components/Button/Button.tsx";
import { Input } from "./components/Input/Input.tsx";
import { validateEmail, validateNumber } from "./lib/validate.ts";
import { getDigitsValue, numberMask } from "./lib/numberMask.ts";

function App() {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<User[] | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [validateErrors, setValidateErrors] = useState<string[]>([]);

    const validateFields = (): boolean => {
        let canNext = true;
        setValidateErrors([]);
        if (!validateEmail(email)) {
            setValidateErrors(['Неверный адрес электронной почты']);
            canNext = false;
        }
        if (!validateNumber(parseInt(getDigitsValue(number))) && number) {
            setValidateErrors(prev => [...prev, 'Номер введен неверно'])
            canNext = false;
        }
        return canNext;
    }

    const onSearchClick = async () => {
        if (validateFields()) {
            setIsLoading(true);
            setData(undefined);
            setError(false);
            try {
                let url = `https://3205.eksiart.ru/api/user?email=${email}`;
                if (number) url += `&number=${getDigitsValue(number)}`;
                const data = await req<{users: User[]}>(url);
                setData(data.users);
            } catch (e) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
    }

    let content;

    if (isLoading) {
        content = (<div>Загрузка...</div>)
    }

    if (error) {
        content = (
            <div className={cls.Error}>
                <p>Серверная ошибка, попробуйте обновить страницу</p>
            </div>
        )
    }

    if (validateErrors.length > 0) {
        content = (
            <div className={cls.Error}>
                {validateErrors.map(e => <div key={e}>{e}</div>)}
            </div>
        )
    }

    if (data) {
        if (data.length === 0) content = (<div>Пользователи не найдены</div>)
        else {
            content = (
                data.map(user => <UserItem key={user.email + user.number} email={user.email} number={user.number}/>)
            )
        }
    }

    return (
        <>
            <Header/>
            <main className={cls.Main}>
                <div style={{marginBottom: 50, display: 'flex', flexDirection: 'column', gap: 15}}>
                    <h3>Заддержа обработки запроса 5 секунд.</h3>
                    <h3>При отправке повтороного запроса, обработка первого запроса будет остановлена.</h3>
                </div>
                <div className={cls.Inputs}>
                    <div>
                        <p>Email:</p>
                        <Input value={email} onChange={setEmail} placeholder="someone@example.com" type="email"></Input>
                    </div>
                    <div>
                        <p>Номер:</p>
                        <Input value={number} onChange={(e) => setNumber(numberMask(e))} placeholder="XX-XX-XX"></Input>
                    </div>
                    <Button onClick={onSearchClick}>Поиск</Button>
                </div>
                {content}
            </main>
        </>
    )
}

export default App
