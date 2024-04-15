<?php

namespace Drupal\react_example_block\Plugin\jsonapi\FieldEnhancer;

use Drupal\Core\Annotation\Translation;
use Drupal\jsonapi_extras\Annotation\ResourceFieldEnhancer;
use Drupal\jsonapi_extras\Plugin\ResourceFieldEnhancerBase;
use Drupal\options\Plugin\Field\FieldType\ListItemBase;
use Shaper\Util\Context;

/**
 * Includes list fields value and label.
 *
 * @ResourceFieldEnhancer(
 *   id = "list",
 *   label = @Translation("List Field"),
 *   description = @Translation("Formats a list field based on values and labels")
 * )
 */
class ReactExampleListFieldEnhancer extends ResourceFieldEnhancerBase {

  /**
   * @inheritDoc
   */
  protected function doTransform($data, Context $context) {
    return is_array($data) ? array_column($data, 'value') : $data;
  }

  /**
   * @inheritDoc
   */
  protected function doUndoTransform($data, Context $context) {
    $field_context = $context->offsetGet('field_item_object');
    assert($field_context instanceof ListItemBase);
    $options = $field_context->getPossibleOptions();
    $reformat = static function ($input) use ($options) {
      return [
        'value' => $input,
        'label' => $options[(string) $input] ?? '',
      ];
    };
    return is_array($data) ? array_map($reformat, $data) : $reformat($data);

  }

  /**
   * @inheritDoc
   */
  public function getOutputJsonSchema() {
    return [
      'type' => 'object',
      'properties' => [
        'value' => [
          'anyOf' => [
            ['type' => 'string'],
            ['type' => 'number'],
            ['type' => 'null'],
          ],
        ],
        'label' => [
          'anOf' => [
            ['type' => 'string'],
            ['type' => 'null'],
          ],
        ],
      ],
    ];
  }

}
