<?php
$db = new SQLite3('db.sq3');

$amount = $_GET["sms__amount"];
$text = $_GET["sms"];

if (!empty($amount) && !empty($text)) {
    $sql = "INSERT INTO messages VALUES ('$amount', '$text');";
    $result = $db->query($sql);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ИМОБИС</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form class="container" action="sqlite.php" method="GET">
        <div>
            <textarea id="msg" name="sms" cols="30" rows="10"></textarea>
        </div>
        <div>
            <p>Введено символов: <span id="symbols__amount"></span></p>
            <p>Необходимо СМС: <span id="sms__amount"></span></p>
            <input id="sms" type="hidden" name="sms__amount" value="0">
        </div>
        <div>
            <input type="checkbox" id="toggle">
            <label for="toggle">Транслитерировать</label>
        </div>
        <div>
            <button type="submit" id="save">Сохранить</button>
        </div>
    </form>
</body>
<script src="script.js"></script>
</html>