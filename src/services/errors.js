const messages = {
    "Invalid login credentials": "Неверный email или пароль",
    "User already registered": "Пользователь с таким email уже существует",
    "Email not confirmed": "Email не подтверждён",
};

export function toRussian(message = "") {
    if (messages[message]) return messages[message];
    if (message.startsWith("Password should be at least"))
        return "Пароль должен быть не короче 6 символов";
    if (message.includes("Failed to fetch"))
        return "Нет соединения с сервером. Проверьте интернет";
    return message || "Что-то пошло не так";
}
