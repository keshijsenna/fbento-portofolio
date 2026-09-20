import React from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Server, 
  Smartphone, 
  Layers, 
  Globe, 
  Cpu, 
  GitBranch, 
  Box, 
  Workflow, 
  Cloud, 
  FileCode, 
  Layout, 
  Zap, 
  Activity,
  Compass
} from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const iconKey = name.toLowerCase().trim();

  // SVG brands or tailored icons
  switch (iconKey) {
    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21l-1.5-1.5v-21zm10.744 14.542c-.225-.333-.518-.61-.877-.828-.359-.22-.843-.45-1.453-.692-.61-.242-1.096-.464-1.458-.667-.361-.202-.635-.429-.821-.681-.186-.252-.279-.571-.279-.958 0-.414.127-.76.381-1.036.254-.277.625-.415 1.114-.415.538 0 .977.164 1.317.491.34.328.567.771.681 1.33h2.387c-.088-.841-.375-1.543-.861-2.106-.486-.563-1.127-.978-1.923-1.246-.795-.268-1.701-.402-2.717-.402-1.04 0-1.956.155-2.748.465-.792.31-1.411.758-1.857 1.344-.446.586-.669 1.3-.669 2.143 0 .744.17 1.37.51 1.88.34.509.824.93 1.453 1.262.629.332 1.385.642 2.268.93.883.288 1.547.575 1.992.86.445.286.742.613.891.982.149.369.224.814.224 1.336 0 .521-.137.962-.411 1.323-.274.361-.676.629-1.206.804-.53.175-1.173.263-1.93.263-.889 0-1.666-.145-2.33-.434-.664-.289-1.189-.737-1.575-1.345-.386-.607-.604-1.383-.654-2.327h-2.42c.07 1.135.394 2.062.972 2.781.578.72 1.347 1.245 2.308 1.577.961.332 2.072.498 3.333.498 1.211 0 2.257-.168 3.137-.504.88-.336 1.564-.828 2.052-1.477.488-.649.732-1.442.732-2.38 0-.829-.196-1.517-.588-2.063zm10.756-6.542h-8.086v2.185h2.827v11.815h2.464v-11.815h2.795z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.175-2.307-.607-.252-1.392-.47-1.873-.658-.755-.295-1.133-.591-1.133-1.071 0-.444.352-.756.974-.756.634 0 1.054.269 1.294.757.086.175.143.435.158.55l2.007-.803c-.22-.656-.632-1.217-1.233-1.636-.712-.497-1.666-.757-2.736-.757-1.045 0-1.956.284-2.618.814-.738.592-1.127 1.447-1.127 2.457 0 .977.464 1.764 1.343 2.278.683.398 1.548.654 2.317.933.729.266 1.033.488 1.033.918 0 .524-.46.852-1.229.852-.897 0-1.447-.417-1.706-1.157l-2.073.811c.361 1.085 1.082 1.83 2.064 2.213.731.285 1.635.435 2.614.435 1.223 0 2.261-.295 3.011-.861.818-.617 1.258-1.517 1.258-2.662zm-9.355-.386c-.092.174-.188.337-.301.479-.533.673-1.328 1.043-2.327 1.043-.687 0-1.29-.188-1.722-.536-.514-.415-.794-1.044-.794-1.802v-5.074h2.247v4.992c0 .64.331.957.886.957.51 0 .864-.326.969-.877v-5.072h2.25v6.529c0 .736-.188 1.391-.564 1.944l-1.644-2.583z"/>
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="2"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
        </svg>
      );
    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.32 17.52l-5.69-7.39V17h-1.8V7h1.8l5.69 7.39V7h1.8v10.52h-1.8z" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 6c-3.14 0-5.18 1.57-6.13 4.71 1.15-1.57 2.48-2.15 4-1.72 1.05.3 1.8 1.07 2.63 1.92 1.35 1.38 2.92 2.99 6.36 2.99 3.14 0 5.18-1.57 6.13-4.71-1.15 1.57-2.48 2.15-4 1.72-1.05-.3-1.8-1.07-2.63-1.92C16.99 7.61 15.42 6 12 6zm-6 6c-3.14 0-5.18 1.57-6.13 4.71 1.15-1.57 2.48-2.15 4-1.72 1.05.3 1.8 1.07 2.63 1.92 1.35 1.38 2.92 2.99 6.36 2.99 3.14 0 5.18-1.57 6.13-4.71-1.15 1.57-2.48 2.15-4 1.72-1.05-.3-1.8-1.07-2.63-1.92C10.99 13.61 9.42 12 6 12z"/>
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M11.87 0c-5.74 0-5.38 2.49-5.38 2.49l.01 2.58h5.47v.77H4.37S0 5.35 0 11.23c0 5.87 3.82 5.66 3.82 5.66h2.28v-3.21s-.12-3.82 3.77-3.82h6.47s3.65.06 3.65-3.53V2.49S20.48 0 11.87 0zm-2.92 1.77a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.18 22.23c5.74 0 5.38-2.49 5.38-2.49l-.01-2.58h-5.47v-.77h7.6s4.37.49 4.37-5.39c0-5.87-3.82-5.66-3.82-5.66h-2.28v3.21s.12 3.82-3.77 3.82H10.5s-3.65-.06-3.65 3.53v3.84s-.49 2.49 8.12 2.49zm2.92-1.77a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"/>
        </svg>
      );
    case 'flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM14.314 11.4L7.3 18.414 10.9 22l7.014-7.014-3.6-3.586zm7.37 0l-3.6 3.6 3.6 3.6 3.6-3.6-3.6-3.6z"/>
        </svg>
      );
    case 'kotlin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M24 24H0V0h24L12 12z"/>
        </svg>
      );
    case 'android':
      return <Smartphone className={className} />;
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22.5 10.5c-.3-.2-1.3-.7-2.6-.3-.3-1.6-1.5-2.2-1.6-2.3l-.4-.2-.2.4c-.6 1.1-.3 2.1-.2 2.7-.8.5-2 .5-2.7.2l-.3-.2-.2.3c-.6 1.1-.3 2.1-.2 2.7-.9.6-2.5.5-3.3 0H0c.3 3.5 2.8 6.4 6.3 7.5 4.6 1.4 9.9 1 14.2-1.5 2.6-1.5 3.5-4.5 3.5-4.6v-.3l-.3-.3c-.3-.2-.9-.4-1.2-.4zm-8.8-7.8h-2.1v2.1h2.1V2.7zm-2.8 0H8.8v2.1h2.1V2.7zm5.6 0h-2.1v2.1h2.1V2.7zm-8.4 2.8H6.1v2.1H8V5.5zm2.8 0H8.8v2.1h2.1V5.5zm2.8 0h-2.1v2.1h2.1V5.5zm2.8 0h-2.1v2.1h2.1V5.5zm-8.4 2.8H6.1v2.1H8V8.3zm2.8 0H8.8v2.1h2.1V8.3zm2.8 0h-2.1v2.1h2.1V8.3z"/>
        </svg>
      );
    case 'git':
      return <GitBranch className={className} />;
    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'postgresql':
    case 'sql':
    case 'mysql':
      return <Database className={className} />;
    case 'mongodb':
      return <Layers className={className} />;
    case 'firebase':
      return <Zap className={className} />;
    case 'nodejs':
    case 'express':
      return <Server className={className} />;
    case 'laravel':
      return <Workflow className={className} />;
    case 'framer':
      return <Activity className={className} />;
    case 'vite':
      return <Zap className={className} />;
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case 'linux':
      return <Terminal className={className} />;
    case 'figma':
      return <Layout className={className} />;
    case 'api':
      return <Globe className={className} />;
    case 'java':
      return <Cpu className={className} />;
    case 'html5':
      return <FileCode className={className} />;
    default:
      return <Code2 className={className} />;
  }
};
