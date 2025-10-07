export const HEADER_TABLE_MENU = [
  "No",
  "Name",
  "Category",
  "Description",
  "Price",
  "action",
];
export const INITIAL_MENU_FORM = {
  name: "",
  category: "",
  description: "",
  price: "",
  discount: "",
  image_url: "",
  is_available: "",
};

export const CATEGORY_LIST = [
  {
    value: "salads",
    label: "Salads",
  },
  {
    value: "coffee",
    label: "Coffee",
  },
  {
    value: "tea",
    label: "Tea",
  },
];

export const AVAILABILITY_LIST = [
  {
    value: "true",
    label: "Available",
  },
  {
    value: "false",
    label: "Unavailable",
  },
];

export const INITIAL_STATE_MENU = {
  status: "idle",
  errors: {
    name: [],
    description: [],
    category: [],
    price: [],
    discount: [],
    is_available: [],
    image_url: [],
    _form: [],
  },
};
