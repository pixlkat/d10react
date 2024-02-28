import React from "react";
import MemberForm from "./MemberForm";

const MemberEdit = ({id, field_first_name, field_last_name, field_type, field_status, field_sector, onSuccess})=> (
  <MemberForm
    id={id}
    field_first_name={field_first_name}
    field_last_name={field_last_name}
    field_type={field_type}
    field_status={field_status}
    field_sector={field_sector}
    onSuccess={onSuccess}
  />
);

export default MemberEdit;
