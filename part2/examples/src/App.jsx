import Note from './components/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Some Notes</h1>

      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
