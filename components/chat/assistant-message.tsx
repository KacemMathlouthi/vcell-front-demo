interface AssistantMessageProps {
  content: string
}

export function AssistantMessage({ content }: AssistantMessageProps) {
  // Replace [IMAGE1] and [IMAGE2] with actual image components
  const processedContent = content
    .replace(
      "[IMAGE1]",
      '<div class="my-5"><img src="/placeholder.svg?height=200&width=400" alt="Biomodel visualization 1" class="rounded-md w-full border-2 border-zinc-200" /></div>',
    )
    .replace(
      "[IMAGE2]",
      '<div class="my-5"><img src="/placeholder.svg?height=200&width=400" alt="Biomodel visualization 2" class="rounded-md w-full border-2 border-zinc-200" /></div>',
    )

  // Split content to separate references section
  const parts = processedContent.split("## References")
  const mainContent = parts[0]
  const references = parts.length > 1 ? parts[1] : ""

  return (
    <div className="space-y-5">
      <div className="prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: mainContent }} />

      {references && (
        <div className="mt-6 pt-5 border-t border-zinc-200">
          <h3 className="text-sm font-semibold mb-3 text-zinc-900">References</h3>
          <div className="text-sm text-zinc-700 space-y-2">
            {references
              .split("\n")
              .filter(Boolean)
              .map((ref, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-zinc-500">{ref.split(".")[0]}.</span>
                  <span>{ref.split(".").slice(1).join(".")}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
