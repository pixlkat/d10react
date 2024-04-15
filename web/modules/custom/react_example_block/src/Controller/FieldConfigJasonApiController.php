<?php declare(strict_types = 1);

namespace Drupal\react_example_block\Controller;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Returns responses for React example block routes.
 */
final class FieldConfigJasonApiController extends ControllerBase {

  /**
   * The controller constructor.
   */
  public function __construct(
    private readonly EntityFieldManagerInterface $entityFieldManager,
  ) {}

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): self {
    return new self(
      $container->get('entity_field.manager'),
    );
  }

  /**
   * Builds the response.
   */
  public function __invoke(): CacheableJsonResponse {

    $output = [];
    $cache_dependencies = [];

    $field_definitions = $this->entityFieldManager->getFieldDefinitions('node', 'member');
    foreach ($field_definitions as $name => $definition) {
      $cache_dependencies[] = $definition->getConfig('member');
      if (str_starts_with($name, 'field_')) {
        $field = [
          'name' => $name,
          'attributes' => [
            'type' => $definition->getType(),
            'label' => $definition->getLabel(),
            'constraints' => $definition->getConstraints(),
            'settings' => $definition->getSettings(),
          ],
        ];
        $output[] = $field;
      }
    }

    $response = new CacheableJsonResponse([
      'data' => $output,
    ], 200);

    foreach ($cache_dependencies as $dependency) {
      $response->addCacheableDependency($dependency);
    }

    return $response;
  }

}
