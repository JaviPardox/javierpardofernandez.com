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
