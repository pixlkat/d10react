import React from "react";
import { useState} from "react";
import MemberEdit from "./MemberEdit";
import MemberDelete from "./MemberDelete";

const MemberItem = ({id, drupal_internal__nid, title, field_first_name, field_last_name, field_type, field_status, field_sector, changed, showEditForm, dispatchContentAction}) => {

  const handleClick = (id, op) => {
    console.log(`id: ${id}`);
    console.log(`op: ${op}`);
    dispatchContentAction({type: op, data: id});
  }
  if (showEditForm) {
  return (
    <div>
      <hr />
      <MemberEdit
        id={id}
        field_first_name={field_first_name}
        field_last_name={field_last_name}
        field_type={field_type}
        field_status={field_status}
        field_sector={field_sector}
        onSuccess={data => dispatchContentAction({ type: 'update', data })}
      />
      <button onClick={(e) => handleClick(id, 'cancel_edit')}>cancel</button>
    </div>
  );
}
  return (
    <div>
      <hr />
      <div>Name: {field_first_name} {field_last_name}</div>
      <div>Status: {field_status}</div>
      <div>Type: {field_type}</div>
      <div>Sector: {field_sector}</div>
      <div>Last Updated: {changed}</div>
      <div>
        <button onClick={(e) => handleClick(id, 'edit_item')}>edit</button>&nbsp;
        <MemberDelete
          id={id}
          title={title}
          onSuccess={id => dispatchContentAction({type: 'delete', data: id})}
        />
      </div>
    </div>
  );
};

export default MemberItem;
