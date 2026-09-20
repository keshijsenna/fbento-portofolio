export interface CvPackage {
  id: 'pdf' | 'docx' | 'zip';
  name: string;
  extension: string;
  sizeChip: string;
  description: string;
  checksum: string;
  version: string;
  updatedDate: string;
  formatDetails: {
    target: string;
    pagesOrFiles: string;
    encryption: string;
    includedAssets: string;
  };
}

export const CV_PACKAGES: CvPackage[] = [
  {
    id: 'pdf',
    name: 'FULL ENGINEERING RESUME',
    extension: '.PDF',
    sizeChip: '240 KB',
    description: 'ATS-optimized curriculum vitae formatted for corporate engineering leadership and enterprise screening engines.',
    checksum: 'SHA256: 8F2A...9C1D',
    version: 'v4.8.2',
    updatedDate: 'SEP 2026',
    formatDetails: {
      target: 'ATS & Enterprise Portals',
      pagesOrFiles: '2 Pages / Clean Text Layout',
      encryption: '256-bit Unencrypted Public Document',
      includedAssets: 'Work History, Verified Metrics, Contact Transmission',
    },
  },
  {
    id: 'docx',
    name: 'EDITABLE EXECUTIVE SPECIFICATION',
    extension: '.DOCX',
    sizeChip: '180 KB',
    description: 'Structured Microsoft Word document containing raw bullet points, technology matrix, and project references.',
    checksum: 'SHA256: 3D4B...7E8A',
    version: 'v4.8.2',
    updatedDate: 'SEP 2026',
    formatDetails: {
      target: 'Technical Recruiters & Headhunters',
      pagesOrFiles: '2 Pages / Word OpenXML',
      encryption: 'Standard Signature Validated',
      includedAssets: 'Editable Bio, Expanded Tech Stacks, References',
    },
  },
  {
    id: 'zip',
    name: 'OFFLINE PORTFOLIO & CODE BUNDLE',
    extension: '.ZIP ARCHIVE',
    sizeChip: '4.2 MB',
    description: 'Offline HTML interactive documentation, case study PDFs, verified credential hashes, and high-res schematics.',
    checksum: 'SHA256: A1E9...5F2C',
    version: 'v4.8.2',
    updatedDate: 'SEP 2026',
    formatDetails: {
      target: 'Direct Client & Offline Evaluation',
      pagesOrFiles: '14 Files / Self-Contained Bundle',
      encryption: 'Integrity Checksum Verified',
      includedAssets: 'Full Offline Portfolio, High-Res Schematics, Code Samples',
    },
  },
];

export const TRUST_BADGES = [
  { label: 'OPEN SOURCE CODEBASE', variant: 'lime' },
  { label: 'NO THIRD-PARTY TRACKING', variant: 'white' },
  { label: 'UPDATED SEPTEMBER 2026', variant: 'indigo' },
  { label: 'ZERO VULNERABILITIES', variant: 'black' },
] as const;
