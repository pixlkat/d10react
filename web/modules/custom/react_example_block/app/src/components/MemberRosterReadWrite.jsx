import React, { useEffect, useReducer } from "react";
import {contentReducer} from "../utils/reducer";
import {isValidData} from "../utils/validate";
import MemberAdd from "./MemberAdd";
import MemberItem from "./MemberItem";
import NoData from "./NoData";
import {fetchWithCSRFToken} from "../utils/fetch";



const MemberRosterReadWrite = () => {
  const initialState = {
    list: [],
    fieldConfig: {},
    showNodeAdd: false,
  };
  const [content, dispatchContentAction] = useReducer(contentReducer, initialState);


  useEffect(() => {
    // This should point to your local Drupal instance. Alternatively, for React
    // applications embedded in a Drupal theme or module this could also be set
    // to a relative path.
    const API_ROOT = '/jsonapi/';
    const csrfUrl = `/session/token?_format=json`;
    const fetchOptions = {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Cache': 'no-cache'
      }),
    };

    const url = `${API_ROOT}members`;

    fetchWithCSRFToken(csrfUrl, url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          dispatchContentAction({ type: 'initialize', data: data.data });
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));

    // Grab the field configs, requires authentication.
    const fetchUrl = '/api/member-field-config';

    fetchWithCSRFToken(csrfUrl, fetchUrl, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('INIT CONFIG', data);
        if (isValidData(data)) {
          dispatchContentAction({ type: 'initialize_config', data: data.data });
        }
      })
      .catch(err => console.log('there was an error retrieving field config', err));


  }, []);

  return (
    <div>
      <h2>Member Roster</h2>
      {content.list.length && Object.keys(content.fieldConfig).length ? (
        <div>
          {
            content.list.map((item) => <MemberItem key={item.id} id={item.id} member={item} dispatchContentAction={dispatchContentAction} showEditForm={item.showEditForm} fieldConfig={content.fieldConfig}  />)
          }
        </div>
       ) : (
        <NoData />
      )}
      <hr/>
      {content.showNodeAdd ? (
        <MemberAdd onSuccess={data => dispatchContentAction({ type: 'add', data: data })} dispatchContentAction={dispatchContentAction} fieldConfig={content.fieldConfig} />
      ) : (
        <p>
          <button
            onClick={() => dispatchContentAction({type: 'show_add_form'})}>Add
            New Member
          </button>
        </p>
      )
      }

    </div>
  );
};

export default MemberRosterReadWrite;
