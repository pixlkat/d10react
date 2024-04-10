export const contentReducer = (state, action) => {
  let {list} = state;
  let idx;
  switch (action.type) {
    case 'initialize':
      const data = action.data.map((item) => ({
        ...item,
        showEditForm: false
      }));
      return {...state, list: data};

    case 'initialize_config':
      const fieldArr = action.data.map(item => {
        const fieldObj = {};
        fieldObj[item.name] = {
          label: item.attributes.label,
          type: item.attributes.type,
          isRequired: ('NotNull' in item.attributes.constraints),
        };
        if (item.attributes.type === 'list_string') {
          fieldObj[item.name]['settings'] = { allowed_values:  item.attributes.settings.allowed_values};
          fieldObj[item.name]['settings']['options'] = Object.entries(item.attributes.settings.allowed_values).map((entry) => {
            return {value: entry[0], label: entry[1]};
          });
        }
        else {
          fieldObj[item.name]['settings'] = item.attributes.settings;
        }
        return fieldObj;
      });
      const fields = Object.assign({}, ...fieldArr);
      return {...state, fieldConfig: fields};

    case 'add':
      // Add a new item to the content list.
      list.unshift(action.data);
      return {...state, list: list, showNodeAdd: false};

    case 'update':
      // Update an existing item in the list.
      idx = list.findIndex(item => item.id === action.data.id);
      list[idx] = action.data;
      return {...state, list: list};

    case 'delete':
      // Delete an item from the content list.
      list = list.filter(item => item.id !== action.data);
      return {...state, list: list};

    case 'show_add_form':
      return {...state, showNodeAdd: true};

    case 'cancel_add_form':
      return {...state, showNodeAdd: false};

    case 'edit_item':
      list = list.map((item) => (item.id === action.data ? {
        ...item,
        showEditForm: true
      } : item));
      return {...state, list: list}

    case 'cancel_edit':
      list = list.map((item) => (item.id === action.data ? {
        ...item,
        showEditForm: false
      } : item));
      return {...state, list: list}

    default:
      throw new Error('Unknown action.type');
  }
}
