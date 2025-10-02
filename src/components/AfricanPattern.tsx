export function AfricanPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="african-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Adinkra-inspired patterns */}
          <circle cx="25" cy="25" r="3" fill="currentColor" />
          <circle cx="75" cy="75" r="3" fill="currentColor" />
          <circle cx="25" cy="75" r="3" fill="currentColor" />
          <circle cx="75" cy="25" r="3" fill="currentColor" />
          
          {/* Connecting lines */}
          <path d="M 25 25 L 75 25 L 75 75 L 25 75 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M 25 25 L 75 75" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 75 25 L 25 75" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Center diamond */}
          <path d="M 50 35 L 60 50 L 50 65 L 40 50 Z" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#african-pattern)" />
    </svg>
  );
}
