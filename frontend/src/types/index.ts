export interface Project {
    id: number;
    title: string;
    description: string;
  }

export interface IconItem {
  content: string;
  iconClass: string;
}

export interface CompanyAndDateInfo {
  url: string;
  companyName: string;
  date: string;
}

// KEYS NEED TO MATCH WITH BACKEND!!!
export interface WorkExperienceItem {
  hashtags: string[];
  icons: IconItem[];
  companyAndDateInfo: CompanyAndDateInfo;
  jobPosition: string;
  jobDescription: string[];
}

export interface WorkExperience {
  data: WorkExperienceItem[];
}

export interface BlogPreview {
  id: string;
  date: string;
  title: string;
  preview_text: string;
}

export interface BlogContentBlock {
  type: 'title' | 'smallTitle' | 'paragraph' | 'image' | 'code' | 'dottedList' | 'numberedList';
  content: string | string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: BlogContentBlock[];
}
