import React from 'react'
import { Character } from '../types'
import { Star } from 'lucide-react'
import characterData from '../data/characters.json'

const elementColors: { [key: string]: string } = {
  Pyro: 'from-red-500 to-orange-500',
  Hydro: 'from-blue-500 to-cyan-500',
  Anemo: 'from-teal-500 to-green-500',
  Electro: 'from-purple-500 to-indigo-500',
  Dendro: 'from-green-500 to-lime-500',
  Cryo: 'from-blue-300 to-indigo-300',
  Geo: 'from-yellow-500 to-amber-500',
}

interface CharacterListProps {
  onToggleCharacter: (character: Character) => void
  selectedCharacters: Character[]
}

const CharacterList: React.FC<CharacterListProps> = ({ onToggleCharacter, selectedCharacters }) => {
  const isSelected = (character: Character) => selectedCharacters.some(c => c.id === character.id)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Personajes Disponibles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characterData.map(character => (
          <div
            key={character.id}
            className={`p-4 rounded-md cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${elementColors[character.element]} relative overflow-hidden`}
            onClick={() => onToggleCharacter(character)}
          >
            {isSelected(character) && (
              <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
            )}
            <div className="relative z-20">
              <img src={character.image} alt={character.name} className="w-20 h-20 mx-auto mb-2 rounded-full object-cover" />
              <h3 className="text-center font-medium text-white">{character.name}</h3>
              <div className="flex justify-center mt-1">
                {[...Array(character.rarity)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-yellow-300 fill-current" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterList