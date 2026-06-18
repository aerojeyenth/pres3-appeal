export function downloadBlob(data: Uint8Array, filename: string, mimeType: string): void {
  const blob = new Blob([data.slice()], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
