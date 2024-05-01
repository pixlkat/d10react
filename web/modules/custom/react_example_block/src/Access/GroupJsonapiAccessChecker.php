<?php declare(strict_types = 1);

namespace Drupal\react_example_block\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Routing\Access\AccessInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\group\Entity\GroupInterface;
use Symfony\Component\Routing\Route;

/**
 * Checks if passed parameter matches the route configuration.
 *
 * Usage example:
 * @code
 * foo.example:
 *   path: '/example/{parameter}'
 *   defaults:
 *     _title: 'Example'
 *     _controller: '\Drupal\react_example_block\Controller\ReactExampleBlockController'
 *   requirements:
 *     _group_jsonapi: 'some value'
 * @endcode
 */
final class GroupJsonapiAccessChecker implements AccessInterface {

  /**
   * Constructs a GroupJsonapiAccessChecker object.
   */
  public function __construct(
    private readonly AccountProxyInterface $currentUser,
    private readonly PrivateTempStoreFactory $tempstorePrivate,
  ) {}

  /**
   * Access callback.
   *
   * @DCG
   * Drupal does some magic when resolving arguments for this callback. Make
   * sure the parameter name matches the name of the placeholder defined in the
   * route, and it is of the same type.
   * The following additional parameters are resolved automatically.
   *   - \Drupal\Core\Routing\RouteMatchInterface
   *   - \Drupal\Core\Session\AccountInterface
   *   - \Symfony\Component\HttpFoundation\Request
   *   - \Symfony\Component\Routing\Route
   */
  public function access(AccountInterface $account, RouteMatchInterface $routeMatch): AccessResult {
    $tempstore = $this->tempstorePrivate->get('react_example_block_user');
    $group = $tempstore->get('default_group');
    // If we don't have a group set in tempstore, return access forbidden.
    if (!($group instanceof GroupInterface)) {
      return AccessResult::forbidden('User is not a member of a group.');
    }
    $routeName = $routeMatch->getRouteName();
    switch ($routeName) {
      case 'jsonapi.node--member.collection.post':
        $permission = 'create group_node:member entity';
        $result = AccessResult::allowedIf($group->hasPermission($permission, $account));
        break;

      case 'jsonapi.node--member.individual.patch':
      case 'jsonapi.node--member.individual.delete':
        $operation = str_contains($routeName, 'patch') ? 'update' : 'delete';
        $permission =  $operation . ' any group_node:member entity';
        /** @var \Drupal\react_example_block\Entity\Node\Member $member */
        $member = $routeMatch->getParameter('entity');
        $group_matches = $group->id() == $member->getGroup()?->id();
        $result = AccessResult::allowedIf($group->hasPermission($permission, $account) && $group_matches);
        break;

      default:
        $result = AccessResult::neutral();
    }
    return $result;
  }

}
