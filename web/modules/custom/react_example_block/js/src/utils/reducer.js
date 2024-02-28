export const contentReducer = (state, action) => {
  console.log('IN REDUCER');
  console.log(state);
  console.log(action);
  let {list} = state;
  let idx;
  switch (action.type) {
    case 'initialize':
      const data = action.data.map((item) => ({
        ...item,
        showEditForm: false
      }));
      return {...state, list: data};

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
