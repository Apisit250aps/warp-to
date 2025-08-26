'use client'

import { Dock, DockIcon } from '@/components/magicui/dock'
import { ScriptCopyBtn } from '@/components/magicui/script-copy-btn'
import { Dices, NotebookPen } from 'lucide-react'
import { LineShadowText } from '@/components/magicui/line-shadow-text'
import { useTheme } from 'next-themes'

export type IconProps = React.HTMLAttributes<SVGElement>

export default function Home() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === 'dark' ? 'white' : 'black'
  const customCommandMap = {
    warp: 'warp to',
  }
  return (
    <>
      <div className="absolute top-0 w-full">
        <div className="flex justify-center pt-10">
          <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <LineShadowText className="italic" shadowColor={shadowColor}>
              Warp
            </LineShadowText>
            {' >'} To
          </h1>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">
        <ScriptCopyBtn
          showMultiplePackageOptions={false}
          codeLanguage="shell"
          lightTheme="nord"
          darkTheme="vitesse-dark"
          commandMap={customCommandMap}
        />
      </div>
      <div className="absolute bottom-0 w-full pb-10">
        <Dock direction="middle">
          <DockIcon>
            <Dices />
          </DockIcon>
          <DockIcon>
            <NotebookPen />
          </DockIcon>
        </Dock>
      </div>
    </>
  )
}
