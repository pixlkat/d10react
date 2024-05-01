import React from "react";
import {useState} from "react";
import MemberEdit from "./MemberEdit";
import MemberDelete from "./MemberDelete";

const MemberItem = ({
                      id,
                      member,
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
          field_first_name={member.attributes.field_first_name}
          field_last_name={member.attributes.field_last_name}
          field_type={member.attributes.field_type}
          field_status={member.attributes.field_status}
          field_sector={member.attributes.field_sector}
          onSuccess={data => dispatchContentAction({type: 'update', data})}
          fieldConfig={fieldConfig}
        />
        <button onClick={(e) => handleClick(id, 'cancel_edit')}>cancel</button>
      </div>
    );
  }

  return (
    <div>
      <hr/>
      <div>Name: {member.attributes.field_first_name} {member.attributes.field_last_name}</div>
      <div>Status: {member.attributes.field_status.label}</div>
      <div>Type: {member.attributes.field_type.label}</div>
      <div>Sector: {member.attributes.field_sector.label}</div>
      <div>Last Updated: {member.attributes.changed}</div>
      <div>
        <button onClick={(e) => handleClick(id, 'edit_item')}>edit</button>
        &nbsp;
        <MemberDelete
          id={id}
          title={member.attributes.title}
          onSuccess={id => dispatchContentAction({type: 'delete', data: id})}
        />
      </div>
    </div>
  );
};

export default MemberItem;
