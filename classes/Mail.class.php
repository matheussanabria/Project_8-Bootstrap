<?php

class Mail {
    public $mailer;
    public $email = 'contato@codificadoresdenegocios.com'; // Trocar e-mail aqui!
    public $senha = 'Mcapzx7!?'; // Trocar senha aqui!

    public function __construct(Array $parametros) {
        try {
            error_log("Início do construtor Mail");
            include('classes/phpmailer/PHPMailerAutoload.php');
            $this->mailer = new PHPMailer();

            $this->mailer->IsSMTP();
            $this->mailer->Host = 'smtp.hostinger.com'; // SERVIDOR SMTP DA HOSPEDAGEM
            $this->mailer->Port = 465; // PORTA DO SMTP
            $this->mailer->SMTPDebug = 0;
            $this->mailer->SMTPAuth = true;
            $this->mailer->SMTPSecure = 'ssl';
            $this->mailer->Username = $this->email;
            $this->mailer->Password = $this->senha;

            $this->mailer->IsHTML(true);
            $this->mailer->SingleTo = true;

            $this->mailer->From = $this->email;
            $this->mailer->FromName = 'Administrador';

            $this->mailer->Subject = 'Nova mensagem do site!';

            $this->addAddress($this->email, 'Administrador');

            $body = '';
            foreach ($parametros as $key => $value) {
                $body .= ucfirst($key) . ": " . mb_convert_encoding($value, 'ISO-8859-1', 'UTF-8');
                $body .= "<hr>";
            }

            $this->mailer->Body = $body;

            error_log("Construtor Mail completado");
        } catch (Exception $e) {
            error_log("Erro no construtor Mail: " . $e->getMessage());
            throw $e;
        }
    }

    public function addAddress($mail, $nome) {
        $this->mailer->addAddress($mail, $nome);
        return $this;
    }

    public function sendMail() {
        try {
            $this->mailer->CharSet = "utf-8";
            if ($this->mailer->send()) {
                error_log("E-mail enviado com sucesso");
                return true;
            } else {
                error_log("Falha ao enviar o e-mail: " . $this->mailer->ErrorInfo);
                throw new Exception($this->mailer->ErrorInfo);
            }
        } catch (Exception $e) {
            error_log("Erro ao enviar e-mail: " . $e->getMessage());
            throw $e;
        }
    }
}

?>
