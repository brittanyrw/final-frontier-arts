import { getClues } from '@/lib/api'
import ClueInterface from '@/components/clue/ClueInterface'

export default async function CluePage() {
  const clues = await getClues()
  
  return <ClueInterface clues={clues || []} />
}