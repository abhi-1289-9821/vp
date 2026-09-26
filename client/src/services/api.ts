import { fetchWithAuth } from './apiClient.js';

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (payload: any) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMe: () => fetchWithAuth('/auth/me'),
};

export const citizenApi = {
  getCitizenDashboard: () => fetchWithAuth('/citizen/dashboard'),
  getCitizenCases: () => fetchWithAuth('/citizen/cases'),
};

export const caseApi = {
  getCaseById: (id: string) => fetchWithAuth(`/cases/${id}`),
  getCaseTimeline: (id: string) => fetchWithAuth(`/cases/${id}/timeline`),
  getCaseCompensation: (id: string) => fetchWithAuth(`/cases/${id}/compensation`),
  getCaseRR: (id: string) => fetchWithAuth(`/cases/${id}/rr`),
  getCaseDocuments: (id: string) => fetchWithAuth(`/cases/${id}/documents`),
  getCaseActions: (id: string) => fetchWithAuth(`/cases/${id}/actions`),
  updateActionStatus: (actionId: string, status: string) =>
    fetchWithAuth(`/cases/actions/${actionId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export const parcelApi = {
  searchParcels: (params: { q?: string; survey?: string; village?: string; district?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`/parcels/search?${query}`);
  },
  getParcelById: (id: string) => fetchWithAuth(`/parcels/${id}`),
};

export const documentApi = {
  uploadDocument: (formData: FormData) =>
    fetchWithAuth('/documents/upload', {
      method: 'POST',
      body: formData,
    }),
  getUserDocuments: () => fetchWithAuth('/documents/my'),
  getDocumentById: (id: string) => fetchWithAuth(`/documents/${id}`),
};

export const grievanceApi = {
  createGrievance: (payload: {
    caseId?: string;
    parcelId?: string;
    category: string;
    title: string;
    description: string;
    detectedDiscrepancy?: any;
    attachmentUrl?: string;
  }) =>
    fetchWithAuth('/grievances', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getGrievances: () => fetchWithAuth('/grievances'),
  getGrievanceById: (id: string) => fetchWithAuth(`/grievances/${id}`),
};

export const notificationApi = {
  getNotifications: () => fetchWithAuth('/notifications'),
  markNotificationRead: (id: string) =>
    fetchWithAuth(`/notifications/${id}/read`, {
      method: 'PATCH',
    }),
  markAllNotificationsRead: () =>
    fetchWithAuth('/notifications/read-all', {
      method: 'PATCH',
    }),
};

export const officerApi = {
  getOfficerDashboard: () => fetchWithAuth('/officer/dashboard'),
  getOfficerCases: (params?: { stage?: string; search?: string }) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchWithAuth(`/officer/cases${query ? `?${query}` : ''}`);
  },
  updateGrievanceStatus: (id: string, payload: { status: string; officerResponse: string }) =>
    fetchWithAuth(`/officer/grievances/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  updateCaseStage: (id: string, payload: { stage: string; remarks?: string }) =>
    fetchWithAuth(`/officer/cases/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};

// Unified api object for backward compatibility across all existing pages
export const api = {
  ...authApi,
  ...citizenApi,
  ...caseApi,
  ...parcelApi,
  ...documentApi,
  ...grievanceApi,
  ...notificationApi,
  ...officerApi,
};
