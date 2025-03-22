import { ResourceCard } from "@/components/resource-card";
import { NewsCard } from "@/components/news-card";

const mockNewsItems = [
  {
    title: "Sample news headline from an RSS feed",
    source: "The Associated Press",
    description: "This is mock data for what would be an RSS feed if this were hosted on a server capable of server-side rendering.",
    url: "https://news.google.com/rss/search?hl=en-US&gl=US&ceid=US%3Aen&oc=11&q=Reduce%20Carbon%20Emissions",
    date: "2025-03-21",
  },
];

export default function Resources() {
  const newsItems = mockNewsItems;

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Resources to Reduce Your Carbon Footprint</h1>

      <section className="py-3">
        <h2 className="text-3xl font-bold mb-6">📌 Pinned Resources</h2>
        <div className="grid gap-6">
          <ResourceCard
            title="Rewiring America"
            description="The Inflation Reduction Act of 2022 allocated over $10 billion to help households install important home upgrades, increase energy efficiency, and use renewable energy. Rewiring America has made it easy to find out which incentives you're eligible for!"
            url="https://www.rewiringamerica.org/"
          />
          <ResourceCard
            title="Ten Steps You Can Take to Reduce Your Carbon Footprint at Home"
            description="Simple things you can do at any time to reduce your personal and household emissions of carbon dioxide (CO2), the leading greenhouse gas contributor to climate change."
            url="https://www.mass.gov/info-details/reduce-your-carbon-footprint-at-home"
          />
          <ResourceCard
            title="How Businesses Can Measure & Reduce Carbon Emissions"
            description="Climate change has become a vital business topic, prompting many companies to set ambitious goals for tackling it..."
            url="https://online.hbs.edu/blog/post/how-to-reduce-carbon-emissions"
          />
        </div>
      </section>
      <section className="py-3">
        <h2 className="text-3xl font-bold mb-6">📰 In The News</h2>
        <div className="grid gap-6">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              source={item.source}
              description={item.description}
              url={item.url}
              date={item.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
