const api = () => {
  const BASE_URL = 'http://localhost:3000';
  return {
    BASE_URL,
    ALL_WORKSHOPS: `${BASE_URL}/workshops`,
    WORKSHOPS_COUNT: `${BASE_URL}/workshops/count`,
    singleWorkshop: (id: string) => {
      return `${BASE_URL}/workshops/${id}`;
    },
    CATEGORIES: `${BASE_URL}/workshops/categories`,
    paginatedWorkshops: (skip: number, limit: number) => {
      return `${BASE_URL}/workshops/paginated/${skip}/${limit}`;
    },
    REGISTER_INSTRUCTOR: `${BASE_URL}/instructors/register`,
    LOGIN_INSTRUCTOR: `${BASE_URL}/instructors/login`,
    instructorWorkshops: (id: string) => {
      return `${BASE_URL}/instructors/${id}/workshops`;
    },
  };
};

export default api();
