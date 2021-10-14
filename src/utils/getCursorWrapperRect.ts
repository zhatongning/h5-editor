export interface CursorRect {
  width: string,
  height: string
  left: string
  top: string
}

export const getCursorWrapperRect = (element: HTMLElement, options?: { padding: number }): CursorRect => {

  const padding = options?.padding || 5
  const getWrapperStyle = () => {
    console.log(element)
    const rect = element.style
    return {
      left: parseInt(rect.left) - padding + 'px',
      top: parseInt(rect.top) - padding + 'px',
      width: parseInt(rect.width) + 2 * padding + 'px',
      height: parseInt(rect.height) + 2 * padding + 'px',
    } as CursorRect
  }

  return getWrapperStyle()
}