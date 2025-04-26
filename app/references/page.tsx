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
              VCell Smart Model Explorer
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
                  title: "Computational Modeling of Cellular Signaling Processes",
                  authors: "Johnson et al.",
                  journal: "Nature Biotechnology",
                  year: "2022",
                  doi: "10.1038/nbt.4567",
                },
                {
                  title: "Systems Biology Approach to Understanding Cell Cycle Regulation",
                  authors: "Zhang & Williams",
                  journal: "Cell Systems",
                  year: "2021",
                  doi: "10.1016/j.cels.2021.03.002",
                },
                {
                  title: "Machine Learning Applications in Molecular Biology",
                  authors: "Patel et al.",
                  journal: "Bioinformatics",
                  year: "2023",
                  doi: "10.1093/bioinformatics/btad123",
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
            <h2 className="mb-8 text-2xl font-semibold">Data Sources</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "BioModels Database",
                  description: "A repository of mathematical models of biological processes.",
                  url: "https://www.ebi.ac.uk/biomodels/",
                },
                {
                  title: "Cell Collective",
                  description: "A platform for building and simulating logical models of biological systems.",
                  url: "https://cellcollective.org/",
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
            <h2 className="mb-8 text-2xl font-semibold">Database Information</h2>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>VCell Database Architecture</CardTitle>
                <CardDescription>Technical specifications and structure of our knowledge base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Database Type</h3>
                    <p className="text-gray-700">
                      Graph database optimized for biological pathway relationships and model interactions
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Data Structure</h3>
                    <p className="text-gray-700">
                      Hierarchical organization of models, pathways, reactions, and molecular entities with
                      bidirectional relationships
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Update Frequency</h3>
                    <p className="text-gray-700">Monthly updates with new research papers and model refinements</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Data Sources</h3>
                    <p className="text-gray-700">
                      Integration of multiple public repositories, proprietary datasets, and peer-reviewed publications
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
