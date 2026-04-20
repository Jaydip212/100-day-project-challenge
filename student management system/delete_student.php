<?php include 'auth.php'; include 'db_connect.php';
$id = $_GET['id'];
mysqli_query($conn, "DELETE FROM students WHERE id=$id");
header("Location: view_students.php");
?>