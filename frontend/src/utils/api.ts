const api = () => {
  const BASE_URL = 'http://localhost:3000';
  return {
    BASE_URL,
    ALL_WORKSHOPS: `${BASE_URL}/workshops`,
    WORKSHOPS_COUNT: `${BASE_URL}/workshops/count`,
    CATEGORIES: `${BASE_URL}/workshops/categories`,
    paginatedWorkshops: (skip: number, limit: number) => {
      return `${BASE_URL}/workshops/paginated/${skip}/${limit}`;
    },
  };
};

export default api();
