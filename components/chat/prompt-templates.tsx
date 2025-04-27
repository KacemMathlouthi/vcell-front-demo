import { Card } from "@/components/ui/card"
import { Search, Network, BookOpenText, FileText } from "lucide-react"

interface PromptTemplatesProps {
  onSelectPrompt: (prompt: string) => void
}

export function PromptTemplates({ onSelectPrompt }: PromptTemplatesProps) {
  const templates = [
    {
      icon: <Search className="h-5 w-5 text-zinc-900" />,
      title: "Explore VCell Models",
      description: "Search for models based on user, geometry, solver, or biological focus",
      prompt: "List all VCell models created by user 'ion'. Also, show models that deal with calcium signaling and use the CVODE solver.",
    },
    {
      icon: <Network className="h-5 w-5 text-zinc-900" />,
      title: "Analyze a Specific Model",
      description: "Get detailed insights about reactions, parameters, and simulations in a VCell model",
      prompt: "For the model 'C3_plant_with_PCCM', describe the number of reactions, parameters used, and simulations performed.",
    },
    {
      icon: <BookOpenText className="h-5 w-5 text-zinc-900" />,
      title: "Learn VCell Techniques",
      description: "Get help using VCell software features and tools",
      prompt: "Explain how to define a geometry in VCell and how to plot multiple simulation runs.",
    },
    {
      icon: <FileText className="h-5 w-5 text-zinc-900" />,
      title: "Summarize Nature Research Paper",
      description: "Summarize and explain the key points of the Nature article by Michael Blinov on AI tools in biology",
      prompt: "Summarize and explain the Nature article by Michael Blinov about using AI to explore biological models. Focus on its significance for VCell and systems biology modeling.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
      {templates.map((template, index) => (
        <Card
          key={index}
          className="p-5 cursor-pointer hover:bg-zinc-50 transition-colors border-2 border-zinc-200 hover:border-zinc-300"
          onClick={() => onSelectPrompt(template.prompt)}
        >
          <div className="flex gap-4">
            <div className="mt-0.5">{template.icon}</div>
            <div>
              <h3 className="font-semibold text-zinc-900">{template.title}</h3>
              <p className="text-sm text-zinc-600 mt-2">{template.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
