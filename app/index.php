<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WorkoutTracker</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-2">
            <h1> WorkOutTracker</h1>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="col-md-2 menu-region">
        <ul class="nav nav-pills nav-stacked">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Exercises</a></li>
        </ul>
    </div>
    <div class="col-md-10 main-region">
        <h1>Content be hereg</h1>
    </div>
</div>

<!-- Libraries -->
<script src="assets/js/vendor/jquery/jquery.js"></script>
<script src="assets/js/vendor/underscore/underscore.js"></script>
<script src="assets/js/vendor/backbone/backbone.js"></script>
<script src="assets/js/vendor/backbone.babysitter/backbone.babysitter.js"></script>
<script src="assets/js/vendor/backbone.wreqr/backbone.wreqr.js"></script>
<script src="assets/js/vendor/marionette/backbone.marionette.js"></script>

<!-- Application files -->
<script src="assets/js/app.js"></script>


<script>
    WorkoutTracker.start();
</script>
</body>
</html>
