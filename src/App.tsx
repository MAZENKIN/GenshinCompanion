import React, { useState, useEffect } from 'react'
import { Heart, Sun, Moon, Download, Upload } from 'lucide-react'
import CharacterList from './components/CharacterList'
import TeamDisplay from './components/TeamDisplay'
import PaimonIcon from './components/PaimonIcon'
import { Character, Theme } from './types'

const App: React.FC = () => {
  const [team, setTeam] = useState<Character[]>([])
  const [isTeamFloating, setIsTeamFloating] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  const toggleCharacterInTeam = (character: Character) => {
    setTeam(prevTeam => {
      const isInTeam = prevTeam.some(c => c.id === character.id)
      if (isInTeam) {
        return prevTeam.filter(c => c.id !== character.id)
      } else if (prevTeam.length < 4) {
        return [...prevTeam, character]
      }
      return prevTeam
    })
  }

  const removeFromTeam = (characterId: number) => {
    setTeam(team.filter(c => c.id !== characterId))
  }

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const downloadTeam = () => {
    const teamData = JSON.stringify(team)
    const blob = new Blob([teamData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'genshin-team.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTeam = JSON.parse(e.target?.result as string)
          if (Array.isArray(importedTeam) && importedTeam.every(char => 
            typeof char === 'object' && 'id' in char && 'name' in char && 'element' in char && 'weapon' in char && 'image' in char && 'rarity' in char
          )) {
            setTeam(importedTeam)
          } else {
            alert('El archivo importado no tiene el formato correcto.')
          }
        } catch (error) {
          console.error('Error al importar el equipo:', error)
          alert('Error al importar el equipo. Por favor, asegúrate de que el archivo es válido.')
        }
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsTeamFloating(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} pb-8 transition-colors duration-300`}>
      <header className="bg-indigo-600 dark:bg-indigo-800 text-white py-4 mb-8 sticky top-0 z-50 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <PaimonIcon className="w-8 h-8 mr-3 text-white" />
            <h1 className="text-2xl font-bold">Genshin Impact Team Builder</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={downloadTeam} className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors duration-300">
              <Download size={20} />
            </button>
            <label className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors duration-300 cursor-pointer">
              <Upload size={20} />
              <input type="file" className="hidden" onChange={importTeam} accept=".json" />
            </label>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-colors duration-300">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`transition-all duration-300 ${isTeamFloating ? 'fixed top-[72px] left-0 right-0 z-40 px-4' : ''}`}>
        <TeamDisplay team={team} onRemoveCharacter={removeFromTeam} />
      </div>
      <div className={`container mx-auto px-4 ${isTeamFloating ? 'mt-[180px]' : 'mt-8'}`}>
        <CharacterList onToggleCharacter={toggleCharacterInTeam} selectedCharacters={team} />
      </div>
      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <p>Desarrollado con <Heart className="inline-block text-red-500" size={16} /> para los viajeros de Teyvat</p>
      </footer>
    </div>
  )
}

export default App