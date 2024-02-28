<?php declare(strict_types = 1);

namespace Drupal\react_example_block\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for React example block routes.
 */
final class MembersController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function __invoke(): array {

    $build['content'] = [
      '#markup' => '<div id="react-app"></div>',
      '#attached' => [
        'library' => 'react_example_block/react_app',
      ],
    ];
    return $build;
  }

}
