<?php include 'auth.php'; include 'db_connect.php';
$id = $_GET['id'];
$result = mysqli_query($conn, "SELECT * FROM students WHERE id=$id");
$row = mysqli_fetch_assoc($result);
if (isset($_POST['update'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    mysqli_query($conn, "UPDATE students SET name='$name', email='$email', phone='$phone' WHERE id=$id");
    echo "Updated!";
}
?>
<form method="post">
Name: <input type="text" name="name" value="<?php echo $row['name']; ?>" /><br>
Email: <input type="email" name="email" value="<?php echo $row['email']; ?>" /><br>
Phone: <input type="text" name="phone" value="<?php echo $row['phone']; ?>" /><br>
<input type="submit" name="update" value="Update" />
</form>