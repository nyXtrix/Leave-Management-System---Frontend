import api from "../lib/api/BaseRequestProvider";

export const invitationService = {
  resendInvitation: (userExternalId: string) =>
    api.post<{ message: string }>(`/organization/invitation/resend/${userExternalId}`, {}, { showSuccessToast: true }),

  cancelInvitation: (userExternalId: string) =>
    api.post<{ message: string }>(`/organization/invitation/cancel/${userExternalId}`, {}, { showSuccessToast: true }),
};
