export interface EnvVarDefinition {
  key: string;
  required: boolean;
  description: string;
  example?: string;
  defaultValue?: string;
  docsRefs?: string[];
}

export interface EnvTemplateResponse {
  title: string;
  description?: string;
  envExample: string;
  variables: EnvVarDefinition[];
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  docsRefs?: string[];
  optional?: boolean;
}

export interface SetupChecklistResponse {
  title: string;
  description?: string;
  items: ChecklistItem[];
  notes?: string;
}

export interface FileStructureNode {
  path: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileStructureNode[];
}

export interface FileStructureResponse {
  title: string;
  description?: string;
  root: FileStructureNode;
  notes?: string;
}
