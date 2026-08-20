import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteChatbotDocument,
  getChatbotAdminConfig,
  listChatbotDocuments,
  updateChatbotAdminConfig,
  uploadChatbotDocument,
} from "../api/admin";

export function useChatbotDocuments() {
  return useQuery({ queryKey: ["chatbot-documents"], queryFn: listChatbotDocuments });
}

export function useChatbotAdminConfig() {
  return useQuery({ queryKey: ["chatbot-config"], queryFn: getChatbotAdminConfig });
}

export function useUploadChatbotDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadChatbotDocument,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chatbot-documents"] }),
  });
}

export function useDeleteChatbotDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChatbotDocument,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chatbot-documents"] }),
  });
}

export function useUpdateChatbotConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateChatbotAdminConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatbot-config"] });
    },
  });
}
