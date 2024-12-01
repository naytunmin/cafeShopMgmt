
const API_BASE_URL = "http://localhost:5124";

const API_ENDPOINTS = {
  CAFE_SHOP: {
    GET: "/api/CafeShop",
    UPDATE: "/api/CafeShop/Update",
    INSERT: "/api/CafeShop/Insert",
    DELETE: "/api/CafeShop/Delete",
  },
  EMPLOYEE: {
    GET: "/api/Employee",
    UPDATE: "/api/Employee/Update",
    INSERT: "/api/Employee/Insert",
    DELETE: "/api/Employee/Delete",
  },
};

export { API_BASE_URL, API_ENDPOINTS };
