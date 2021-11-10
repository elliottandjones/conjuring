import CreatureItem from './CreatureItem'

export default function CreatureList({ creatures, chatOpen, onOpenChatPanel }) {
  return (
    <div className="creature-list">
      {Object.keys(creatures).map((obj, i) => {
        return (
          <CreatureItem
            key={`monster_${creatures[i].index}`}
            creature={creatures[i]}
            chatOpen={chatOpen}
            onOpenChatPanel={onOpenChatPanel}
          />
        )
      })}
    </div>
  )
}
