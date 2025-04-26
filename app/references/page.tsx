import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import AnimatedGradient from "@/components/animated-gradient"
import Spotlight from "@/components/spotlight"

export default function ReferencesPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Animated gradient background */}
      <AnimatedGradient />

      {/* Spotlight effect */}
      <Spotlight />

      {/* Content container */}
      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-6 pt-40 sm:px-8 lg:px-10">
          <div className="mb-16 max-w-3xl">
            <h1 className="mb-6 text-5xl font-black tracking-tight text-black md:text-6xl">
              Smart VCell<br />Model Explorer
            </h1>
            <p className="text-xl text-gray-700">
              A comprehensive collection of references, papers, and data sources that power our biological modeling
              platform.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold">Research Papers</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Leveraging public AI tools to explore systems biology resources in mathematical modeling",
                  authors: "Meera Kannan, Gabrielle Bridgewater, Ming Zhang & Michael L. Blinov",
                  journal: "NPJ Systems Biology and Applications",
                  year: "2025",
                  doi: "10.1038/s41540-025-00496-z",
                },
                {
                  title: "Virtual cell modeling and simulation software",
                  authors: "I.I. Moraru, J.C. Schaff, B.M. Slepchenko, M.L. Blinov, F. Morgan, A. Lakshminarayana, F. Gao, Y. Li, and L.M. Loew",
                  journal: "IET Systems Biology",
                  year: "2008",
                  doi: "10.1049/iet-syb:20080102",
                },
                {
                  title: "SBGN Bricks Ontology as a tool to describe recurring concepts in molecular networks",
                  authors: "Adrien Rougny , Vasundra Touré , John Albanese , Dagmar Waltemath , Denis Shirshov , Anatoly Sorokin , Gary D Bader , Michael L Blinov , Alexander Mazein",
                  journal: "Briefings in Bioinformatics",
                  year: "2021",
                  doi: "10.1093/bib/bbab049",
                },
                {
                  title: "Attention Is All You Need",
                  authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin",
                  journal: "neurips",
                  year: "2017",
                  doi: "10.48550/arXiv.1706.03762",
                },
                {
                  title: "bnglViz: online visualization of rule-based models",
                  authors: "Noah Liguori-Bills, Michael L Blinov",
                  journal: "Bioinformatics, Volume 40, Issue 6, June 2024, btae351",
                  year: "2024",
                  doi: "10.1093/bioinformatics/btae351",
                },
              ].map((paper, index) => (
                <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">{paper.title}</CardTitle>
                    <CardDescription>{paper.authors}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-sm text-gray-600">
                      {paper.journal}, {paper.year}
                    </p>
                    <p className="text-sm font-medium text-black">DOI: {paper.doi}</p>
                    <div className="mt-4">
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-black underline-offset-4 hover:underline"
                      >
                        View Paper
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold">Data Sources & Other Tools</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "VCell Database",
                  description: "The Virtual Cell Database repository stores all the models created using the Virtual Cell software.",
                  url: "https://vcell.cam.uchc.edu/api/v0/biomodel",
                },
                {
                  title: "BioNetGenLanguage (BNGL) code visualizer",
                  description: "BioNetGen is software designed for modular, structure-based modeling of biochemical reaction networks. ",
                  url: "https://bnglviz.github.io/",
                },
              ].map((source, index) => (
                <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{source.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">{source.description}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-black underline-offset-4 hover:underline"
                    >
                      Visit Source
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-semibold">GitHub Repositories</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  name: "vcell-demo",
                  description: "Backend and API for the VCell Model Explorer demo.",
                  url: "https://github.com/KacemMathlouthi/VCell-Demo",
                  technologies: ["Python", "Streamlit", "Ollama", "Groq", "VCell API"],
                },
                {
                  name: "vcell-front-demo",
                  description: "Frontend application for the VCell Model Explorer.",
                  url: "https://github.com/KacemMathlouthi/vcell-front-demo",
                  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN"],
                },
              ].map((repo, index) => (
                <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{repo.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-gray-600">{repo.description}</p>
                    <p className="mb-4 text-sm text-gray-700">
                      <span className="font-semibold">Technologies:</span> {repo.technologies.join(", ")}
                    </p>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-black underline-offset-4 hover:underline"
                    >
                      View Repository
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
