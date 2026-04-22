import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  const openBot = () => setIsBotOpen(true)
  const closeBot = () => setIsBotOpen(false)
  const toggleBot = () => setIsBotOpen(!isBotOpen)

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const value = {
    // Bot state
    isBotOpen,
    openBot,
    closeBot,
    toggleBot,
    setIsBotOpen,
    // Loading state
    loading,
    setLoading,
    // Notification state
    notification,
    showNotification,
    setNotification,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
