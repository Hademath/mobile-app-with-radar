import { AxiosResponse } from "axios";
import { authInstance } from "@/utils/apiService";
import { campaignType } from "@/schemas/campaignSchema";

export const createCampaign= async(songId: string, data :campaignType): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.post(`/campaigns/create-campaign/${songId}`, data);
      return response;
    } catch (error) {
      console.log("❌❌❌❌❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  }

export const getCampaignById = async (campaignId: string): Promise<AxiosResponse<any>> => {
    try {   
        const response = await authInstance.get(`/campaigns/${campaignId}`);
        return response;
    } catch (error) {
        console.log("❌ Request failed:", JSON.stringify(error, null, 2));
        return Promise.reject(error);
    }
}

export const submitCampaignData = async ( campaignId: string, data: any ): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.put(`/campaigns/update-campaign/${campaignId}`, data);
      return response;
    } catch (error) {
      console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
}

export const launchCampaign = async ( campaignId: string ): Promise<AxiosResponse<any>> => {
    try {
      const response = await authInstance.post(`/campaigns/launch-campaign/${campaignId}`);
      return response;
    } catch (error) {
      console.log("❌ Request failed:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
}