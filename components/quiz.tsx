"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const questions = [
  {
    id: 1,
    question: "What is the young one of a frog called?",
    options: ["Tadpole", "Larva", "Pupa", "Caterpillar", "Nymph"],
    answer: "Tadpole",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What gas do plants release during photosynthesis?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Oxygen",
  },
]

export function Quiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (questionId: number, value: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const score = questions.filter((q) => answers[q.id] === q.answer).length

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q) => (
        <Card key={q.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              {q.id}. {q.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[q.id] || ""}
              onValueChange={(value) => handleSelect(q.id, value)}
            >
              <div className="flex flex-col gap-3">
                {q.options.map((option) => {
                  const isCorrect = submitted && option === q.answer
                  const isWrong =
                    submitted && answers[q.id] === option && option !== q.answer

                  return (
                    <div
                      key={option}
                      className={`flex items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                        isCorrect
                          ? "border-green-500 bg-green-50 text-green-900"
                          : isWrong
                            ? "border-red-500 bg-red-50 text-red-900"
                            : "border-border"
                      }`}
                    >
                      <RadioGroupItem
                        value={option}
                        id={`q${q.id}-${option}`}
                        disabled={submitted}
                      />
                      <Label
                        htmlFor={`q${q.id}-${option}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {option}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {submitted ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">
            You scored {score} out of {questions.length}
          </p>
          <Button onClick={handleReset} variant="outline">
            Try Again
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="self-start"
        >
          Submit Answers
        </Button>
      )}
    </div>
  )
}
