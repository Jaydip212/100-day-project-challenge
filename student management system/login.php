<?php
session_start();
include 'db_connect.php';
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM admins WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) === 1) {
        $_SESSION['admin'] = $username;
        header("Location: dashboard.php");
    } else {
        echo "Invalid credentials!";
    }
}
?>
<form method="post">
Username: <input type="text" name="username" required /><br>
Password: <input type="password" name="password" required /><br>
<input type="submit" name="login" value="Login" />
</form>