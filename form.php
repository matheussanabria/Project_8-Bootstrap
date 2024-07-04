<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

error_log("Início do script form.php");

try {
    include('classes/Mail.class.php');
    error_log("Classe Mail incluída com sucesso");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        error_log("Dados POST recebidos: " . print_r($_POST, true));

        $m = new Mail($_POST);
        error_log("Instância de Mail criada");

        if ($m->sendMail()) {
            error_log("E-mail enviado com sucesso");
            echo json_encode(['status' => 'success']);
        } else {
            error_log("Falha ao enviar o e-mail");
            echo json_encode(['status' => 'error', 'message' => 'Falha ao enviar o e-mail']);
        }
    } else {
        error_log("Nenhum dado POST recebido");
        echo json_encode(['status' => 'error', 'message' => 'Nenhum dado POST recebido']);
    }
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

error_log("Fim do script form.php");
?>
