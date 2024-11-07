import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Clock, Mic, Star, Target } from "lucide-react"

// This is sample data - replace with your actual data
const events = [
  {
    type: "Webinar",
    icon: Mic,
    date: "Tu, 25.03",
    time: "12:30",
    title: "Understanding medical research, critical appraisal skills, and applying evidence-based guidelines in practice",
    avatar: "/placeholder.svg?height=32&width=32",
    color: "bg-sky-50",
  },
  {
    type: "Lesson",
    icon: Star,
    date: "We, 26.03",
    title: "Overview of healthcare delivery systems, health policy, and their impact on patient care.",
    color: "bg-purple-50",
  },
  {
    type: "Task",
    icon: Target,
    date: "Th, 27.03",
    title: "Examination of major global health issues, including infectious diseases, non-communicable diseases, and healthcare disparities.",
    color: "bg-amber-50",
  },
  {
    type: "Task",
    icon: Target,
    date: "Fr, 28.03",
    title: "Importance of teamwork and communication among healthcare professionals for optimal patient",
    color: "bg-green-50",
  },
]

export default function SideNav() {
  return (
    <div className="w-[40%] rounded-tr-3xl bg-[#EFEFEF] p-6 text-black">
      <h1 className="mb-6 text-2xl font-bold">
        My Events{" "}
        <span role="img" aria-label="winking face">
          🤨
        </span>
      </h1>
      <div className="space-y-4">
        {events.map((event, index) => (
          <Card
            key={index}
            className={`${event.color} rounded-2xl border-none p-4 shadow-sm transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-start gap-3">
              {event.avatar && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={event.avatar} alt="Avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <event.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{event.type}</span>
                  </div>
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>
                <div className="bg-white p-4 rounded-3xl">
                  <p className="mb-2 text-sm">{event.title}</p>
                </div>
                {event.time && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Start at {event.time}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}