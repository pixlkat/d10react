import React from "react";
import {useState} from "react";
import MemberEdit from "./MemberEdit";
import MemberDelete from "./MemberDelete";

const MemberItem = ({
                      id,
                      drupal_internal__nid,
                      title,
                      field_first_name,
                      field_last_name,
                      field_type,
                      field_status,
                      field_sector,
                      changed,
                      showEditForm,
                      dispatchContentAction,
                      fieldConfig
                    }) => {

  const handleClick = (id, op) => {
    dispatchContentAction({type: op, data: id});
  }
  if (showEditForm) {
    return (
      <div>
        <hr/>
        <MemberEdit
          id={id}
          field_first_name={field_first_name}
          field_last_name={field_last_name}
          field_type={field_type}
          field_status={field_status}
          field_sector={field_sector}
          onSuccess={data => dispatchContentAction({type: 'update', data})}
          fieldConfig={fieldConfig}
        />
        <button onClick={(e) => handleClick(id, 'cancel_edit')}>cancel</button>
      </div>
    );
  }

  const statusLabel = fieldConfig['field_status']['allowed_values'][`${field_status}`];
  const typeLabel = fieldConfig['field_type']['allowed_values'][`${field_type}`];
  const sectorLabel = fieldConfig['field_sector']['allowed_values'][`${field_sector}`];
  return (
    <div>
      <hr/>
      <div>Name: {field_first_name} {field_last_name}</div>
      <div>Status: {statusLabel}</div>
      <div>Type: {typeLabel}</div>
      <div>Sector: {sectorLabel}</div>
      <div>Last Updated: {changed}</div>
      <div>
        <button onClick={(e) => handleClick(id, 'edit_item')}>edit</button>
        &nbsp;
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
