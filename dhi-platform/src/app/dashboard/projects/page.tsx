"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Plus, CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "@/store/auth"
import { hasAccess } from "@/lib/types"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: "1",
    title: "Q2 Events Planning",
    description: "Plan and execute all Q2 2025 events and workshops",
    status: "active",
    priority: "high",
    members: ["A", "P", "R"],
    progress: 60,
    tasks: { todo: 3, in_progress: 2, done: 8 },
    dueDate: "2025-06-30",
  },
  {
    id: "2",
    title: "Community Newsletter System",
    description: "Set up automated newsletter pipeline with AI content",
    status: "active",
    priority: "medium",
    members: ["A", "K"],
    progress: 35,
    tasks: { todo: 5, in_progress: 1, done: 4 },
    dueDate: "2025-05-15",
  },
  {
    id: "3",
    title: "Annual Design Showcase 2025",
    description: "Full planning for the annual community showcase event",
    status: "active",
    priority: "high",
    members: ["A", "P", "R", "K"],
    progress: 20,
    tasks: { todo: 8, in_progress: 0, done: 2 },
    dueDate: "2025-05-20",
  },
]

const kanbanTasks = {
  todo: [
    { id: "1", title: "Design event landing page", priority: "high", assignee: "P" },
    { id: "2", title: "Send speaker invitations", priority: "medium", assignee: "A" },
    { id: "3", title: "Create registration form", priority: "low", assignee: "R" },
  ],
  in_progress: [
    { id: "4", title: "Finalize event schedule", priority: "high", assignee: "A" },
    { id: "5", title: "Coordinate with venue", priority: "medium", assignee: "P" },
  ],
  done: [
    { id: "6", title: "Set event date & title", priority: "medium", assignee: "A" },
    { id: "7", title: "Create project brief", priority: "low", assignee: "R" },
  ],
}

const priorityColors = {
  high: "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low: "bg-neutral-100 text-neutral-500",
}

export default function ProjectsPage() {
  const [view, setView] = useState<"list" | "kanban">("list")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const { user } = useAuthStore()
  const canCreate = user && hasAccess(user.role, "core_member")

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Projects</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{projects.length} active projects</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-neutral-100 rounded-xl p-1 gap-1">
            {(["list", "kanban"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  view === v ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
                )}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          {canCreate && (
            <Button variant="primary" size="sm" icon={<Plus size={14} />}>
              New Project
            </Button>
          )}
        </div>
      </div>

      {view === "list" ? (
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-black/6 p-5 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                      {project.title}
                    </h3>
                    <Badge variant={project.priority === "high" ? "error" : project.priority === "medium" ? "warning" : "default"} size="sm">
                      {project.priority}
                    </Badge>
                    <Badge variant="success" size="sm">{project.status}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500 mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span>Due {new Date(project.dueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                    <span>✓ {project.tasks.done} done · ⟳ {project.tasks.in_progress} active · ○ {project.tasks.todo} pending</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex -space-x-1.5">
                    {project.members.map((m) => (
                      <div key={m} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-white text-[9px] font-bold">
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 mb-1">{project.progress}%</p>
                    <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-violet-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Kanban board */
        <div className="grid grid-cols-3 gap-4">
          {(["todo", "in_progress", "done"] as const).map((column) => {
            const titles = { todo: "To Do", in_progress: "In Progress", done: "Done" }
            const colors = { todo: "bg-neutral-100", in_progress: "bg-orange-50", done: "bg-emerald-50" }
            return (
              <div key={column} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-neutral-700">{titles[column]}</h3>
                  <span className="text-xs text-neutral-400 bg-neutral-100 rounded-full px-2 py-0.5">
                    {kanbanTasks[column].length}
                  </span>
                </div>
                <div className={cn("rounded-2xl p-3 flex flex-col gap-2 min-h-[200px]", colors[column])}>
                  {kanbanTasks[column].map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-xl p-3 border border-black/5 shadow-sm cursor-pointer hover:shadow-md transition-all"
                    >
                      <p className="text-xs font-medium text-neutral-800 mb-2">{task.title}</p>
                      <div className="flex items-center justify-between">
                        <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full font-medium", priorityColors[task.priority as keyof typeof priorityColors])}>
                          {task.priority}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-white text-[9px] font-bold">
                          {task.assignee}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {canCreate && (
                    <button className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 p-2 rounded-xl hover:bg-white/50 transition-colors">
                      <Plus size={12} /> Add task
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
