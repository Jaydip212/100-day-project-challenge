<?php include 'auth.php'; include 'db_connect.php';
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $sql = "INSERT INTO students (name, email, phone) VALUES ('$name', '$email', '$phone')";
    mysqli_query($conn, $sql);
    echo "Student added!";
}
?>
<form method="post">
Name: <input type="text" name="name" /><br>
Email: <input type="email" name="email" /><br>
Phone: <input type="text" name="phone" /><br>
<input type="submit" name="submit" value="Add Student" />
</form>