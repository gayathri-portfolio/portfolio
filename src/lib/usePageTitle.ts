import { useEffect } from 'react'

const SITE = 'Gayathri V — Product Designer'

/** Sets the browser tab / bookmark title for the current page. Without a
 * title it falls back to the site name (used on the home page). */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Gayathri V` : SITE
  }, [title])
}
