
export interface PromptOption {
  uuid: string;
  option: string;
  description: string | null;
  result_published: boolean;
}

export interface CampaignPrompt {
  id: number;
  uuid: string;
  question: string;
  campaignId: string;
  allow_multiple_choice: boolean;
  responses: any[];
  createdAt: string;
  updatedAt: string;
  options: PromptOption[];
}