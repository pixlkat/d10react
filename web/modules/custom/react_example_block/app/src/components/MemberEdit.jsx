import React from "react";
import MemberForm from "./MemberForm";

const MemberEdit = ({id, field_first_name, field_last_name, field_type, field_status, field_sector, onSuccess, fieldConfig})=> (
  <MemberForm
    id={id}
    field_first_name={field_first_name}
    field_last_name={field_last_name}
    field_type={field_type}
    field_status={field_status}
    field_sector={field_sector}
    onSuccess={onSuccess}
    fieldConfig={fieldConfig}
  />
);

export default MemberEdit;
