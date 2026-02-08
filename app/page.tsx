import { Quiz } from "@/components/quiz"

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-balance">
        General Knowledge Quiz
      </h1>
      <Quiz />
    </main>
  )
}
