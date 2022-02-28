<?php
mb_language("Ja");
mb_internal_encoding("UTF-8");
date_default_timezone_set('Asia/Tokyo');

// エスケープ処理
$name = htmlspecialchars($_POST['name']);
$tel = htmlspecialchars($_POST['tel']);
$email = htmlspecialchars($_POST['email']);
$text = htmlspecialchars($_POST['text']);

//管理者設定
$to = 'adminmail';
$subject = 'お問合せがありました';
$headers = 'From: ' . $email;

$adText  = '下記の内容でお問合せがありました。' . "\n\n";
$adText .= 'お問合せ日時' . "\n";
$adText .= date('Y/m/d H:i') . "\n";
$adText .= '氏名' . "\n";
$adText .= $name  . "\n";
$adText .= '電話番号' . "\n";
$adText .= $tel . "\n";
$adText .= 'メールアドレス' . "\n";
$adText .= $email  . "\n";
$adText .= 'お問合せ内容' . "\n";
$adText .= $text;

$adResult = mb_send_mail($to, $subject, $adText, $headers);

//お客様設定
$cTo = $email;
$cSubject = 'お問合せを受け付けました';
$cHeaders = 'From: adminmail';

$cText  = 'この度はお問合せいただきありがとうございます!' . "\n\n";
$cText  = '下記の内容でお問合せを受け付けました。' . "\n\n";
$cText .= 'お問合せ日時' . "\n";
$cText .= date('Y/m/d H:i') . "\n";
$cText .= '氏名' . "\n";
$cText .= $name . "\n";
$cText .= '電話番号' . "\n";
$cText .= $tel . "\n";
$cText .= 'メールアドレス' . "\n";
$cText .= $email . "\n";
$cText .= 'お問合せ内容' . "\n";
$cText .= $text . "\n";
$cText .= '3営業日以内にお返事いたします。' . "\n";
$cText .= '今しばらくお待ちください。';

$cResult = mb_send_mail($cTo, $cSubject, $cText, $cHeaders);
?>
<?php
require_once('../cake/wp-load.php');
include('../cake/wp-content/themes/CakeWP/inc/head.php');
?>
<div id="formSend">
  <div class="cntIn">
    <?php
    if ($adResult && $cResult) : ?>
      <div id="formSend">
        <h1>お問合せいただきありがとうございます</h1>
        <p>
          3営業日以内に折り返しご連絡いたします。<br>
          連絡がない場合はメールアドレスの間違いなど<br>
          弊社にメールが届いていない可能性がございますので、<br>
          お手数ですがもう一度ご連絡お願いいたします。
        </p>
      </div>
    <?php else : ?>
      <div id="formSend">
        <h1>エラーが発生いたしました</h1>
        <p>
          エラーが発生いたしました。<br>
          もう一度、お試しいただくか、お電話でお問合せ願います。
        </p>
        <a href="tel:082-123-1123">082-123-1123</a>
      </div>
    <?php endif; ?>
  </div>
</div>
<?php include('../cake/wp-content/themes/CakeWP/inc/footer.php'); ?>