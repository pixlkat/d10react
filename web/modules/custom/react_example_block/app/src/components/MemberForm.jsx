import React, {useState} from "react";
import {fetchWithCSRFToken} from "../utils/fetch";

const MemberForm = ({
                      id,
                      field_first_name,
                      field_last_name,
                      field_type,
                      field_status,
                      field_sector,
                      onSuccess,
                      fieldConfig
                    }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({
    success: null,
    error: null,
    message: '',
  });

  // Get our options from config
  const typeOptions = fieldConfig['field_type']['settings']['options'];

  const statusOptions = fieldConfig['field_status']['settings']['options'];

  const sectorOptions = fieldConfig['field_sector']['settings']['options'];

  const defaultValues = {
    field_first_name: field_first_name ?? '',
    field_last_name: field_last_name ?? '',
    field_type: field_type.value ?? '',
    field_status: field_status.value ?? '',
    field_sector: field_sector.value ?? '',
  };

  const [values, setValues] = useState(defaultValues);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (event) => {
    setSubmitting(true);
    event.preventDefault();

    const csrfUrl = '/session/token?_format=json';
    const fetchUrl = id ? `/jsonapi/members/${id}` : `jsonapi/members`;

    let data = {
      data: {
        type: 'node--member',
        attributes: {
          field_first_name: `${values.field_first_name}`,
          field_last_name: `${values.field_last_name}`,
          field_type: `${values.field_type}`,
          field_status: `${values.field_status}`,
          field_sector: `${values.field_sector}`,
        }
      }
    };
    if (id) {
      data.data.id = id;
    }
    const fetchOptions = {
      method: id ? 'PATCH' : 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Cache': 'no-cache',
      }),
      body: JSON.stringify(data),
    };

    try {
      fetchWithCSRFToken(csrfUrl, fetchUrl, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
          setSubmitting(false);

          if (data.errors && data.errors.length > 0) {
            setResult({
              success: false,
              error: true,
              message: <div
                className="messages messages--error">{data.errors[0].title}: {data.errors[0].detail}</div>,
            });
            return false;
          }

          setValues(defaultValues);
          if (data.data.id) {
            setResult({
              success: true,
              message: <div
                className="messages messages--status">{(id ? 'Updated' : 'Added')}: <em>{data.data.attributes.title}</em>
              </div>,
            });

            if (typeof onSuccess === 'function') {
              data.data.showEditForm = false;
              onSuccess(data.data);
            }
          }
        });
    } catch (error) {
      console.log('Error while contacting API', error);
      setSubmitting(false);
    }
  };


  if (isSubmitting) {
    return (
      <div>
        Processing ...
      </div>
    )
  }

  return (
    <div>
      {(result.success || result.error) &&
        <div>
          <h2>{(result.success ? 'Success!' : 'Error')}</h2>
          {result.message}
        </div>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:
            <input
              name="field_first_name"
              type="text"
              value={values.field_first_name}
              onChange={handleInputChange}
            />
          </label>

          <label>Last Name:
            <input
              name="field_last_name"
              type="text"
              value={values.field_last_name}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div>
          <label>Sector:
            <select name="field_sector" value={values.field_sector}
                    onChange={handleInputChange}>
              <option value="">-- Select --</option>
              {sectorOptions.map(option => <option key={option.value}
                                                   value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div>
          <label>Type:
            <select name="field_type" value={values.field_type}
                    onChange={handleInputChange}>
              <option value="">-- Select --</option>
              {typeOptions.map(option => <option key={option.value}
                                                 value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div>
          <label>Status:
            <select name="field_status" value={values.field_status}
                    onChange={handleInputChange}>
              <option value="">-- Select --</option>

              {statusOptions.map(option => <option key={option.value}
                                                   value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>

        <div>
          <input name="submit" type="submit" value={id ? 'Update' : 'Add'}/>
        </div>

      </form>
    </div>
  );

};

export default MemberForm;
