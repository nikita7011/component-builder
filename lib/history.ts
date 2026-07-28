import { HistoryItem } from "@/components/context/sidebar-context";
const HISTORY_KEY = "cb_history"
export function saveToHistory(item: Omit<HistoryItem, "id" | "timestamp">) {
    const history = getHistory()
    const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now()
    }
    const updated = [newItem, ...history].slice(0, 50)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    return newItem
}
export function getHistory(): HistoryItem[] {
    if(typeof window === "undefined") return[]
    try{
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]")
    }
    catch {
        return []
    }
}
export function deleteHistoryItem(id: string){
    const history = getHistory().filter(item => item.id != id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
export function clearHistory(){
    localStorage.removeItem(HISTORY_KEY)
}
export function groupHistoryByDate(items: HistoryItem[]) {
  const now = Date.now()
  const DAY = 86400000
  const today: HistoryItem[] = []
  const yesterday: HistoryItem[] = []
  const older: HistoryItem[] = []

  items.forEach(item => {
    const diff = now - item.timestamp
    if (diff < DAY) today.push(item)
    else if (diff < DAY * 2) yesterday.push(item)
    else older.push(item)
  })

  return { today, yesterday, older }
}
export function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}
