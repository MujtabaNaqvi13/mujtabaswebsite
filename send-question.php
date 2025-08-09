<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $question = htmlspecialchars(trim($_POST["question"] ?? ""));

    $to = "s.mujtaba.naqvi@outlook.com";
    $subject = "New Question from $name";
    $body = "Name: $name\nEmail: $email\nQuestion: $question";
    $headers = "From: noreply@mujtabanaqvi.com\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p style='color:green;font-weight:bold;'>Thank you! Your question has been sent.</p>";
    } else {
        echo "<p style='color:red;font-weight:bold;'>Sorry, there was a problem sending your question. Please try again later.</p>";
    }
}
?>
