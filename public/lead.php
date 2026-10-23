<?php
/**
 * Приём заявок с форм сайта razdel-proekt.ru.
 *
 * Зачем: по ч. 5 ст. 18 Федерального закона № 152-ФЗ запись, систематизация,
 * накопление, хранение, уточнение и извлечение персональных данных граждан РФ
 * должны выполняться в базах данных на территории России. Этот обработчик
 * сохраняет заявки на том же российском хостинге, где стоит сайт, и ничего
 * не отправляет за рубеж.
 *
 * Установка:
 *   1. Файл уже лежит в корне сайта рядом с index.html.
 *   2. Укажите почту в $MAIL_TO ниже.
 *   3. В src/lib/site.ts замените formEndpoint на "/lead.php" и пересоберите сайт.
 *   4. Проверьте: оставьте тестовую заявку, письмо должно прийти,
 *      а в leads/leads.csv появиться строка.
 *
 * Доступ к файлу заявок закрыт через .htaccess (см. раздел ниже в этом файле).
 */

// ─────────── настройки ───────────
$MAIL_TO   = 'info@razdel-proekt.ru';   // куда слать уведомления, можно через запятую
$MAIL_FROM = 'site@razdel-proekt.ru';   // ящик на этом же домене, иначе письма уйдут в спам
$DIR       = __DIR__ . '/leads';        // где хранить заявки
$TG_TOKEN  = '';                        // необязательно: токен бота Telegram
$TG_CHAT   = '';                        // необязательно: id чата

// Телеграм-уведомление уходит в зарубежный сервис, поэтому в него
// намеренно не передаётся телефон — только факт заявки и её тема.
$TG_HIDE_PERSONAL = true;

// ─────────── приём данных ───────────
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'only POST'], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}
if (!is_array($data) || !count($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'empty body'], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Чистка значения: обрезаем, убираем управляющие символы и переносы строк. */
function clean($v, $max = 2000) {
    if (is_array($v)) $v = implode(', ', $v);
    $v = (string)$v;
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v);
    $v = trim($v);
    if (function_exists('mb_substr')) $v = mb_substr($v, 0, $max, 'UTF-8');
    return $v;
}

$fields = ['intent', 'name', 'phone', 'email', 'objectType', 'area', 'comment',
           'file', 'context', 'consent', 'page'];
$lead = [];
foreach ($fields as $f) {
    $lead[$f] = isset($data[$f]) ? clean($data[$f]) : '';
}

// Телефон обязателен — отсекаем пустые отправки
$digits = preg_replace('/\D/', '', $lead['phone']);
if (strlen($digits) < 11) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'phone required'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Простая защита от ботов: не чаще одной заявки в 20 секунд с одного адреса
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
$throttle = sys_get_temp_dir() . '/rp_' . md5($ip);
if (file_exists($throttle) && (time() - filemtime($throttle)) < 20) {
    echo json_encode(['ok' => true, 'note' => 'duplicate'], JSON_UNESCAPED_UNICODE);
    exit;
}
@touch($throttle);

// ─────────── сохранение ───────────
if (!is_dir($DIR)) {
    @mkdir($DIR, 0750, true);
}
// Закрываем папку с персональными данными от веб-доступа
$ht = $DIR . '/.htaccess';
if (!file_exists($ht)) {
    @file_put_contents($ht, "Require all denied\nDeny from all\n");
}

$now = date('Y-m-d H:i:s');
$row = [$now, $lead['intent'], $lead['name'], $lead['phone'], $lead['email'],
        $lead['objectType'], $lead['area'], $lead['comment'], $lead['file'],
        $lead['context'], $lead['consent'], $lead['page'], $ip];

$csv = $DIR . '/leads.csv';
$new = !file_exists($csv);
$fh = @fopen($csv, 'a');
if ($fh) {
    if (flock($fh, LOCK_EX)) {
        if ($new) {
            fwrite($fh, "\xEF\xBB\xBF"); // BOM, чтобы Excel открыл кириллицу
            fputcsv($fh, ['Дата', 'Форма', 'Имя', 'Телефон', 'E-mail', 'Тип объекта',
                          'Площадь', 'Комментарий', 'Файл', 'Контекст', 'Согласие',
                          'Страница', 'IP'], ';');
        }
        fputcsv($fh, $row, ';');
        flock($fh, LOCK_UN);
    }
    fclose($fh);
}

// ─────────── уведомление на почту ───────────
$subject = 'Заявка с сайта: ' . ($lead['intent'] !== '' ? $lead['intent'] : 'форма');
$body = "Новая заявка с сайта razdel-proekt.ru\n\n"
      . "Дата:        $now\n"
      . "Форма:       {$lead['intent']}\n"
      . "Имя:         {$lead['name']}\n"
      . "Телефон:     {$lead['phone']}\n"
      . "E-mail:      {$lead['email']}\n"
      . "Тип объекта: {$lead['objectType']}\n"
      . "Площадь:     {$lead['area']}\n"
      . "Файл:        {$lead['file']}\n"
      . "Комментарий: {$lead['comment']}\n"
      . "Контекст:    {$lead['context']}\n"
      . "Страница:    {$lead['page']}\n"
      . "Согласие:    {$lead['consent']}\n";

$headers = "From: Сайт Раздел Проект <$MAIL_FROM>\r\n"
         . "Reply-To: $MAIL_FROM\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n"
         . "MIME-Version: 1.0\r\n";
@mail($MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

// ─────────── Telegram (необязательно) ───────────
if ($TG_TOKEN !== '' && $TG_CHAT !== '') {
    $text = $TG_HIDE_PERSONAL
        ? "Новая заявка с сайта\nФорма: {$lead['intent']}\nОткройте CRM или почту — там контакты."
        : "Новая заявка\nФорма: {$lead['intent']}\nИмя: {$lead['name']}\nТел: {$lead['phone']}";
    $url = "https://api.telegram.org/bot$TG_TOKEN/sendMessage";
    $post = http_build_query(['chat_id' => $TG_CHAT, 'text' => $text]);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $post,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
        ]);
        @curl_exec($ch);
        curl_close($ch);
    }
}

echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
