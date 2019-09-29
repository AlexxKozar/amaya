<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

function sendMail($to, $subject, $template) {

    function adopt($template) {
      return '=?UTF-8?B?'.Base64_encode($template).'?=';
    }

    $headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    'From: '.adopt($subject).' <'.$to.'>' . PHP_EOL .
    'Reply-To: '.$to.'' . PHP_EOL;

    return mail($to, adopt($subject), $template, $headers );
  }



$app = AppFactory::create();


$app->redirect('./', '/', 301);

$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(true, true, true);


$app->add(function(Request $request, $handler) {
    $response = $handler->handle($request);
    $response = $response
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    return $response;
});

$app->get('/', function (Request $request, Response $response, $args) {
    $root_file = './index.html';

    if (file_exists($root_file)) {
        $response
            ->getBody()
            ->write(file_get_contents($root_file));

        return $response;
    } else {
        throw new \Slim\Exception\NotFoundException($request, $response);
    }
});


$app->group('/api/email', function ($group) {
    $group->post('/result', function (Request $request, Response $response, $args) {

        $to = 'info@amaya.com.ua';
//         $to = 'alexkozar1306@gmail.com';
        $subject = 'Калькулятор. Расчет стоимости.';

        $body = $request->getBody();
        $parsedBody = json_decode($body, true);

        $name = $parsedBody['contactData']['name'] ?? false;
        $phone = $parsedBody['contactData']['phone'] ?? false;

        $style = $parsedBody['formsData']['style'] ?? false;
        $schema = $parsedBody['formsData']['schema'] ?? false;

        $size1 = $parsedBody['formsData']['sizes'][0] ?? false;
        $size2 = $parsedBody['formsData']['sizes'][1] ?? false;
        $size3 = $parsedBody['formsData']['sizes'][2] ?? false;

        $downSelection = $parsedBody['formsData']['configuration']['downSelection'] ?? false;
        $freezerSelection = $parsedBody['formsData']['configuration']['freezerSelection'] ?? false;
        $ovenSelection = $parsedBody['formsData']['configuration']['ovenSelection'] ?? false;
        $mezzanineSelection = $parsedBody['formsData']['configuration']['mezzanineSelection'] ?? false;
        $shelvesSelection = $parsedBody['formsData']['configuration']['shelvesSelection'] ?? false;
        $islandSelection = $parsedBody['formsData']['configuration']['islandSelection'] ?? false;
        $islandSize = $parsedBody['formsData']['configuration']['islandSize'] ?? false;

        $totalPrice = $parsedBody['calculationData']['totalPrice'] ?? false;

        $template = '
            <html>
            <body>
                <h2>Расчет стоимости:</h2>
                <h3>Контактные данне</h3>
                <p>Имя: '.$name.'</p>
                <p>Номер: '.$phone.'</p>
                <h3>Конфигурация</h3>
                <p>Модель: '.$style.'</p>
                <p>Схема: '.$schema.'</p>
                <p>Размеры: '.$size1.' '.$size2.' '.$size3.'</p>
                <p>Только низ: '.$downSelection.'</p>
                <p>Пенел для холодильника: '.$freezerSelection.'</p>
                <p>Пенал для духовки: '.$ovenSelection.'</p>
                <p>Антресоль: '.$mezzanineSelection.'</p>
                <p>Пенал с полками: '.$shelvesSelection.'</p>
                <p>Остров: '.$islandSelection.'</p>
                <p>Остров размер: '.$islandSize.'</p>
                <h3>Цена</h3>
                <p>Общая цена: '.$totalPrice.'</p>
            </body>
            </html>';

        if (sendMail($to, $subject, $template)) {
            $data = array('status' => 'ok', 'error' => null);
            $payload = json_encode($data);

            $response->getBody()->write($payload);
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        } else {
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(404);
        }
    });

    $group->post('/contacts', function ($request, $response, $args) {
        $to = 'info@amaya.com.ua';
//         $to = 'alexkozar1306@gmail.com';
        $subject = 'Калькулятор. Консультация.';

        $body = $request->getBody();
        $parsedBody = json_decode($body, true);

        $name = $parsedBody['name'] ?? false;
        $phone = $parsedBody['phone'] ?? false;

        $template = '
            <html>
            <body>
                <h2>Консультация:</h2>
                <h3>Контактные данне</h3>
                <p>Имя: '.$name.'</p>
                <p>Номер: '.$phone.'</p>
            </body>
            </html>';

        if (sendMail($to, $subject, $template)) {
            $data = array('status' => 'ok', 'error' => null);
            $payload = json_encode($data);

            $response->getBody()->write($payload);
            return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(200);
        } else {
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }
    });
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
     $root_file = './index.html';

        if (file_exists($root_file)) {
            $response
                ->getBody()
                ->write(file_get_contents($root_file));

            return $response;
        } else {
            throw new \Slim\Exception\NotFoundException($request, $response);
        }
});


$app->run();
