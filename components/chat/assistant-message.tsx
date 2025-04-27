"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

interface AssistantMessageProps {
  content: string
}

export function AssistantMessage({ content }: AssistantMessageProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Replace [IMAGE1] and [IMAGE2] with actual image components
  const processedContent = content
    .replace(
      "[IMAGE1]",
      '<div class="my-5"><img src="/diagram1.png?height=200&width=400" alt="Biomodel visualization 1" class="rounded-md w-full border-2 border-zinc-200" /></div>',
    )
    .replace(
      "[IMAGE2]",
      '<div class="my-5"><img src="/diagram2.png?height=200&width=400" alt="Biomodel visualization 2" class="rounded-md w-full border-2 border-zinc-200" /></div>',
    )

  // Split content to separate references section
  const parts = processedContent.split("## References")
  const mainContent = parts[0]
  const references = parts.length > 1 ? parts[1] : ""

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const referenceItems = [
    {
      number: "1",
      title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
      authors: "Alexey Dosovitskiy et al.",
      arxivId: "2010.11929",
    },
    {
      number: "2",
      title: "A Neural Algorithm of Artistic Style",
      authors: "Leon A. Gatys, Alexander S. Ecker, Matthias Bethge",
      arxivId: "1508.06576",
    },
    {
      number: "3",
      title: "Accurate and Compact Convolutional Neural Networks with Trained Binarization",
      authors: "Zhe Xu, Ray C. C. Cheung",
      arxivId: "1909.11366",
    },
    {
      number: "4",
      title: "Generative Adversarial Networks",
      authors: "Ian J. Goodfellow et al.",
      arxivId: "1406.2661",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: mainContent }} />

      {references && (
        <div className="mt-8 pt-6 border-t border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-zinc-900">References</h3>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
                aria-label="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
                aria-label="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {referenceItems.map((ref, index) => (
              <div
                key={index}
                className="min-w-[280px] max-w-[280px] border-2 border-zinc-200 rounded-lg overflow-hidden flex flex-col bg-white hover:border-zinc-300 transition-colors"
              >
                <div className="h-24 bg-zinc-100 flex items-center justify-center border-b border-zinc-200">
                  <div className="text-center px-3">
                    <div className="font-mono text-xs text-zinc-500">arxiv:{ref.arxivId}</div>
                    <div className="font-medium text-sm mt-1 line-clamp-2">{ref.title}</div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-zinc-600 line-clamp-2 flex-1">{ref.authors}</div>
                  <div className="mt-3 pt-3 border-t border-zinc-100 flex justify-between items-center">
                    <div className="text-xs font-medium text-zinc-900">{ref.number}</div>
                    <a
                      href={`https://arxiv.org/abs/${ref.arxivId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 text-zinc-900 hover:underline"
                    >
                      View Paper <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
