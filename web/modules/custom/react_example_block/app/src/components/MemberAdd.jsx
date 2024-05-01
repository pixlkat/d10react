import React from "react";
import MemberForm from "./MemberForm";

const MemberAdd = ({ onSuccess, fieldConfig, dispatchContentAction }) => (
  <div>
  <MemberForm id={null} onSuccess={onSuccess} fieldConfig={fieldConfig}/>
<p>
  <button
    onClick={() => dispatchContentAction({type: 'cancel_add_form'})}>cancel
  </button>
</p>
  </div>
)
;

export default MemberAdd;
