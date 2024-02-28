import React, { useEffect, useState } from "react";

const RosterNode = ({field_first_name, field_last_name, field_type, field_status, field_sector, changed}) => (
  <div>
    <ul>
      <li>Name: {field_first_name} {field_last_name}</li>
      <li>Status: {field_status}</li>
      <li>Type: {field_type}</li>
      <li>Sector: {field_sector}</li>
      <li>Last Updated: {changed}</li>
    </ul>
  </div>
);


const MemberList = () => {
  const [content, setContent] = useState(false);

  useEffect(() => {
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}members?page[limit]=10`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    fetch(url, headers)
      .then((response) => response.json())
      .then((data) => setContent(data.data))
      .catch(err => console.log('There was an error accessing the API', err))
  }, []);

  return (
    <div>
      <h2>Member Roster</h2>
      {content ? (
        content.map((item) => <RosterNode key={item.id} {...item.attributes} />)
      ) : (<NoData />)}
    </div>
  );
};

export default MemberList;
