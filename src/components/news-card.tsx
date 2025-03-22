import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NewsCard({
    title,
    source,
    description,
    url,
    date,
  }: {
    title: string
    source: string
    description: string
    url: string
    date: string
  }) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{title}</CardTitle>
            <span className="text-sm text-muted-foreground">{source}</span>
          </div>
          <div className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</div>
        </CardHeader>
        <CardContent className="pt-6">
          <CardDescription className="text-base text-foreground/80">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="mt-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              View Article
            </a>
          </Button>
        </CardFooter>
      </Card>
    )
  }