<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
  <title>Document</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-family: 'Poppins', sans-serif;
    }
    .main {
      padding: 20px 30px;
    }
    h1 {
      font-size: 35px;
      font-weight: 400;
    }
    li {
      margin-bottom: 5px;
    }
    a {
      color: #1ba2e8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="main">
    <h1>Integration</h1>
    <ul>
      <?php
        $base_path = './src/';
        if ($handle = opendir($base_path)) {

          while (false !== ($entry = readdir($handle))) {
              if ($entry != "." && $entry != ".." && preg_match("/^(.*)\.(\w)+$/", $entry)) {
                echo "<li><a href='" . $base_path . $entry . "' title='" . $entry . "'>" . $entry . "</a></li>";
              }
          }
      
          closedir($handle);
        }
      ?>
    </ul>
  </div>
</body>
</html>