import React, { useEffect, useReducer } from "react";
import {contentReducer} from "../utils/reducer";
import {isValidData} from "../utils/validate";

import MemberAdd from "./MemberAdd";
import MemberItem from "./MemberItem";
import NoData from "./NoData";



const MemberRosterReadWrite = () => {
  const initialState = {
    list: [],
    showNodeAdd: false,
  };
  const [content, dispatchContentAction] = useReducer(contentReducer, initialState);

  useEffect(() => {
    // This should point to your local Drupal instance. Alternatively, for React
    // applications embedded in a Drupal theme or module this could also be set
    // to a relative path.
    const API_ROOT = '/jsonapi/';
    const url = `${API_ROOT}members`;

    const headers = new Headers({
      Accept: 'application/vnd.api+json',
    });

    fetch(url, {headers})
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          dispatchContentAction({ type: 'initialize', data: data.data });
        }
      })
      .catch(err => console.log('There was an error accessing the API', err));
  }, []);

  return (
    <div>
      <h2>Member Roster</h2>
      {content.list.length ? (
        <div>
          {
            content.list.map((item) => <MemberItem key={item.id} id={item.id} dispatchContentAction={dispatchContentAction} showEditForm={item.showEditForm} {...item.attributes} />)
          }
        </div>
       ) : (
        <NoData />
      )}
      <hr/>
      {content.showNodeAdd ? (
        <MemberAdd onSuccess={data => dispatchContentAction({ type: 'add', data: data })} />
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
