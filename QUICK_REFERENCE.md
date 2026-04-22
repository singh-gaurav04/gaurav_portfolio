# 🎯 Quick Reference - Using Global State

## Import Hooks
```javascript
import { useTheme, useApp } from '../hooks'
```

---

## 🌙 Theme Context (useTheme)

### Available Properties & Methods:
```javascript
const { isDarkMode, toggleTheme } = useTheme()
```

### Example Usage:
```javascript
import { useTheme } from '../hooks'

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
```

---

## 🤖 App Context (useApp)

### Available Properties & Methods:

#### Bot Management:
```javascript
const { 
  isBotOpen,        // boolean
  openBot,          // () => void
  closeBot,         // () => void
  toggleBot,        // () => void
  setIsBotOpen      // (boolean) => void
} = useApp()
```

#### Loading State:
```javascript
const { 
  loading,          // boolean
  setLoading        // (boolean) => void
} = useApp()
```

#### Notifications:
```javascript
const { 
  notification,              // { message, type } or null
  showNotification,          // (message, type) => void
  setNotification            // (object) => void
} = useApp()
```

---

## 📝 Usage Examples

### Example 1: Open Chatbot Button
```javascript
import { useApp } from '../hooks'

export function ChatButton() {
  const { openBot } = useApp()
  
  return (
    <button onClick={openBot} className="btn btn-primary">
      💬 Chat with Bot
    </button>
  )
}
```

### Example 2: Loading State Management
```javascript
import { useApp } from '../hooks'

export function DataFetcher() {
  const { loading, setLoading, showNotification } = useApp()
  
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/data')
      const data = await res.json()
      showNotification('Data loaded successfully!', 'success')
    } catch (err) {
      showNotification('Failed to load data', 'error')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button onClick={fetchData} disabled={loading}>
      {loading ? 'Loading...' : 'Fetch Data'}
    </button>
  )
}
```

### Example 3: Show Notifications
```javascript
import { useApp } from '../hooks'

export function NotificationExample() {
  const { showNotification } = useApp()
  
  return (
    <>
      <button onClick={() => showNotification('Success!', 'success')}>
        Success
      </button>
      <button onClick={() => showNotification('Error!', 'error')}>
        Error
      </button>
      <button onClick={() => showNotification('Info', 'info')}>
        Info
      </button>
    </>
  )
}
```

### Example 4: Check Bot Status
```javascript
import { useApp } from '../hooks'

export function BotStatus() {
  const { isBotOpen, toggleBot } = useApp()
  
  return (
    <div>
      <p>Bot Status: {isBotOpen ? '✅ Open' : '❌ Closed'}</p>
      <button onClick={toggleBot}>
        {isBotOpen ? 'Close' : 'Open'} Bot
      </button>
    </div>
  )
}
```

### Example 5: Combine Theme & App Contexts
```javascript
import { useTheme, useApp } from '../hooks'

export function ComplexComponent() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { loading, setLoading, showNotification } = useApp()
  
  const handleAction = async () => {
    setLoading(true)
    // Do something
    setLoading(false)
    showNotification('Done!', 'info')
  }
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Processing...' : 'Action'}
      </button>
    </div>
  )
}
```

---

## 💡 Notification Types

When using `showNotification()`:

```javascript
// Success notification
showNotification('Successfully saved!', 'success')

// Error notification
showNotification('Something went wrong', 'error')

// Info notification (default)
showNotification('Here is some info', 'info')

// Warning notification
showNotification('Please be careful', 'warning')
```

---

## ⚡ Common Patterns

### Pattern 1: Open Bot from Anywhere
```javascript
import { useApp } from '../hooks'

// Any component can open the bot
function ProjectCard() {
  const { openBot } = useApp()
  
  return (
    <button onClick={openBot}>
      Have questions? Chat with our bot!
    </button>
  )
}
```

### Pattern 2: Global Loading Indicator
```javascript
// In your layout or main component
import { useApp } from '../hooks'

function App() {
  const { loading } = useApp()
  
  return (
    <>
      {loading && <LoadingSpinner />}
      <YourContent />
    </>
  )
}
```

### Pattern 3: Error Handling with Notifications
```javascript
import { useApp } from '../hooks'

export function FormSubmit() {
  const { showNotification, setLoading } = useApp()
  
  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        showNotification('Form submitted successfully!', 'success')
      } else {
        showNotification('Submission failed', 'error')
      }
    } catch (err) {
      showNotification(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 🔗 Files Location

- **Hooks:** `src/hooks/index.js`
- **Theme Context:** `src/contexts/ThemeContext.jsx`
- **App Context:** `src/contexts/AppContext.jsx`
- **Routes Config:** `src/config/routes.js`

---

## ❓ Troubleshooting

### Error: "useTheme must be used within a ThemeProvider"
- Make sure your app is wrapped in `<ThemeProvider>` (it is in the new App.jsx)

### Error: "useApp must be used within an AppProvider"
- Make sure your app is wrapped in `<AppProvider>` (it is in the new App.jsx)

### Contexts not working in a component?
- Verify you imported the hook correctly: `import { useTheme, useApp } from '../hooks'`
- Make sure the component is rendered inside the providers

---

**Happy coding! 🚀**
