<?php include 'auth.php'; include 'db_connect.php'; ?>
<table border="1">
<tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Action</th></tr>
<?php
$result = mysqli_query($conn, "SELECT * FROM students");
while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>{$row['email']}</td>
        <td>{$row['phone']}</td>
        <td>
            <a href='edit_student.php?id={$row['id']}'>Edit</a> | 
            <a href='delete_student.php?id={$row['id']}'>Delete</a>
        </td>
    </tr>";
}
?>
</table>