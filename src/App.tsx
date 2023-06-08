import { useState, useEffect, ChangeEvent } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import { getData } from './utils/data.utils';
import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [title, setTitle] = useState('Monsters Rolodex');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  
  useEffect(() => {
    const fetchUser = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  // const onTitleChange = (event) => {
  //   setTitle(event.target.value);
  // };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
      />
      <br/>
      {/* <SearchBox
        className='title-search-box'
        onSearchChangeHandler={onTitleChange} 
        placeholder='search title'
      /> */}
      <CardList monsters={filteredMonsters}/>
    </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return { originMonsters: users, monsters: users }
//       }));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return {searchField};
//     });
//   };

//   render() {
//     const {monsters, searchField} = this.state;
//     const {onSearchChange} = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           className='monsters-search-box'
//           onSearchChangeHandler={onSearchChange} 
//           placeholder='search monsters'
//         />
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
