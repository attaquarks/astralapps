import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { getIndustry, type IndustryContent, type IndustryId } from '../data/industries'

type IndustryContextValue = {
  industryId: IndustryId | null
  setIndustryId: (id: IndustryId | null) => void
  /** resolved content for the active vertical (or neutral default) */
  content: IndustryContent
}

const IndustryContext = createContext<IndustryContextValue | null>(null)

const STORAGE_KEY = 'astral-industry'
const validIds: IndustryId[] = ['recruiting', 'marketing', 'accounting', 'realestate']

function getStored(): IndustryId | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return validIds.includes(value as IndustryId) ? (value as IndustryId) : null
  } catch {
    return null
  }
}

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryId] = useState<IndustryId | null>(getStored)

  useEffect(() => {
    try {
      if (industryId) localStorage.setItem(STORAGE_KEY, industryId)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [industryId])

  return (
    <IndustryContext.Provider
      value={{ industryId, setIndustryId, content: getIndustry(industryId) }}
    >
      {children}
    </IndustryContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIndustry() {
  const ctx = useContext(IndustryContext)
  if (!ctx) throw new Error('useIndustry must be used within an IndustryProvider')
  return ctx
}
