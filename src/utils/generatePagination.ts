export const generatePagination = (
  page: number,
  limit: number,
  total: number,
) => {
  const totalPages = Math.ceil(total / limit);
  const nextPage = page + 1 > totalPages ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    total_records: total,
    current_page: page,
    total_pages: totalPages,
    next_page: nextPage,
    prev_page: prevPage,
  };
};
