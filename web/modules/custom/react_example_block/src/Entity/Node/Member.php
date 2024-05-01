<?php declare(strict_types = 1);

namespace Drupal\react_example_block\Entity\Node;

use Drupal\group\Entity\GroupInterface;
use Drupal\group\Entity\GroupRelationship;
use Drupal\node\Entity\Node;

/**
 * A bundle class for node entities.
 */
final class Member extends Node {

  public function getGroup(): ?GroupInterface {
    $group_relationship_entities = GroupRelationship::loadByEntity($this);

    return ($group_relationship_entities) ? reset($group_relationship_entities)->getGroup() : NULL;
  }

}
