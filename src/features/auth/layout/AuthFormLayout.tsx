import React from 'react'
import type { ReactNode } from 'react'

interface AuthFormLayoutProps {
  children: ReactNode;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
}

const AuthFormLayout = ({ 
  children, 
  actions, 
  image, 
  imageAlt = "Authentication Workspace" 
}: AuthFormLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex w-full justify-center items-center overflow-hidden">
      {/* Left: Illustration Area (Visible on Desktop) */}
      {image && (
        <div className="animate-reveal w-full hidden md:block pl-20 flex-1">
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full max-w-xl h-auto object-contain drop-shadow-2xl opacity-90 transition-opacity hover:opacity-100" 
          />
        </div>
      )}

      {/* Right: Interaction Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[500px]">
          <div className="relative bg-white/40 glass border border-primary-100 rounded-xl shadow-premium p-8 md:p-12 transition-all duration-300">
            {/* Header / Brand Area (Optional) */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            {/* Main Form Content */}
            <div className="relative z-10 w-full">
              {children}
            </div>

            {/* Action Buttons / Footer Area */}
            {actions && (
              <div className="relative z-10 mt-10 pt-8 border-t border-slate-100/50 flex flex-col items-center gap-4">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthFormLayout