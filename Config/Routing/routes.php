<?php
    header('Content-Type: text/javascript');

    $str = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/VIPTransport/Config/Routing/routes.json');
    echo json_encode($str, JSON_PRETTY_PRINT);
?>
