<?php

require('../../../wp-load.php');
// header('Location: success');

if ($_POST) {

    function mime_header_encode($str, $data_charset, $send_charset)
    {
        if ($data_charset != $send_charset) {
            $str = iconv($data_charset, $send_charset . '//IGNORE', $str);
        }

        return ('=?' . $send_charset . '?B?' . base64_encode($str) . '?=');
    }

    class TEmail
    {
        public $from_email;
        public $from_name;
        public $to_email;
        public $to_name;
        public $subject;
        public $data_charset = 'UTF-8';
        public $send_charset = 'windows-1251';
        public $body = '';
        public $type = 'text/html';

        function send()
        {
            $dc = $this->data_charset;
            $sc = $this->send_charset;
            $enc_to = mime_header_encode($this->to_name, $dc, $sc) . ' <' . $this->to_email . '>';
            $enc_subject = mime_header_encode($this->subject, $dc, $sc);
            $enc_from = mime_header_encode($this->from_name, $dc, $sc) . ' <' . $this->from_email . '>';
            $enc_body = $dc == $sc ? $this->body : iconv($dc, $sc . '//IGNORE', $this->body);
            $headers = '';
            $headers .= "Mime-Version: 1.0\r\n";
            $headers .= "Content-type: " . $this->type . "; charset=" . $sc . "\r\n";
            $headers .= "From: " . $enc_from . "\r\n";

            return mail($enc_to, $enc_subject, $enc_body, $headers);
        }
    }


    $content = $_POST;


    $message = '<h1>Заявка с портала АЭРОНАВИГАЦИЯ РОССИИ:</h1>';

    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $text = $_POST['message'];


    $message .= "<p>Имя - " . $name . '</p>';
    $message .= "<p>Email - " . $mail . '</p>';
    $message .= "<p>Сообщение - " . $text . '</p>';


    $emailgo = new TEmail;
    $emailgo->from_email = 'andpopup';
    $emailgo->from_name = 'andpopup';
    $emailgo->to_email = 'critowpas@mail.ru';

    $emailgo->to_name = 'andpopup';
    $emailgo->subject = 'Заявка andpopup:';
    $emailgo->body = $message;
    $emailgo->send();


    // Header('Location: success');
} else {
    echo 'access denial';

}
?>
