<?php

namespace Drupal\react_example_block\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

class ReactExampleRouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    $alterRoutes = [
      'jsonapi.node--member.collection.post',
      'jsonapi.node--member.individual.patch',
      'jsonapi.node--member.individual.delete',
    ];

    // Since we are just using the standard JSON:API endpoints for the node
    // and adding the node to a group
    foreach ($alterRoutes as $routeName) {
      if ($route = $collection->get($routeName)) {
        $requirements = $route->getRequirements() + [
          '_group_jsonapi' => 'group_jsonapi.access_checker::access'
          ];
        unset($requirements['_entity_create_access']);
        unset($requirements['_entity_access']);
        $route->setRequirements($requirements);
      }
    }

  }

}
