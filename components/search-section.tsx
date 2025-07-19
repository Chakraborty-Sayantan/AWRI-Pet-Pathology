import { SearchFunctionality } from "./search-functionality"
import { FadeInSection } from "./fade-in-section"

export function SearchSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Your Test</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Search through our comprehensive range of diagnostic tests and health packages
            </p>
          </div>
          <SearchFunctionality />
        </FadeInSection>
      </div>
    </section>
  )
}
