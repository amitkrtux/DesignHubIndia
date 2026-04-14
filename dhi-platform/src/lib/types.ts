export type UserRole = "visitor" | "member" | "core_member" | "hub_lead"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  joinedAt: string
  bio?: string
}

export interface Event {
  id: string
  title: string
  description: string
  type: "online" | "offline" | "hybrid"
  date: string
  endDate?: string
  location?: string
  meetLink?: string
  coverImage?: string
  status: "draft" | "published" | "cancelled" | "completed"
  rsvpCount: number
  maxAttendees?: number
  tags: string[]
  createdBy: string
  agenda?: AgendaItem[]
}

export interface AgendaItem {
  time: string
  title: string
  speaker?: string
  duration: number
}

export interface Initiative {
  id: string
  title: string
  description: string
  category: "events" | "community" | "learning" | "media"
  status: "active" | "completed" | "planned"
  coverImage?: string
  link?: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content?: string
  author: string
  publishedAt: string
  coverImage?: string
  tags: string[]
  type: "newsletter" | "article" | "linkedin"
  status: "draft" | "published"
}

export interface Project {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "on_hold"
  priority: "low" | "medium" | "high"
  startDate: string
  endDate?: string
  members: string[]
  tasks: Task[]
  budget?: number
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "done"
  assignee?: string
  dueDate?: string
  priority: "low" | "medium" | "high"
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

export interface BudgetItem {
  id: string
  title: string
  amount: number
  type: "allocation" | "expense"
  category: string
  eventId?: string
  projectId?: string
  vendor?: string
  date: string
  status: "pending" | "approved" | "paid"
  notes?: string
}

export interface NavItem {
  label: string
  href: string
  description?: string
}

export const ROLE_LABELS: Record<UserRole, string> = {
  visitor: "Visitor",
  member: "Member",
  core_member: "Core Member",
  hub_lead: "Hub Lead",
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  visitor: 0,
  member: 1,
  core_member: 2,
  hub_lead: 3,
}

export function hasAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}
