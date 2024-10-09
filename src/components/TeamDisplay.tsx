import React from 'react'
import { X, Star } from 'lucide-react'
import { Character } from '../types'

const elementColors: { [key: string]: string } = {
  Pyro: 'from-red-500 to-orange-500',
  Hydro: 'from-blue-500 to-cyan-500',
  Anemo: 'from-teal-500 to-green-500',
  Electro: 'from-purple-500 to-indigo-500',
  Dendro: 'from-green-500 to-lime-500',
  Cryo: 'from-blue-300 to-indigo-300',
  Geo: 'from-yellow-500 to-amber-500',
}

interface TeamDisplayProps {
  team: Character[]
  onRemoveCharacter: (characterId: number) => void
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, onRemoveCharacter }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md z-30">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tu Equipo</h2>
      <div className="flex justify-center items-center space-x-4">
        {team.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Selecciona personajes para formar tu equipo</p>
        ) : (
          team.map(character => (
            <div key={character.id} className={`p-3 rounded-md relative w-20 bg-gradient-to-br ${elementColors[character.element]}`}>
              <button
                onClick={() => onRemoveCharacter(character.id)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 z-10"
              >
                <X size={14} />
              </button>
              <div className="relative">
                <img src={character.image} alt={character.name} className="w-14 h-14 mx-auto mb-1 rounded-full object-cover" />
              </div>
              <h3 className="text-center font-medium text-xs text-white">{character.name}</h3>
              <div className="flex justify-center mt-1">
                {[...Array(character.rarity)].map((_, index) => (
                  <Star key={index} className="w-3 h-3 text-yellow-300 fill-current" />
                ))}
              </div>
            </div>
          ))
        )}
        {[...Array(4 - team.length)].map((_, index) => (
          <div key={`empty-${index}`} className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md flex items-center justify-center w-20 h-[120px]">
            <span className="text-gray-400 dark:text-gray-500 text-xs">Vacío</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamDisplay