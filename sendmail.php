<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Защита от XSS
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $messageContent = htmlspecialchars(trim($_POST['message']));

    // Проверка полей
    if (!empty($name) && !empty($email) && !empty($messageContent) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Адрес назначения и тема письма
        $to = 'wianofreshad@gmail.com';
        $subject = 'Новое сообщение от ' . $name;

        // Текст письма
        $message = "Имя: $name\nEmail: $email\nСообщение:\n$messageContent";

        // Заголовки письма
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

        // Отправка письма
        if (mail($to, $subject, $message, $headers)) {
            echo "Ваше сообщение успешно отправлено!";
        } else {
            echo "Ошибка при отправке сообщения. Попробуйте позже.";
        }
    } else {
        echo "Пожалуйста, заполните все поля корректно.";
    }
} else {
    echo "Неверный метод запроса.";
}
?>