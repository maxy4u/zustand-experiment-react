//Store
import create from "zustand";
import { useState } from "react";

export const useStore = create((set) => ({
  shows: [
    {
      id: Math.floor(Math.random() * 100),
      name: "River Where the Moon Rises"
    },
    {
      id: Math.floor(Math.random() * 100),
      name: "The Crowned Clown"
    }
  ],
  title: "Default Title",
  addShow: (payload) => {
    console.log("payload", payload);
    return set((state) => {
      console.log("setter called", state);

      return {
        shows: [
          ...state.shows,
          { id: Math.floor(Math.random() * 100), name: payload }
        ]
      };
    });
  },
  updateTitle: (newTitle) => set({ title: newTitle })
}));

const ShowManagement = () => {
  const shows = useStore((state) => state.shows);
  const [value, setValue] = useState("");
  const addShow = useStore((state) => state.addShow);
  console.log("SHOWS: ", shows);
  console.log("ShowManagement - reloaded");
  return (
    <>
      <div>ShowManagement</div>
      <ul>
        {shows?.map((drama) => {
          return (
            <li>
              {drama.id} - {drama.name}
            </li>
          );
        })}
      </ul>
      <div>
        <input
          width={200}
          id="dramaText"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            console.log(value);
            addShow(value);
          }}
        >
          Add Drama
        </button>
      </div>
    </>
  );
};

//TitleManagement - component

const TitleManagement = () => {
  const title = useStore((state) => state.title);
  const updateTitle = useStore((state) => state.updateTitle);
  console.log("TitleManagement - reloaded");

  return (
    <div>
      <p>{title}</p>
      <button onClick={() => updateTitle("Title From UI")}>Update Title</button>
    </div>
  );
};

//App - component

function App() {
  return (
    <>
      <ShowManagement />
      <TitleManagement />
    </>
  );
}

export default App;
