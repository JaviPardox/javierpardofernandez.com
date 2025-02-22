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
  type: 'small_title' | 'text' | 'image' | 'code_block' | 'dotted_list' | 'numbered_list';
  content: string | string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  preview_text: string;
  content_blocks: BlogContentBlock[];
}

export interface Academic {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  logo_path: string;
}

export interface Organization {
  name: string;
  chapter: string;
  role: string;
  duration: string;
  description: string;
  logo_path: string;
}

export interface Records {
  academics: Academic[];
  organizations: Organization[];
}