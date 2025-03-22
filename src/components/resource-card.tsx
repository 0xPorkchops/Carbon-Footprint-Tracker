import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ResourceCard({ title, description, url }: { title: string; description: string; url: string }) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 pb-4">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <CardDescription className="text-base text-foreground/80">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild className="mt-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Visit Site
            </a>
          </Button>
        </CardFooter>
      </Card>
    )
  }