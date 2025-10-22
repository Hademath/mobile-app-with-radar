
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


export interface SongMetadata {
  uuid?: string;
  title: string;
  artistId: string;
  artist?: string;
  genre: string;
  realeaseDate?: string;
  artworkUrl?: string;
  streamUrl?: string;
  file_url?: string;
  publicUrl?: string;
  cloudinary_resource_type?: string;
  isUploaded?: boolean;
  externalPlatform?: string;
  externalId?: string;
  uploadedStatus?: string;
  createdAt: string;
  updatedAt: string;
}