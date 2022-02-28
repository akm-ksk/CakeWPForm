<?php
require_once('../cake/wp-load.php');
include('../cake/wp-content/themes/CakeWP/inc/head.php');
?>
<div id="form">
  <div class="cntIn">
    <h1>お問合せフォーム</h1>
    <form action="./send.php" method="post">
      <p id="errMassage">正しい情報を入力してください</p>
      <p id="confirmMassage">以下の内容で送信いたします。<br>ご確認のうえ送信ボタンを押してください。</p>
      <dl class="flexBox">
        <dt>名前</dt>
        <dd><input type="text" name="name" id="" class="formItem"></dd>
        <dt>電話番号</dt>
        <dd><input type="tel" name="tel" id="" class="formItem"></dd>
        <dt>メールアドレス</dt>
        <dd><input type="email" name="email" id="" class="formItem"></dd>
        <dt>お問合せ内容</dt>
        <dd><textarea name="text" id="" class="formItem"></textarea></dd>
      </dl>
      <input type="button" name="confirm" value="確認">
      <input type="submit" name="send" value="送信する">
    </form>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.1.10/libphonenumber-js.min.js"></script>
<script src="./js/script.js"></script>
<?php include('../cake/wp-content/themes/CakeWP/inc/footer.php'); ?>