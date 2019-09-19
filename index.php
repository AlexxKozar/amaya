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

/**
 * Middleware for handling erros
 * Needs to setup php.ini to not display errors
 */
$app->addErrorMiddleware(true, false, false);

$app->add(function(Request $request, $handler) {
    $response = $handler->handle($request);
    $response = $response
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    return $response;
});

$app->get('/', function (Request $request, Response $response, $args) {
    $root_file = './dist/amaya/index.html';

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
    $group->post('/result', function ($request, Response $response, $args) {
        $to = '';
        $template = '';
        $subject = '';

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
        $to = '';
        $template = '';
        $subject = '';

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
    throw new \Slim\Exception\NotFoundException($request);
});


$app->run();
