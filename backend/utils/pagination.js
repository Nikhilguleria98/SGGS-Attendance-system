exports.getPagination = (page = 1, limit = 10) => {
    page = Number(page);
    limit = Number(limit);

    return {
        skip: (page - 1) * limit,
        limit,
    };
};