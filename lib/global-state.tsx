"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface GlobalState {
  user: {
    isLoggedIn: boolean
    role: "student" | "admin" | "counselor" | "parent" | null
    profile: any
  }
  notifications: any[]
  leadData: any[]
  engagementData: any
}

interface GlobalAction {
  type: string
  payload?: any
}

const initialState: GlobalState = {
  user: {
    isLoggedIn: false,
    role: null,
    profile: null,
  },
  notifications: [],
  leadData: [],
  engagementData: {},
}

const GlobalStateContext = createContext<{
  state: GlobalState
  dispatch: React.Dispatch<GlobalAction>
} | null>(null)

function globalStateReducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case "UPDATE_LEAD_DATA":
      return {
        ...state,
        leadData: action.payload,
      }
    case "UPDATE_ENGAGEMENT_DATA":
      return {
        ...state,
        engagementData: action.payload,
      }
    default:
      return state
  }
}

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState)

  return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider")
  }
  return context
}
