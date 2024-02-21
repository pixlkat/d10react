<?php declare(strict_types = 1);

namespace Drupal\react_example_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a react example block.
 *
 * @Block(
 *   id = "react_example_block",
 *   admin_label = @Translation("React example block"),
 *   category = @Translation("Custom"),
 * )
 */
final class ReactExampleBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $build['content'] = [
      '#markup' => '<div id="react-app"></div>',
      '#attached' => [
        'library' => 'react_example_block/react_app',
      ],
    ];
    return $build;
  }

}
