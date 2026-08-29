"use client";

interface IconProps {
  className?: string;
  size?: number;
}

// Geometric shield - angular like the logo
export function ShieldIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7V12C3 17.5 6.8 22.7 12 24C17.2 22.7 21 17.5 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M12 6L7 8.5V12C7 15 9.2 17.8 12 18.5C14.8 17.8 17 15 17 12V8.5L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M12 10L9.5 11.5V13C9.5 14.5 10.6 15.8 12 16C13.4 15.8 14.5 14.5 14.5 13V11.5L12 10Z" fill="currentColor"/>
    </svg>
  );
}

// Geometric brain - angular circuits
export function BrainIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8 2 5 5 5 8C3 8 1 10 1 12.5C1 15 3 17 5 17V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V17C21 17 23 15 23 12.5C23 10 21 8 19 8C19 5 16 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M9 12H15M12 9V15" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="10" width="4" height="4" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

// Geometric database - stacked blocks
export function DatabaseIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="6" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="10" width="18" height="6" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="17" width="18" height="4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="3" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric link - angular chain
export function LinkIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M10 14C10.5 14.5 11.2 14.8 12 14.8C12.8 14.8 13.5 14.5 14 14L18 10C19.1 8.9 19.1 7.1 18 6C16.9 4.9 15.1 4.9 14 6L12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M14 10C13.5 9.5 12.8 9.2 12 9.2C11.2 9.2 10.5 9.5 10 10L6 14C4.9 15.1 4.9 16.9 6 18C7.1 19.1 8.9 19.1 10 18L11.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <rect x="11" y="11" width="2" height="2" fill="currentColor"/>
    </svg>
  );
}

// Geometric code - angular brackets
export function CodeIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 6L3 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M16 6L21 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <line x1="14" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric globe - angular sphere
export function GlobeIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="0" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 7C6 7 9 8 12 8C15 8 18 7 21 7" stroke="currentColor" strokeWidth="1"/>
      <path d="M3 17C6 17 9 16 12 16C15 16 18 17 21 17" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

// Geometric lock - angular padlock
export function LockIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="10" width="14" height="11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <rect x="10" y="14" width="4" height="4" fill="currentColor"/>
    </svg>
  );
}

// Geometric check - angular checkmark in box
export function CheckIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 12L10 16L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  );
}

// Geometric zap - angular lightning
export function ZapIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L4 14H11L10 22L20 10H13L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
    </svg>
  );
}

// Geometric arrow - angular right arrow
export function ArrowIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Geometric search - angular magnifier
export function SearchIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="12" height="12" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 9 9)" style={{transformOrigin: 'center'}}/>
      <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric clock - angular time
export function ClockIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="7" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric chart - angular bar chart
export function ChartIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="14" width="4" height="7" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="8" width="4" height="13" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="17" y="3" width="4" height="18" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric settings - angular gear
export function SettingsIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="10" width="4" height="4" fill="currentColor"/>
      <path d="M10 2H14V5H10V2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 19H14V22H10V19Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 10V14H5V10H2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19 10V22H22V10H19Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric history - angular circular arrow
export function HistoryIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21C9 21 6.5 19.5 5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <path d="M3 7V12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <rect x="10" y="10" width="4" height="4" fill="currentColor"/>
    </svg>
  );
}

// Geometric plus - angular add
export function PlusIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="10" y="4" width="4" height="16" fill="currentColor"/>
      <rect x="4" y="10" width="16" height="4" fill="currentColor"/>
    </svg>
  );
}

// Geometric external link - angular arrow out
export function ExternalLinkIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Geometric wallet - angular purse
export function WalletIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="6" width="20" height="14" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="16" y="11" width="4" height="4" fill="currentColor"/>
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// Geometric play
export function PlayIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 4L20 12L6 20V4Z" fill="currentColor"/>
    </svg>
  );
}

// Geometric pause
export function PauseIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
      <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
    </svg>
  );
}

// Geometric chevron right
export function ChevronIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Geometric arrow left
export function ArrowLeftIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Geometric X circle
export function XCircleIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Warning triangle - geometric
export function WarningIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L2 21H22L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M12 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
      <rect x="11" y="17" width="2" height="2" fill="currentColor"/>
    </svg>
  );
}

// Ban/block circle
export function BanIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Eye with slash - no visibility
export function EyeOffIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Shield with check - verified safety
export function ShieldCheckIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L3 7V12C3 17.5 6.8 22.7 12 24C17.2 22.7 21 17.5 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

// Token/coin icon
export function TokenIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V18M9 8H14C15.1 8 16 8.9 16 10C16 11.1 15.1 12 14 12H9M9 12H15C16.1 12 17 12.9 17 14C17 15.1 16.1 16 15 16H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

// Lock closed - enforced rules
export function LockEnforcedIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="11" width="14" height="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 11V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
      <rect x="10" y="14" width="4" height="4" fill="currentColor"/>
    </svg>
  );
}
