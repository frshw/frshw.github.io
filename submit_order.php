<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $phone = $_POST['phone'];
    $orderDetails = $_POST['order_details'];

    // Логика для обработки данных и отправки письма
    $to = 'tortlarbakuvip@gmail.com';
    $subject = 'Yeni sifaris ' . $firstName . ' ' . $lastName;
    $message = "Ad: $firstName\nSoyad: $lastName\nNomre: $phone\nSifaris: $orderDetails";
    
    // Если загружено изображение
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $imageName = $_FILES['image']['name'];
        $imageTempName = $_FILES['image']['tmp_name'];
        // Путь для сохранения изображения (например, в папку uploads)
        $imagePath = 'uploads/' . $imageName;
        move_uploaded_file($imageTempName, $imagePath);
        $message .= "\nИзображение: $imagePath";
    }

    mail($to, $subject, $message);
    echo "Sifarişiniz uğurla göndərildi!";
}
?>
