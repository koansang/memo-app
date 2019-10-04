import httpClient from './httpClient';

export async function listMemos() {
  const response = await httpClient.get('/memos');

  return response.data;
}

export async function listLabel() {
  const response = await httpClient.get('/labels');

  return response.data;
}

export async function addLabel(label) {
  const response = await httpClient.post('/labels', { title: label });

  return response.data;
}

export async function deleteLabel(labelId) {
  const response = await httpClient.delete(`/labels/${labelId}`);

  return response.status;
}

export async function editLabel(labelId, title) {
  const response = await httpClient.put(`/labels/${labelId}`, { title });

  return response.data;
}

export async function attachLabel(labelId, memoIds) {
  const response = await httpClient.post(`/labels/${labelId}/memos`, { memoIds });

  return response.data;
}

export async function detachLabel(labelId, memoIds) {
  const response = await httpClient.delete(`/labels/${labelId}/memos`, { data: { memoIds } });

  return response.data;
}

export async function addMemo(memo) {
  const response = await httpClient.post('/memos', { ...memo });

  return response.data;
}

export async function deleteMemo(memoId) {
  const response = await httpClient.delete(`/memos/${memoId}`);

  return response.data;
}

export async function editMemo(memoId, memo) {
  const response = await httpClient.put(`/memos/${memoId}`, { ...memo });

  return response.data;
}
