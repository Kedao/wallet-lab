import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EntropyVisualizer } from './EntropyStep/components/EntropyVisualizer'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface StepLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  icon: React.ElementType
  color?: 'blue' | 'yellow' | 'green' | 'purple'
  onNext?: () => void
  onBack?: () => void // Optional back button
  nextLabel?: string
  footerContent?: ReactNode // Custom footer content
}

export function StepLayout({ 
  children, 
  title, 
  subtitle, 
  icon: Icon,
  color = 'blue',
  onNext,
  onBack,
  nextLabel = "Continue",
  footerContent
}: StepLayoutProps) {
  
  // Map logic colors to tailwind classes
  const colorMap = {
    blue: {
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        glow: 'shadow-blue-500/20',
        bg: 'bg-blue-500',
        bg_soft: 'bg-blue-500/10'
    },
    yellow: {
        text: 'text-yellow-400',
        border: 'border-yellow-500/30',
        glow: 'shadow-yellow-500/20',
        bg: 'bg-yellow-500', 
        bg_soft: 'bg-yellow-500/10'
    },
    green: {
        text: 'text-green-400',
        border: 'border-green-500/30',
        glow: 'shadow-green-500/20',
        bg: 'bg-green-500',
        bg_soft: 'bg-green-500/10'
    },
    purple: {
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        glow: 'shadow-purple-500/20',
        bg: 'bg-purple-500',
        bg_soft: 'bg-purple-500/10'
    }
  }[color]

  return (
    <div className="relative w-full min-h-[600px] h-[70vh] rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex flex-col items-center justify-center">
      {/* 1. Universal Background - Reusing the PCB Visualizer in 'captured' (paused) mode for stability but still cool */}
      <EntropyVisualizer paused={false} /> 

      {/* 2. Glass Container Overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm pointer-events-none" />

      {/* 3. Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative z-20 w-full max-w-5xl h-[90%] mx-6 rounded-2xl border ${colorMap.border} bg-slate-900/80 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className={`flex items-center gap-4 p-6 border-b border-white/5 ${colorMap.bg_soft}`}>
            <div className={`p-3 rounded-lg bg-black/40 border border-white/10 ${colorMap.text}`}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white tracking-wide font-mono">{title}</h2>
                <p className={`text-sm ${colorMap.text} font-mono tracking-wider opacity-80 uppercase`}>{subtitle}</p>
            </div>
            
            {/* Decorative decorative status light */}
            <div className="ml-auto flex items-center gap-2">
                 <div className={`px-2 py-1 rounded text-[10px] font-bold ${colorMap.bg_soft} ${colorMap.text} border ${colorMap.border}`}>
                    ACTIVE
                 </div>
                 <div className={`w-2 h-2 rounded-full ${colorMap.bg} animate-pulse shadow-[0_0_10px_currentColor]`} />
            </div>
        </div>

        {/* Scrollable Body - Optimized for single-screen view */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar relative flex flex-col justify-center">
             {children}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20 flex items-center justify-between gap-4">
             {footerContent ? footerContent : (
                <>
                   {onBack && (
                     <Button 
                        variant="ghost" 
                        onClick={onBack}
                        className="text-slate-400 hover:text-white hover:bg-white/10"
                     >
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back
                     </Button>
                   )}
                   <div className="flex-1" />
                   {onNext && (
                    <Button 
                        size="lg" 
                        onClick={onNext}
                        className={`${colorMap.bg} hover:brightness-110 text-black font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] min-w-[140px]`}
                     >
                        {nextLabel} <ArrowRight className="ml-2 w-4 h-4" />
                     </Button>
                   )}
                </>
             )}
        </div>
      </motion.div>
    </div>
  )
}
