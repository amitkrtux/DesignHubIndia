import { cn } from "@/lib/utils"

interface DHILogoProps {
  size?: number
  className?: string
  /**
   * "color" = full colour on light backgrounds (white structure path → dark navy)
   * "dark"  = full colour on dark backgrounds (white structure path stays white)
   */
  bg?: "light" | "dark"
}

/**
 * Official Design Hub India logo SVG.
 * The coloured accent paths (blue, pink, yellow) stay constant.
 * The white structural overlay switches to #121840 on light backgrounds
 * so it remains visible against white/light surfaces.
 */
export function DHILogo({ size = 38, className, bg = "dark" }: DHILogoProps) {
  // On light backgrounds the white structure path would vanish — swap to dark navy
  const structureColor = bg === "light" ? "#121840" : "#ffffff"

  return (
    <svg
      width={size}
      height={Math.round(size * (39 / 38))}
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Design Hub India"
    >
      <g clipPath="url(#dhi-clip)">
        {/* Blue facet — top left */}
        <path
          d="M9.37646 5.14478L17.8483 9.37669V19.5831L9.37646 15.2682V5.14478Z"
          fill="#0070F2"
        />
        {/* Pink facet — top right */}
        <path
          d="M37.9177 12.4469L29.4458 16.6788V26.8852L37.9177 22.5703V12.4469Z"
          fill="#FF5C77"
        />
        {/* Yellow facet — bottom */}
        <path
          d="M14.8874 24.5618L6.41553 28.7937V39.0001L14.8874 34.6852V24.5618Z"
          fill="#FFDF72"
        />
        {/* Structural overlay — adapts to background */}
        <path
          d="M17.5545 0.144431C17.7553 0.0567776 17.9853 0.062892 18.1819 0.163069L26.6537 4.47796L26.6995 4.5034C26.9222 4.63743 27.0604 4.88051 27.0604 5.14471V14.8503L35.0434 18.9162L35.0891 18.9417C35.3118 19.0757 35.45 19.3188 35.45 19.583V29.7064C35.45 29.9882 35.2927 30.2461 35.0434 30.3732L26.5715 34.6881C26.3617 34.7948 26.114 34.7948 25.9043 34.6881L17.766 30.543L9.62781 34.6881C9.41801 34.7948 9.1703 34.7948 8.96049 34.6881L0.488628 30.3732C0.239253 30.2461 0.0820312 29.9882 0.0820312 29.7064V19.583C0.0820312 19.3012 0.239253 19.0433 0.488628 18.9162L8.63614 14.7665V5.14471C8.63614 4.86288 8.79336 4.60498 9.04274 4.47796L17.5147 0.163069L17.5545 0.144431ZM1.56255 29.2465L8.55389 32.8077V24.2784L1.56255 20.7862V29.2465ZM10.0344 24.2784V32.8077L17.0258 29.2465V20.7862L10.0344 24.2784ZM18.5063 29.2465L25.4976 32.8077V24.2784L18.5063 20.7862V29.2465ZM26.9781 24.2784V32.8077L33.9695 29.2465V20.7862L26.9781 24.2784ZM2.47776 19.5764L9.29415 22.9815L16.1104 19.5764L9.29415 16.1047L2.47776 19.5764ZM19.4629 19.5971L26.2379 22.9815L33.0542 19.5764L26.279 16.1256L19.4629 19.5971ZM10.1167 14.8083L17.108 18.3694V9.84015L10.1167 6.3479V14.8083ZM18.5885 9.84015V18.3274L25.5799 14.7665V6.3479L18.5885 9.84015ZM11.0319 5.13807L17.8483 8.5431L24.6646 5.13807L17.8483 1.66641L11.0319 5.13807Z"
          fill={structureColor}
        />
      </g>
      <defs>
        <clipPath id="dhi-clip">
          <rect width="38" height="39" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

interface DHIWordmarkProps {
  size?: "sm" | "md" | "lg"
  bg?: "light" | "dark"
  className?: string
}

export function DHIWordmark({ size = "md", bg = "light", className }: DHIWordmarkProps) {
  const logoSize  = size === "sm" ? 28 : size === "lg" ? 44 : 36
  const nameCls   = bg === "dark" ? "text-white"   : "text-[#121840]"
  const tagCls    = bg === "dark" ? "text-[#60a5fa]" : "text-[#2563eb]"
  const nameSize  = size === "sm" ? "text-[13px]"  : size === "lg" ? "text-[17px]" : "text-sm"
  const tagSize   = size === "sm" ? "text-[9px]"   : "text-[10px]"

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <DHILogo size={logoSize} bg={bg} />
      <div className="flex flex-col leading-none gap-0.5">
        <span className={cn("font-bold tracking-tight", nameSize, nameCls)}>
          Design Hub
        </span>
        <span className={cn("font-bold uppercase tracking-[0.18em]", tagSize, tagCls)}>
          India
        </span>
      </div>
    </div>
  )
}
