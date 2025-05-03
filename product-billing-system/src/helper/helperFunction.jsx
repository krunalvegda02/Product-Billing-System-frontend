export function buildUrlWithParams(baseUrl, params = {}) {
  const { page, limit, search, category, standard } = params;

  const queryParams = new URLSearchParams();

  if (page) queryParams.append("page", page);
  if (limit) queryParams.append("limit", limit);
  if (search) queryParams.append("search", search);
  if (category) queryParams.append("category", category);
  if (standard) queryParams.append("standard", standard);

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

export function buildUploadUrlPath(baseUrl, params = {}) {
  const { folder } = params;

  if (!folder) return baseUrl;

  const sanitizedFolder = folder.split("/").filter(Boolean).join("/");

  return `${baseUrl}/${sanitizedFolder}`;
}

export function removeNullValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== null));
}
